---
title: "The Four Ways Git Breaks at Scale: What Replaces It"
date: 2026-11-19
excerpt: "Git assumes the whole project fits on one laptop. Here is what actually breaks when it doesn't, and the real mechanisms Google, Meta, and Microsoft put in its place."
tags: [Git, Distributed Systems, Scalability, Backend]
---

The summary you usually see goes like this: standard Git was designed for a project that fits on one person's laptop, and every monorepo tool is an attempt to make that assumption true again. That is correct, but it hides the interesting part. **The tools are not making Git faster. They are deleting assumptions Git was built on.** Each one removes a constraint that is baked into Git's data model, and the constraint has to be replaced by something with a different cost.

To see why, you need the mental model that matters.

## Git is a store, not a workflow

Underneath everything, Git is two things:

- A **content-addressed object store**: blobs, trees, commits, tags. Each object's name is the hash of its contents.
- A set of **refs**: movable pointers (`main`, `feature/x`) into that graph.

That is all. There is no server, no notion of a build, no notion of a dependency, no notion of which files you care about right now, and no notion of who else is pushing. Every workflow feature (branches, rebases, CI, code review, merge queues) is policy that somebody layered on top of a dumb object store.

This is why the fixes at scale look so different from each other. They are not patches to Git; they are replacements for the parts of Git that only work when a repo is small. And they fall into four families, one per constraint.

## 1. The full copy: Git wants every object

A `git clone` fetches the entire reachable object graph: every blob and tree for every commit you can reach from the refs you cloned. The working tree is cheap; **history is the cost**. A 50 MB project is nothing. A repo with a decade of history, binary assets, and generated files is tens of gigabytes before you type a single command.

The first response is to stop downloading objects you do not need. Git has had the primitives for years; most people just never turn them on.

```bash
# Commit and tree objects, but fetch blobs on demand.
git clone --filter=blob:none https://dev.example.com/monorepo.git

# Even the trees are fetched lazily. Barely anything crosses the wire.
git clone --filter=tree:0 https://dev.example.com/monorepo.git

# Check out only the directories you work in.
git sparse-checkout set services/api web/app
```

These three flags (**partial clone** and **sparse checkout**) solve the problem for a large fraction of real repos. They are the boring answer, and the boring answer is usually the right one.

At the extreme, the answer is to stop pretending the working tree is local at all. Google's **CitC (Clients in the Cloud)** runs the entire workspace on a remote machine; your laptop is a thin client showing a rendered view. Microsoft shipped **VFS for Git** (a virtualized filesystem that materialises files on open; since folded into **Scalar**) and Meta built **EdenFS**. All of them share the same idea: the directory listing exists, but the bytes live elsewhere and arrive when you touch them.

**The trade:** every open is now a network call. Latency moves into the critical path, and the "it works offline on a plane" property is gone. That is a real cost, and it is the reason partial clone beats a virtual filesystem for most teams.

## 2. The O(n) scan: `git status` walks the whole tree

This one is less obvious and more universally painful. `git status` is not a diff against the index. It is a **crawl**. Git stats every tracked path, compares mtime and size against the index, and reads content for anything that looks dirty. The cost is linear in the number of tracked files, not in the number of files you changed.

In a repo with millions of files, that is minutes of wall clock for a command whose answer is usually "nothing changed".

The fix is to stop crawling and start **listening**. Git has two caches for exactly this:

```bash
git config core.untrackedCache true   # hash the untracked scan once
git config core.fsmonitor true         # invalidate only paths a watcher reports
git commit-graph write                 # precompute history traversal
```

