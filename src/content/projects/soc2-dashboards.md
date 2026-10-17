---
name: "Splunk dashboards for SOC2 + financial reporting"
type: "Observability · Production"
status: "shipped"
period: "2022 – 2024"
summary: "Designed and built the Splunk dashboards and data-protection controls that gave Wolters Kluwer's leadership and audit teams real-time SOC2 visibility and clean financial-reporting signals."
problem: "SOC2 audit evidence and financial reporting were reactive — pulled from logs after the fact, with no shared source of truth between ops, security, and finance. Sensitive fields had no ingestion controls."
architecture: "Splunk dashboards fronting pre-built searches over the SOC2 control set, with a layer of ingestion suppression for sensitive fields. Data flow wired into Azure Entra ID for SSO and access scoping."
implementation: "Built the dashboard library iteratively with the SOC2 and finance teams; codified ingestion suppression at the index-time layer; added alerting on control drift. Runbooks for new-control onboarding."
results: "Audit-ready visibility for SOC2; cleaner financial reporting signals for leadership. The same patterns were extended to subsequent control sets."
stack:
  - "Splunk Enterprise"
  - "Azure Entra ID"
  - "SOC2"
  - "Dashboarding"
tags:
  - "Splunk"
  - "SOC2"
  - "Dashboards"
links:
  - label: "Role — Associate IT Infra & Ops Analyst"
    href: "/experience/#wolters-kluwer-associate"
    external: false
featured: true
order: 20
confirm: false
---