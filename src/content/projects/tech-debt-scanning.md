---
name: "Tech-debt scanning across 2,500+ subscriptions"
type: "Reliability"
status: "shipped"
period: "2024"
summary: "Python and PowerShell scan automation that detects tech debt across cloud, OS, and database layers in 2,500+ Azure and AWS subscriptions, with Azure DevOps remediation pipelines that resolve 2,000+ flagged resources on demand."
problem: "Tech debt in cloud, OS, and database layers was invisible at the WK estate scale of 2,500+ subscriptions. Manual audits couldn't keep up; remediation was ticket-driven and inconsistent; P1/P2 incidents kept recycling the same root causes."
architecture: "Three-layer scanner: cloud (Azure Policy + AWS Config + custom checks), OS (patch state, drift), and database (schema drift, deprecated features). Findings land in a central inventory; Azure DevOps remediation pipelines act on them; RCA integrates with the on-call workflow."
implementation: "Built the scanner in Python and PowerShell against existing Az/AWS SDKs. Standardised findings into an inventory schema; Azure DevOps remediation pipelines consume the inventory and either auto-remediate or open a tracked ticket. Owner-level dashboards surface the backlog. Linked the remediation track into the on-call RCA workflow so recurring root causes had a path back to source."
results: "2,500+ Azure and AWS subscriptions now scanned continuously; 2,000+ flagged resources resolved via the Azure DevOps remediation pipeline. 400+ P1/P2 incidents resolved with proper RCA and SLA adherence — the scanner became the early-warning system for the kinds of issues that used to become incidents."
stack:
  - "Python (Boto3, Azure SDK)"
  - "PowerShell"
  - "Azure DevOps Pipelines"
  - "Azure Policy"
  - "AWS Config"
tags:
  - "Reliability"
  - "Multi-cloud"
  - "Automation"
links:
  - label: "Role — IT Infrastructure & Operations Analyst"
    href: "/experience/#wolters-kluwer-current"
    external: false
featured: false
order: 25
confirm: false
---