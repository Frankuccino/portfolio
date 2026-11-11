---
title: "Streaming LLM Responses with Server-Sent Events"
date: 2026-11-06
excerpt: "Why SSE beat WebSockets for Northstar's agent activity feed, and the trade-offs of streaming partial tool calls over a unidirectional channel."
tags: [AI Engineering, Backend, SSE]
---

A chat interface that waits three seconds and then dumps a finished answer feels slower than one that shows the model thinking. The fix is streaming — but the transport choice is not cosmetic. For Northstar, Server-Sent Events won decisively.

## The requirements that decided it

Northstar streams one thing: **events from the server to the browser**. The agent emits a sequence — `reasoning_started`, `tool_call`, `tool_result`, `token`, `done` — and the frontend renders them as they arrive.

That is a unidirectional flow, and SSE is a unidirectional protocol.

```ts
// app/api/board/[id]/chat/route.ts
export async function POST(req: Request, ctx: RouteContext<"/api/board/[id]/chat">) {
  const { id } = await ctx.params;
  const body = await req.json();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: AgentEvent) => {
        controller.enqueue(
          new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`),
        );
      };

      try {
        await runAgentLoop(id, body.message, send);
        send({ type: "done" });
      } catch (error) {
        send({ type: "error", message: errorMessage(error) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
```

## Why not WebSockets

| Concern | SSE | WebSocket |
| --- | --- | --- |
| Direction | Server → client only | Full duplex |
| Transport | Plain HTTP | Protocol upgrade |
| Reconnect | Built into `EventSource` | You build it |
| Proxies / firewalls | Works everywhere | Sometimes blocked |
| Complexity for this use case | Trivial | Unjustified |

WebSockets would be the right answer if the browser needed to push frequent messages upstream on the same connection. It does not — the user sends a message, then the server talks for a while.

## The trade-offs that actually bit

**1. No custom headers on `EventSource`.** The browser's `EventSource` API cannot set an `Authorization` header. Northstar sends the session token as a signed cookie instead, which is also the safer default for a browser client.

**2. Buffering hides the stream.** Without `X-Accel-Buffering: no` and `Cache-Control: no-transform`, a proxy can hold the whole response and defeat the point. Verify streaming at the byte level, not in dev.

**3. Partial tool calls are not a thing.** SSE gives you tokens, not structured objects. The frontend assembles the tool call from deltas and only renders it once it is complete — streaming a half-parsed JSON object to the UI is how you get flicker.

**4. The connection must close.** A leaked `ReadableStream` is a leaked request. Always `close()` in a `finally`, and always send a terminal event so the client can stop its spinner.

## The result

The user sees the agent pick a tool, watch it run, and read the result as it happens. That is a **trust** feature as much as a latency one: an opaque model making a board change is unnerving, and a visible trail of what it did is not.

> Stream events, not bytes. A named event schema lets the frontend evolve without parsing prose.
