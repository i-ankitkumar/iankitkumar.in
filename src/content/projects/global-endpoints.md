---
name: "Global Windows endpoint operations"
type: "Endpoint Ops"
status: "shipped"
period: "2021 – 2022"
summary: "Ran global Windows endpoint operations for Colgate GBS — 20,000+ endpoints, 79 factories, 70 countries — with patch ops, software distribution, and zero-day emergency response."
problem: "A globally distributed Windows fleet with patch, software-distribution, and inventory responsibilities that span 70 countries and 79 factories. Zero-day exposure required fast, coordinated response with the Security team."
architecture: "SCCM/MECM + Workspace One + Tanium layered by function: SCCM for primary software distribution and inventory, Workspace One for mobile and modern management, Tanium for real-time visibility and patch telemetry. PowerShell for automation glue."
implementation: "Patch-cycle ownership end to end. PowerShell automations for software decommissioning, license reconciliation, and silent application deployment. On-call rotation for zero-day emergencies alongside Security."
results: "Consistent global compliance posture. PowerShell automations saved significant manual effort (no public figure for the exact number); zero-day patches landed fast across all geographies."
stack:
  - "SCCM / MECM"
  - "Workspace One"
  - "Tanium"
  - "PowerShell"
  - "Windows Server"
tags:
  - "Endpoints"
  - "Patch ops"
  - "Security"
links:
  - label: "Role — Executive Associate"
    href: "/experience/#colgate-gbs"
    external: false
featured: true
order: 30
confirm: false
---