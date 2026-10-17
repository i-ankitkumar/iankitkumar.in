---
name: "MCP server: Splunk query planner"
type: "MCP · Experimental"
category: "mcp"
status: "experimental"
period: "2026"
summary: "A Model Context Protocol server that exposes Splunk SPL authoring, search-head status, and indexer cluster health to MCP-aware clients (Claude Desktop, Cursor, etc.). Designed so an LLM can query Splunk the same way an SRE would."
problem: "SPL authoring is a craft. Tying a language model into a Splunk platform with safe defaults (read-only contexts, scoped indexes, audit logs) is the kind of tooling that turns 'AI copilot' from a demo into something an ops team would actually use."
architecture: "stdio MCP server in TypeScript. Tools: `splan_search` (validate + run a read-only SPL query against a scoped index), `cluster_status` (multi-site indexer cluster health summary), `recent_errors` (tail recent errors for a sourcetype). Audit log of every tool invocation written to a dedicated Splunk index."
implementation: "Splunk SDK + zod schemas for tool input. Read-only role enforced via dedicated Splunk account. Rate-limited per session. Currently experimental and tested against a non-production Splunk instance."
results: "Working prototype. Used internally to author SPL queries faster and to give Claude a structured view of Splunk state during incidents."
stack:
  - "TypeScript"
  - "Model Context Protocol"
  - "Splunk SDK"
  - "Zod"
tags:
  - "MCP"
  - "Splunk"
  - "AI agent"
links: []
order: 10
confirm: true
---