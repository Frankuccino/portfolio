---
title: "Server-Authoritative State: Treating AI Output as Untrusted Input"
date: 2026-11-08
excerpt: "An AI agent that can move cards on a Kanban board is only useful if it cannot corrupt the board. Designing the state machine that stands between the model and the data."
tags: [AI Engineering, Architecture, State Machines]
---

Give a language model a tool that mutates state and you have made a design decision whether you meant to or not: **who is allowed to change what?** If the answer is "the model," you have a problem.

Northstar's answer is a server-authoritative Kanban state machine. The AI can request a transition; it cannot perform one.

## The rule that shapes everything

Every board mutation flows through a single function:

```ts
type Transition =
  | { type: "move_card"; cardId: string; to: ColumnId }
  | { type: "create_task"; payload: NewTask }
  | { type: "archive_card"; cardId: string };

function applyTransition(
  board: BoardState,
  transition: Transition,
): BoardState {
  assertTransitionAllowed(board, transition);
  return produce(board, transition); // immutable update
}
```

`assertTransitionAllowed` is where the domain lives:

- A card can only move **forward** through the workflow, or back one step.
- **WIP limits** are enforced per column — a full column rejects the move, not the UI.
- Only the assignee or a board admin may move a card out of review.
- Archived cards are immutable.

The key point: these rules are not in the React components, and they are not in the prompt. They are in one place, on the server, and every write path — REST handler, AI tool, future CLI — funnels through it.

## Why not trust the prompt?

You can ask a model to "respect WIP limits" and it will, right up until it doesn't. Prompts are suggestions. A state machine is a guarantee.

```ts
// The AI tool is a thin adapter over the same handler the UI uses.
const moveCardTool = defineTool({
  name: "move_card",
  schema: MoveCardSchema,
  handler: async (args, ctx) => {
    const result = await boards.moveCard({
      boardId: ctx.boardId,
      cardId: args.cardId,
      to: args.to,
      actor: ctx.user, // never the model
    });
    return result; // includes a reason when the transition is rejected
  },
});
```

When a transition is rejected, the rejection is fed back to the model as a tool result. That matters more than it sounds: the model gets to **correct itself** using real domain feedback instead of a generic error.

## The design trade-off

A server-authoritative model costs you flexibility. You cannot encode "the AI knows best" without weakening the rules, and every new transition is a migration. But the alternative — client-side validation plus a prompt saying "please be careful" — is how boards end up with three copies of the same card.

> Validate at the boundary that has the authority to say no. Everything upstream is a suggestion.

## What this buys you

- **Testability.** The state machine is pure and deterministic; 96 tests cover it without a model in the loop.
- **Auditability.** Every rejected transition is a logged event with a reason.
- **Composability.** A future Slack bot or cron job gets the exact same guarantees for free.
