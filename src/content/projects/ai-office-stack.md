---
name: "AI office stack — multi-agent dev environment"
type: "AI Engineering · Live"
status: "live"
period: "2026"
summary: "Self-hosted multi-agent stack for software engineering and operations: Paperclip for orchestration, Honcho for persistent cross-agent memory, GitNexus for codebase knowledge graphs, Hermes as the agent runtime. Specialised agents for dev, qa, infra, marketing, and design."
problem: "Single-agent CLIs lose state across sessions and don't share context between specialised roles. Real engineering work — code, infrastructure, design, marketing, ops — needs persistent memory, codebase understanding, and role-aware orchestration, not a chatbot. The same MCP-and-shared-memory pattern that productionises AI tooling at WK is what powers this stack."
architecture: "Four layers: Paperclip for orchestration (agents-as-employees, budgets, governance, workspace isolation per agent role). Honcho for persistent cross-session memory (peer-reasoning across agents and the human, per-agent sessions plus shared cross-agent context). GitNexus for codebase knowledge graphs (symbol-level queries, call chains, execution flows — indexed per repo). Hermes as the agent runtime (desktop CLI, MCP-aware, multi-profile for switching between personal and project contexts)."
implementation: "Stack deployed on self-hosted infrastructure with workspace isolation per agent role (dev, qa, infra, marketing, design). Honcho v2 SDK for per-agent sessions and shared cross-agent context. GitNexus indexed per repo, exposed via Hermes MCP tools. Custom MCP servers wire external systems into the agents — the same architecture that drives the Splunk MCP server in production at WK."
results: "Daily-driver for software engineering, infrastructure review, QA, marketing content, and design work. The stack is the home version of the production AI-assisted automation pattern I'm building at WK — same primitives, same shared memory, same MCP surface, just with more agents on a personal workstation."
stack:
  - "Paperclip (orchestration)"
  - "Honcho v2 (memory)"
  - "GitNexus (codebase context)"
  - "Hermes (agent runtime)"
  - "MCP servers (cross-cutting)"
tags:
  - "AI engineering"
  - "Multi-agent"
  - "Self-hosted"
  - "MCP"
links: []
featured: true
order: 5
confirm: false
---