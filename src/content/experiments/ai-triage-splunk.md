---
name: "AI-assisted triage for Splunk security alerts"
type: "Security Tooling · Experimental"
category: "security-tooling"
status: "experimental"
period: "2026"
summary: "A small pipeline that takes raw Splunk security alerts, runs them through an LLM with structured output (severity, MITRE ATT&CK technique, suggested next step), and posts the result back to Splunk as an enriched notable event."
problem: "Tier-1 SOC queues get buried. The interesting question is whether an LLM can do defensible first-pass triage — strict schema, narrow scope, no autonomous action — and free a human to spend time on the cases that actually matter."
architecture: "Splunk → webhook → FastAPI service → LLM (structured JSON, schema-validated) → Splunk (enriched notable event). The LLM never executes anything; it's a triage assistant, not an actor."
implementation: "FastAPI + a strict response schema validated with Pydantic. Every classification carries an LLM-version hash and the prompt used, for audit. Prompt is version-controlled alongside the service."
results: "Internal alpha on a single Splunk security use case (auth anomalies). Directional improvement in triage time on the cases we tested; not yet a deployment."
stack:
  - "Python"
  - "FastAPI"
  - "Splunk"
  - "Pydantic"
  - "LLM (structured output)"
tags:
  - "AI agent"
  - "Splunk"
  - "Security"
links: []
order: 20
confirm: false
---