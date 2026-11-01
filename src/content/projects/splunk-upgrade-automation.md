---
name: "Multi-cloud Splunk upgrade automation"
type: "Release Engineering"
status: "shipped"
period: "2024"
summary: "Multi-cloud automation (AWS SSM/EC2 + Azure Run Command) for Splunk Enterprise upgrades with automatic rollback. 20,000+ endpoints upgraded at a 99.9% success rate; failed deployments self-revert instead of becoming incidents."
problem: "Splunk Enterprise upgrades ran as risky manual events across a multi-cloud production estate. A failed upgrade would take observability offline for the teams depending on it, so upgrades were deferred — pushing the security and reliability debt forward every quarter."
architecture: "AWS SSM for EC2 nodes, Azure Run Command for Azure nodes, with a workflow orchestrator that pre-checks health, applies the upgrade, validates post-conditions, and triggers an automatic rollback path on any failure signal. No human babysitting per node."
implementation: "Built the orchestrator in Python, integrated with the existing Splunk monitoring for pre/post-condition checks, and wired it to the existing change-control process. Drove rollout across the estate; became the standard upgrade path."
results: "20,000+ endpoints upgraded with a 99.9% success rate. Failed deployments self-reverted rather than becoming incidents; upgrade cadence stopped being a scheduling negotiation and started being a button press."
stack:
  - "AWS SSM / EC2"
  - "Azure Run Command"
  - "Splunk Enterprise"
  - "Python"
tags:
  - "Splunk"
  - "Release engineering"
  - "Multi-cloud"
links:
  - label: "Role — IT Infrastructure & Operations Analyst"
    href: "/experience/#wolters-kluwer-current"
    external: false
featured: false
order: 12
confirm: false
---