`core.fsmonitor` is the important one. You run a filesystem watcher (Watchman, or Git's built-in daemon) that reports which paths changed, and Git only visits those. Status goes from O(all files) to O(changed files). At Meta this is the default posture: **Sapling** sits on **EdenFS**, so `sl status` asks the watcher what moved instead of walking the tree.

The lesson generalises: **a scan is a cache that has gone stale.** Any time an operation is O(n) in the whole repo, the fix is an incremental invalidation stream, not a faster scan.

## 3. Merge traffic: the bottleneck is workflow, not Git

The framing "Git cannot handle thousands of simultaneous saves" is wrong, and it is worth being precise. Git's object store is fine with concurrency: appends of immutable objects do not conflict. What breaks is the **integration workflow** built on top: long-lived branches, a shared trunk, and a human resolving conflicts by hand.

Do the arithmetic. If `main` moves every 30 seconds and your branch lives for a week, you are rebasing against a moving target ~20,000 times. Every rebase risks conflicts; every conflict costs a human. That is not Git being slow. That is branch lifetime being long.

So the industry's answer is not a faster merge. It is **making the branch lifetime short enough that the maths works**:

- **Trunk-based development**: integrate to `main` at least daily, often many times a day.
- **Feature flags**: land code dark, decouple deploy from release, so an unfinished feature is not a reason to hold a branch open.
- **Branch by abstraction**: migrate behind an interface in small, individually-mergeable steps instead of one big-bang branch.
- **Merge queues**: Uber's **SubmitQueue**, Google's **Critique** flow, and the merge-queue feature in GitHub/GitLab all do the same thing: they take your patch, rebase it onto the *current* head in a clean room, run CI there, and only then land it. If `main` moved, they retry automatically. The conflict is resolved before it ever reaches a human's laptop.

Notice what the merge queue actually buys: it converts "rebase against an unknown future" into "test against a known future, once." That is a **consistency** problem, not a throughput problem. It is the same shape as read-repair in an eventually-consistent store. Git gives you no global lock and no ordering guarantee; the merge queue is an external sequencer that adds one.

## 4. The blind build: Git tracks files, not dependencies

Git knows which path you edited. It has no idea which targets consume that path. So the only correct build after a change to a shared header is "rebuild everything", and in a monorepo, that is hours.

The fix is to move the dependency graph **out of Git and into a build system** that treats the build as a pure function from inputs to outputs:

- **Bazel** (Google, open sourced), **Buck2** (Meta), **Pants**, **Please**, **Nix** all take an explicit, hermetic dependency graph and only rebuild what the change actually reaches.
- **Remote execution and caching** (Bazel Remote Build Execution, EngFlow, BuildBuddy) turn that graph into a content-addressed cache: if an action's inputs hash to something already built, you download the output instead of running it.

Here is the connection that makes this click: **the build graph is a content-addressed store too.** Bazel keys an action on the hashes of its inputs; Git keys an object on the hash of its contents. The build system is literally applying Git's own trick, content addressing, to the one thing Git does not model. That is why memoisation works at all.

## The pattern

| Constraint | What Git assumes | The mechanism that replaces it | Cost you pay |
| --- | --- | --- | --- |
| Full copy | History fits on disk | Partial clone, sparse checkout, virtualised FS | On-demand latency, no offline |
| O(n) scan | Walking the tree is cheap | fsmonitor, untracked cache, commit-graph | A watcher daemon to run |
| Merge traffic | Branches live a long time | Trunk-based dev, flags, merge queues | Discipline, flag hygiene |
| Blind build | Files are the unit | Bazel/Buck2/Pants + remote execution | A real build graph to maintain |

Read the right-hand column carefully. None of the fixes are free, and none of them are "make Git faster." Each one removes an assumption and charges you a new operational cost in a different currency: latency, a daemon, process discipline, or a build graph you now own.

That is the general shape of scale work. Git's constraints are not bugs; they are the physical consequences of a content-addressed store with no server and no global lock. When the constraints stop being acceptable, you do not optimise the store. You change the assumption, and you pay the new price somewhere else.

## What to do on a normal-sized repo

You do not need a monorepo to use the lessons. Four are free or nearly free:

1. **`--filter=blob:none` + sparse checkout** if the repo is big or has heavy directories.
2. **`core.fsmonitor=true` + `core.untrackedCache=true`**: this is a one-line config that makes `git status` feel instant.
3. **Short-lived branches, merged daily.** The merge queue is a formalisation of a discipline you can adopt with no tooling.
4. **A build tool with a real dependency graph**, even a small one. Incrementality is a property of the graph, not of the repo size.

The rest (CitC, EdenFS, Sapling, remote execution) is what those same ideas look like when the numbers get big enough that the operational cost stops mattering.

> Git was never designed to be a monorepo tool. It was designed to be a content-addressed object store with refs, and it is very good at that. Every monorepo tool is an admission that the object store was the easy part.
