---
name: "Subscription migration across 25 Azure tenants"
type: "Cloud Governance"
status: "shipped"
period: "2024"
summary: "Led the 2.5–3 month migration of 200–300 Azure subscriptions across 25 non-primary tenants into the WK CTC (Security) Team structure, with standard governance policies deployed at management-group level and ServiceNow CAM kept in sync throughout."
problem: "Hundreds of Azure subscriptions lived across 25 non-primary tenants with inconsistent governance — different policies, uneven visibility, no shared source of truth between prod / non-prod / dev. Security had no clean way to enforce baselines; finance had no clean view of ownership."
architecture: "WK CTC (Security) Team tenant structure with management-group-level governance policies. Subscription migration orchestrated via Azure DevOps Pipelines; Terraform for policy baselines; ServiceNow Cloud Account Management (CAM) as the system of record for subscription ownership."
implementation: "End-to-end program leadership: scoped the migration set with Security and Cloud Ops, automated the per-subscription transfer with Azure Pipelines, applied Terraform governance policies at management-group level, kept ServiceNow CAM records in sync throughout (no drift). Coordinated cutover windows across tenant owners."
results: "The full migration completed in 2.5–3 months with consistent policy enforcement and improved visibility across all environments. ServiceNow CAM was the single source of truth throughout — no orphaned subscriptions."
stack:
  - "Azure (IaaS/PaaS)"
  - "Terraform"
  - "Azure DevOps Pipelines"
  - "ServiceNow CAM"
  - "Management groups"
tags:
  - "Azure"
  - "Governance"
  - "Migration"
links:
  - label: "Role — IT Infrastructure & Operations Analyst"
    href: "/experience/#wolters-kluwer-current"
    external: false
featured: false
order: 15
confirm: false
---