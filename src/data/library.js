/**
 * RFP Copilot — Content Library
 * 30 pre-seeded enterprise SaaS response entries across 5 categories.
 * In a production system, this would be fetched from a database.
 */

export const CONTENT_LIBRARY = [
  // ─── TECHNICAL ───────────────────────────────────────────────────────────
  {
    id: "L001", category: "Technical", topic: "Uptime SLA",
    answer: "We provide a 99.9% uptime SLA backed by our Master Service Agreement. Our platform has maintained 99.95% uptime over the past 12 months, with historical uptime data available at our public Trust Center (trust.ourplatform.com). Planned maintenance windows are communicated 72 hours in advance and scheduled exclusively during regional off-peak hours. Critical incidents are communicated in real time via our status page.",
  },
  {
    id: "L002", category: "Technical", topic: "REST API & Authentication",
    answer: "We offer a comprehensive REST API with 150+ endpoints covering all platform functionality. Full interactive documentation is available at developers.ourplatform.com. We support OAuth 2.0 (Authorization Code + Client Credentials flows) and API key authentication. Rate limits are 1,000 requests/minute on standard plans and 10,000 requests/minute for enterprise. Webhooks are available for all major platform events with configurable retry logic and signature verification.",
  },
  {
    id: "L003", category: "Technical", topic: "Native Integrations",
    answer: "We offer 50+ native integrations including Salesforce, HubSpot, Microsoft Teams, Slack, Google Workspace, SharePoint, DocuSign, and Jira. Each native integration supports bi-directional sync with real-time webhooks and field-level mapping. Our Zapier connector enables 3,000+ additional no-code connections. Custom integrations are available via REST API and our iPaaS-compatible event bus.",
  },
  {
    id: "L004", category: "Technical", topic: "Data Export & Portability",
    answer: "All customer data can be exported at any time in CSV, JSON, PDF, and DOCX formats via the self-service Admin portal or Bulk Export API. There are no volume limits on exports. Upon contract termination, we provide a complete, structured data export package within 30 days at no additional charge, after which data is securely purged per our deletion policy (see Section 5).",
  },
  {
    id: "L005", category: "Technical", topic: "Search Capabilities",
    answer: "We provide full-text and AI-powered semantic search across all platform content. The search index updates in real time as content is modified. Advanced filters support boolean operators, date ranges, owner filters, custom metadata tags, and confidence scoring. Our AI semantic layer understands synonyms, abbreviations, and paraphrased queries, returning the most relevant results even without exact keyword matches.",
  },
  {
    id: "L006", category: "Technical", topic: "Mobile Application",
    answer: "Native iOS (iOS 15+) and Android (Android 10+) apps are available with near-full feature parity to the web application. Apps receive bi-weekly updates through the respective app stores. Offline mode allows read-access to downloaded content libraries. Enterprise MDM policies (Intune, Jamf) are fully supported for managed device enrollment and app configuration.",
  },
  // ─── SECURITY ────────────────────────────────────────────────────────────
  {
    id: "L007", category: "Security", topic: "SOC 2 Type II Certification",
    answer: "Yes. We hold SOC 2 Type II certification, most recently audited in Q4 2024 by Deloitte covering the Security, Availability, and Confidentiality trust service criteria. An executive summary report is available on request; the full report is available under NDA to qualified prospects. We additionally hold ISO 27001 certification, renewed in 2024.",
  },
  {
    id: "L008", category: "Security", topic: "Encryption Standards",
    answer: "All data at rest is encrypted using AES-256. Data in transit is protected by TLS 1.3 (minimum TLS 1.2; older protocols are disabled). We use AWS Key Management Service (KMS) for key management, with Customer-Managed Encryption Keys (CMEK) available on enterprise plans. Encryption keys rotate every 90 days automatically, or on demand at customer request.",
  },
  {
    id: "L009", category: "Security", topic: "SSO / SAML 2.0 / OIDC",
    answer: "We fully support Single Sign-On via SAML 2.0 and OpenID Connect (OIDC). Verified identity provider integrations include Okta, Microsoft Azure AD / Entra ID, Google Workspace, OneLogin, and Ping Identity. SSO is included at no extra cost on all enterprise plans and can be enforced as mandatory for all users. SCIM 2.0 for automated user provisioning and deprovisioning is also supported.",
  },
  {
    id: "L010", category: "Security", topic: "Penetration Testing",
    answer: "We conduct annual third-party penetration tests performed by CREST-certified security firms. Our most recent engagement was completed in March 2025. An executive summary is available to qualified prospects under NDA. In addition, we run continuous automated vulnerability scanning (DAST + SAST) in our CI/CD pipeline and operate a responsible disclosure program for external security researchers.",
  },
  {
    id: "L011", category: "Security", topic: "Data Residency",
    answer: "Customer data is hosted on AWS. Enterprise customers may select their preferred region at contract time: US (us-east-1, us-west-2), EU (eu-west-1, eu-central-1), Canada (ca-central-1), UK (eu-west-2), or APAC (ap-southeast-1). Data is strictly isolated within the selected region; no cross-region replication occurs without explicit written consent. Regional residency is included on all enterprise plans at no additional charge.",
  },
  {
    id: "L012", category: "Security", topic: "Backup & Disaster Recovery",
    answer: "Customer data is backed up continuously using AWS point-in-time recovery with a 30-day retention window. Backups are stored in geographically separate AWS regions from primary data. Our Recovery Time Objective (RTO) is 4 hours; our Recovery Point Objective (RPO) is 1 hour. Full disaster recovery tests are conducted quarterly, with results summarised in our SOC 2 report.",
  },
  // ─── PRICING ─────────────────────────────────────────────────────────────
  {
    id: "L013", category: "Pricing", topic: "Pricing Model",
    answer: "We use a transparent per-seat pricing model with volume discounts built into the schedule. Enterprise plans start at $35 USD per user per month for 100–249 seats, stepping down to $30 at 250–499 seats and $25 at 500+ seats. All enterprise plans include unlimited content library storage, full API access, SSO, audit logs, and priority support. Pricing is annual, invoiced upfront or quarterly for enterprise.",
  },
  {
    id: "L014", category: "Pricing", topic: "Enterprise Discounts & Multi-Year Terms",
    answer: "We offer a 10% discount for 2-year commitments and a 20% discount for 3-year terms, applied to the per-seat rate before volume tiers. Additional strategic partnership pricing is available for accounts exceeding 1,000 seats. All discounts can be combined with volume tiers. We are open to creative commercial structures (e.g., outcome-based pricing or phased ramp deals) for the right strategic partnership.",
  },
  {
    id: "L015", category: "Pricing", topic: "Implementation & Professional Services Fees",
    answer: "Standard onboarding is included at no additional cost for enterprise plans and covers data migration, SSO configuration, admin training sessions, integration setup, and a 90-day hypercare period with a dedicated Implementation Manager. Custom professional services (e.g., bespoke API integrations, custom reporting, workflow automation) are scoped and priced transparently prior to contract signature so there are no surprises.",
  },
  {
    id: "L016", category: "Pricing", topic: "Support Tiers & SLAs",
    answer: "Enterprise plans include 24/7 priority support with a 1-hour initial response SLA for P1 critical incidents. Each enterprise customer is assigned a named Customer Success Manager with quarterly business reviews. A dedicated Slack Connect channel is provided for accounts with 500+ seats. We also offer an optional Premier Support upgrade with 24/7 phone support, a technical account manager, and monthly executive briefings.",
  },
  {
    id: "L017", category: "Pricing", topic: "Payment Terms & Invoicing",
    answer: "We accept ACH bank transfer, wire transfer, and major credit cards. Net-30 and Net-60 payment terms are available for enterprise customers with an approved purchase order. Multi-currency billing is supported in USD, EUR, GBP, CAD, and AUD. We align to standard enterprise procurement processes including PO-based invoicing, and can accommodate fiscal year billing cycles on request.",
  },
  {
    id: "L018", category: "Pricing", topic: "Contract Flexibility & Termination",
    answer: "Standard enterprise contracts are annual or multi-year with auto-renewal on 30 days' notice to opt out. Early termination requires 90 days' written notice after the initial term, with fees pro-rated to the termination date. We offer a 60-day satisfaction guarantee for new enterprise customers — if the platform does not meet agreed success criteria within 60 days, we will provide a full refund.",
  },
  // ─── LEGAL ───────────────────────────────────────────────────────────────
  {
    id: "L019", category: "Legal", topic: "Data Processing Agreement / GDPR / DPDPA",
    answer: "Yes. We provide a standard Data Processing Agreement (DPA) compliant with GDPR (EU 2016/679), UK GDPR, CCPA/CPRA, and India's Digital Personal Data Protection Act 2023 (DPDPA). Our DPA includes EU Standard Contractual Clauses (SCCs) for international data transfers. We act as Data Processor; the customer is the Data Controller. The DPA is available for electronic signature on request and can be executed as a standalone agreement.",
  },
  {
    id: "L020", category: "Legal", topic: "Data Retention & Deletion",
    answer: "Customer data is retained for the duration of the contract term. Upon termination or expiration, all data remains available for self-service export for 90 days, then is securely and irreversibly deleted from all systems including backups within 30 days, in accordance with NIST SP 800-88 guidelines. A signed deletion certificate is provided to the customer upon request at no charge.",
  },
  {
    id: "L021", category: "Legal", topic: "Liability Cap & Insurance",
    answer: "Our standard liability cap is 12 months of fees paid in the preceding year. We carry Commercial General Liability insurance of $5M, Cyber Liability / Tech E&O insurance of $10M per occurrence, and Professional Liability (E&O) of $5M. Certificates of insurance are available on request. Higher liability caps and additional insured endorsements are negotiable for enterprise customers and will be discussed during commercial negotiations.",
  },
  {
    id: "L022", category: "Legal", topic: "IP Ownership & Content Rights",
    answer: "Customers retain full, exclusive ownership of all data, content, and work product they create or upload to the platform. We claim no intellectual property rights over customer content. All platform IP, including our AI models and underlying software, remains the exclusive property of our company. Work product created by our Professional Services team is assigned to the customer upon full payment, as specified in the applicable Statement of Work.",
  },
  {
    id: "L023", category: "Legal", topic: "Governing Law & Dispute Resolution",
    answer: "Our standard Master Service Agreement is governed by the laws of the State of Delaware, USA. For customers in the EU or UK, we offer agreements governed by English law. For APAC customers, Singapore law is available. Disputes are first subject to good-faith negotiation, then binding arbitration under JAMS (US) or LCIA (international) rules, conducted in the governing jurisdiction. Class action waivers apply.",
  },
  {
    id: "L024", category: "Legal", topic: "Subprocessors",
    answer: "We maintain a current, publicly available subprocessor list at ourplatform.com/legal/subprocessors, updated in real time. Key subprocessors include AWS (infrastructure), Stripe (payments), Zendesk (support ticketing), and Datadog (observability). Customers receive 30 days' advance email notice of any new subprocessor addition and may raise a reasoned objection per the process described in our DPA.",
  },
  // ─── COMPANY ─────────────────────────────────────────────────────────────
  {
    id: "L025", category: "Company", topic: "Customer References",
    answer: "We have 500+ enterprise customers across financial services, healthcare, technology, and professional services, including 8 of the Fortune 50. We are happy to arrange reference calls with financial services firms of similar scale and complexity to your organisation. Three qualified, referenceable customers will be provided within 5 business days of your request, matched to your industry and use case.",
  },
  {
    id: "L026", category: "Company", topic: "Implementation Methodology & Time-to-Value",
    answer: "We follow a proven 5-phase implementation methodology: Discovery & Success Planning (Weeks 1–2), Platform Configuration & Integration (Weeks 3–6), User Acceptance Testing (Weeks 7–8), Training & Managed Launch (Weeks 9–10), and 90-Day Hypercare. Average time-to-value for a 500-seat enterprise deployment is 10–12 weeks. A dedicated, certified Implementation Manager is assigned from day one with a clear RACI and project plan.",
  },
  {
    id: "L027", category: "Company", topic: "AI Product Roadmap",
    answer: "Our 2025–2026 AI roadmap includes: AI-powered content health scoring and freshness detection (Q2 2025), semantic search across the content library (Q3 2025), automatic SME assignment by topic classification (Q3 2025), AI quality scoring and improvement suggestions for draft responses (Q4 2025), and predictive deal win-probability scoring based on response patterns (Q1 2026). We share the full roadmap with enterprise customers under NDA.",
  },
  {
    id: "L028", category: "Company", topic: "Company Background & Financials",
    answer: "Founded in 2016 and headquartered in Toronto, Canada, we have 400+ employees with offices in London (UK) and Bangalore (India). We have raised $100M in Series C venture funding from Tier 1 investors and are on a clear path to profitability. We serve 500+ enterprise customers globally and have been recognised as a G2 Leader in Response Management for three consecutive years.",
  },
  {
    id: "L029", category: "Company", topic: "Support SLA Details",
    answer: "Enterprise Support SLAs: P1 Critical (system unavailable) — 1-hour initial response, 4-hour target resolution, 24/7. P2 High (significant feature impaired) — 4-hour response, 24-hour resolution, business hours. P3 Medium (degraded functionality) — 1 business day response. P4 Low (general inquiry) — 2 business days. Support is available 24/7/365 via phone, email, live chat, and dedicated Slack channel for enterprise customers.",
  },
  {
    id: "L030", category: "Company", topic: "Certifications & Compliance Posture",
    answer: "We hold and maintain the following: SOC 2 Type II (Deloitte, 2024), ISO 27001 (2024), ISO 27701 Privacy Information Management, GDPR and CCPA compliance documentation, FedRAMP Moderate Authorization, HIPAA Business Associate Agreement (BAA), and PCI DSS Level 1 compliance for payment data. Our full compliance posture, including current certificates and third-party audit reports, is available at trust.ourplatform.com.",
  },
];

export const CATEGORY_CONFIG = {
  Technical: { color: "#6366F1", bg: "#EEF2FF", lightBg: "#F5F3FF", icon: "Code" },
  Security:  { color: "#EF4444", bg: "#FEF2F2", lightBg: "#FFF5F5", icon: "Shield" },
  Pricing:   { color: "#10B981", bg: "#ECFDF5", lightBg: "#F0FDF9", icon: "DollarSign" },
  Legal:     { color: "#F59E0B", bg: "#FFFBEB", lightBg: "#FEFCE8", icon: "Scale" },
  Company:   { color: "#8B5CF6", bg: "#F5F3FF", lightBg: "#FAF5FF", icon: "Building" },
};
