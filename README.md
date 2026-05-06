# ⚡ RFP Copilot — AI-Powered RFP Response Accelerator

> **A portfolio proof-of-work project built for Loopio's Lead Product Manager role.**  
> Built by a candidate with 7+ years of B2B SaaS PM experience.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-6366F1?style=flat-square&logo=vercel)](https://rfp-copilot.vercel.app)
[![PRD](https://img.shields.io/badge/PRD-View-10B981?style=flat-square)](https://docs.google.com/document/d/1VTP23FeAoPejU9GJ_4OdKei8QQKeiud-iCMOg6QxDBo/edit?tab=t.0)
[![Built with Claude](https://img.shields.io/badge/AI-Anthropic%20Claude-8B5CF6?style=flat-square)](https://anthropic.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)

---

## 🎯 Why This Exists

Enterprise sales teams waste **40–60% of their RFP cycle** duplicating effort, hunting for approved content, and manually tracking who owns what. This is Loopio's core problem space — and as a candidate for the Lead PM role, I wanted to demonstrate:

1. **Deep customer empathy** — I understand the problem at the user level, not just the abstract level.
2. **Platform thinking** — A reusable content library that compounds in value, not a one-off feature.
3. **AI × Enterprise product fluency** — Working knowledge of how to spec and ship AI-powered enterprise tools.
4. **Bias toward action** — A working, live demo beats a deck every time.

---

## ✨ What It Does

| Module | What it solves |
|--------|---------------|
| **AI Question Extraction** | Upload any RFP → Claude extracts every question in <60s, categorised + complexity-scored |
| **Draft Response Generator** | Per-question AI drafts grounded in a 30-entry content library, with confidence scoring |
| **Knowledge Gap Detection** | Surfaces which questions your library can't answer confidently |
| **Live Completion Dashboard** | Real-time view of progress by category, effort remaining, and gap list |

---

## 🚀 Live Demo

**[→ rfp-copilot.vercel.app](https://rfp-copilot.vercel.app)**

The app comes pre-loaded with a realistic 30-question enterprise RFP from a fictional "Apex Financial Services" covering Technical, Security, Pricing, Legal, and Company sections — the same structure as a real-world enterprise RFP response process.

**Getting started in 30 seconds:**
1. Click **"Use 30-question sample RFP"**
2. Click **"Analyse RFP with Claude AI"**
3. Select any question → click **Generate Draft**
4. Or click **"Generate All Drafts"** from the Dashboard

---

## 🗺️ PM Thinking: STEP Framework Applied

This project was scoped using the **PM Diego STEP Framework**:

| Step | Output |
|------|--------|
| **S** — Set a Goal | Prove Lead PM fitness with a live, working demo in Loopio's problem space |
| **T** — Target Segments | Sales Reps, Bid Managers, RevOps — each with distinct pain points |
| **E** — Extract Pain Points | 5 core pains: duplication, staleness, no visibility, knowledge silos, manual triage |
| **P** — Prioritise | Impact/Effort matrix → 3 tiers (Ship / Roadmap / Moonshot) |
| **Metrics** | 5 measurable KPIs defined before writing a line of code |

---

## 📋 Full PRD

The complete Product Requirements Document (13 sections, 3,000+ words) is available:
- **[Download PRD (DOCX)](./docs/RFP_Copilot_PRD.docx)**
- Covers: Problem statement, user segments, success metrics, feature prioritisation, technical architecture, user stories, risk register, and v2 roadmap.

---

## 🏗️ Technical Architecture

```
React 18  ──►  Claude API (claude-sonnet-4)  ──►  In-memory content library (30 entries)
    │                   │
    ▼                   ▼
Question manifest    Draft response
(JSON array)         { draft, confidence, isGap, sourceId }
    │
    ▼
Live dashboard (React state — no backend required for demo)
```

**Stack:**
- **Frontend:** React 18 + Lucide React icons
- **AI:** Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Styling:** Pure inline styles (zero CSS frameworks — full control, zero conflicts)
- **Hosting:** Vercel (1-click deploy)
- **Auth:** Not required for demo; documented in PRD for v2

**Prompt engineering highlights:**
- Structured JSON output with schema enforcement
- Few-shot grounding via the content library in system context
- Confidence scoring to distinguish strong matches from gaps
- Category-filtered library injection per question (reduces context noise)

---

## 🛣️ Roadmap

### v1 — Shipped (this repo)
- [x] RFP text ingestion + AI question extraction
- [x] 5-category classification (Technical / Security / Pricing / Legal / Company)
- [x] Complexity scoring (Low / Medium / High) + effort estimation
- [x] 30-entry content library
- [x] AI draft generation with confidence scoring
- [x] Knowledge gap detection and flagging
- [x] Live completion dashboard with category breakdown
- [x] Inline accept / edit / reject workflow

### v2 — Documented roadmap
- [ ] DOCX / CSV export of completed responses
- [ ] Multi-user assignment with comments and @mentions
- [ ] Stale content alerts (library entries older than configurable threshold)
- [ ] Auth layer (Clerk / Auth0) + multi-tenancy
- [ ] Supabase backend for persistent content library management
- [ ] Bulk library import (CSV upload)

### v3 — Moonshot 🚀
- [ ] **SME Auto-Assignment Engine** — classifies question topic domain (InfoSec, Legal, Finance) and automatically routes to the right subject-matter expert, pre-drafts an assignment notification, and tracks acceptance/completion. Requires org-chart integration.
- [ ] Predictive RFP win-probability scoring based on response quality patterns
- [ ] CRM integration (Salesforce) — link RFP records to opportunities

---

## 🏃 Run Locally

```bash
# 1. Clone
git clone https://github.com/[your-handle]/rfp-copilot.git
cd rfp-copilot

# 2. Install
npm install

# 3. Add your API key
cp .env.example .env
# Edit .env and set REACT_APP_ANTHROPIC_API_KEY=sk-ant-...

# 4. Start
npm start
```

> **Note on API key:** The app makes direct browser-to-Anthropic API calls for demo simplicity. For production, route through a serverless function (e.g., Vercel Edge Function) to keep the key server-side. This is documented in the PRD risk register.

## Deploy to Vercel

```bash
# One-command deploy
npx vercel --prod

# Set environment variable in Vercel dashboard:
# REACT_APP_ANTHROPIC_API_KEY = sk-ant-...
```

---

## 📁 Project Structure

```
rfp-copilot/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── claude.js          # All Anthropic API calls (extraction + draft generation)
│   ├── components/
│   │   ├── Welcome.jsx        # Landing / RFP input screen
│   │   ├── Sidebar.jsx        # Question list with category filters
│   │   ├── QuestionPanel.jsx  # Main question + draft view
│   │   └── Dashboard.jsx      # Analytics, progress, gap list
│   ├── data/
│   │   ├── library.js         # 30-entry content library + category config
│   │   └── sampleRfp.js       # 30-question demo RFP
│   ├── App.jsx                # State orchestration
│   └── index.js
├── docs/
│   └── RFP_Copilot_PRD.docx
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🔗 About This Project

This project is a candidate portfolio submission for **Loopio's Lead Product Manager** opening. It was built to demonstrate:

| JD Requirement | Demonstrated by |
|---|---|
| Customer-obsessed mindset | Entire project starts from user pain, not technology |
| Enterprise platform thinking | Content library + gap detection compound in value over time |
| AI engineering collaboration | Full prompt spec, JSON schema, confidence scoring in `claude.js` |
| Strategic roadmap ownership | v1 / v2 / Moonshot tiers with explicit prioritisation rationale |
| 7+ years PM experience | PRD structure, risk register, out-of-scope discipline, metrics discipline |
| Technical fluency | Working app, documented architecture, no hand-waving |

---

*Built with ❤️ and an obsession with enterprise user problems · May 2026*
