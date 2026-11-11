---
title: "Building a ReAct-Style Agent Loop with Tool Calling"
date: 2026-11-10
excerpt: "How Northstar runs natural-language board operations through a server-side agent loop — and why the model's output is treated as untrusted input."
tags: [AI Engineering, Agentic Systems, Northstar]
---

Most "AI feature" demos stop at a single chat completion: the user types, the model answers, and the app never changes state. A real agent feature is different. The model has to **act** — and every action it proposes has to survive contact with your domain rules.

That is the problem Northstar sets out to solve: a Kanban board where you can type *"move the auth refactor to in progress and add a review task"* and have it actually happen.

## The loop, not the prompt

The core is a classic ReAct-style cycle, kept deliberately small:

1. **Reason** — send the conversation plus a tool schema to the model.
2. **Act** — if it requests a tool, execute that tool against the backend.
3. **Observe** — append the tool result and loop again.
4. **Stop** — when the model returns a final message instead of a tool call.

```ts
type AgentStep =
  | { kind: "tool_call"; tool: string; args: unknown }
  | { kind: "final"; message: string };

async function runAgentLoop(messages: Message[]): Promise<AgentStep[]> {
  const steps: AgentStep[] = [];

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    const response = await provider.chat({
      messages,
      tools: BOARD_TOOLS, // typed, versioned schemas
    });

    if (response.toolCalls.length === 0) {
      steps.push({ kind: "final", message: response.content });
      return steps;
    }

    for (const call of response.toolCalls) {
      const result = await executeBoardTool(call.tool, call.args);
      steps.push({ kind: "tool_call", tool: call.tool, args: call.args });
      messages.push(toolResultMessage(call.tool, result));
    }
  }

  throw new AgentLoopError("max turns exceeded");
}
```

Three details matter more than the rest.

### 1. Tools are schemas, not strings

Every tool is a typed schema — name, description, JSON Schema for arguments. The model is never writing code; it is filling in a form. That keeps the attack surface small and makes the tool set testable in isolation.

### 2. Every tool call goes through the same validation as the REST API

The agent does not get a back door. `move_card` is the same handler the UI calls, with the same auth check, the same payload validation, and the same state-machine rules.

### 3. The loop is observable

Each step — tool name, arguments, result, latency — is streamed to the frontend over SSE. The user watches the agent work instead of staring at a spinner.

## What I would not repeat

- **No turn cap in v1.** A confused model can loop until it burns the budget. `MAX_TURNS` is now a hard limit, and the client sees *why* it stopped.
- **Tool arguments were untyped at first.** A single `any` in the tool handler turned a prompt injection into a database query. Everything is validated now.

## Where this is going

The next step is a deterministic planner in front of the model: the agent proposes a batch of operations, the planner validates them against the state machine, and only then does anything touch the database. The model suggests; the system disposes.

> The model is the least trustworthy component in the loop. Design everything else as if it will be wrong.
