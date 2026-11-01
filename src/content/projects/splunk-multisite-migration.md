---
name: "Splunk multi-site cluster migration"
type: "Infrastructure"
status: "shipped"
period: "2024"
summary: "Architected and led the migration of Wolters Kluwer's Splunk deployment from a single-site indexer cluster to a multi-site clustered topology, taking the architecture through WK ARC (Architecture Review Committee) certification."
problem: "WK's Splunk deployment ran single-site, putting search performance and disaster recovery posture at the limit of growth. A site-level incident risked both RPO and RTO; ARC required demonstrable HA and DR before further scale."
architecture: "Multi-site indexer cluster with site affinity, search-head tier separation, and tiered storage. Forwarders rerouted via universal forwarders and HWF; warm/cold buckets replicated across data centres. RPO and RTO defined per-tier and rehearsed in tabletop exercises."
implementation: "Sized and built the cluster, validated capacity with synthetic load, migrated buckets in waves with health gates, automated cutover via runbooks. Cutover rehearsals in non-prod; ARC pack contained topology diagrams, failure-mode analysis, RPO/RTO statements, and rollback plan."
results: "WK ARC certification approved. Search latency improved at peak; DR posture went from single-site to multi-site with documented RPO/RTO. The same platform became the reference topology for downstream Splunk initiatives."
stack:
  - "Splunk Enterprise"
  - "Multi-site clustering"
  - "Terraform"
  - "Azure"
  - "YAML CI/CD"
tags:
  - "Splunk"
  - "HA"
  - "DR"
  - "AWS / Azure"
links:
  - label: "Role — IT Infrastructure & Operations Analyst"
    href: "/experience/#wolters-kluwer-current"
    external: false
featured: true
order: 10
confirm: false
---