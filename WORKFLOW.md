# Forward Deployed AIX: Agentic Business Plan Workflow

This document describes how to use Agent Skills to systematically generate a high-quality business plan and elevator pitch decks for Forward Deployed AIX.

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: DATA COLLECTION & DISCOVERY                            │
│ - Complete DATA_COLLECTION_TEMPLATE.md                           │
│ - Gather market research and competitive intelligence            │
│ - Document company positioning and service offering             │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: SPECIALIZED ANALYSIS (Using Skills)                   │
│                                                                  │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Skill 1: MARKET ANALYSIS                               │   │
│ │ Output: /outputs/business-plan/02-market-analysis.md  │   │
│ │ Time: 4-6 hours                                        │   │
│ └──────────────────────────────────────────────────────────┘   │
│                       │                                         │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Skill 2: COMPETITIVE ANALYSIS                          │   │
│ │ Output: /outputs/business-plan/03-competitive.md      │   │
│ │ Time: 3-4 hours                                        │   │
│ └──────────────────────────────────────────────────────────┘   │
│                       │                                         │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Skill 3: PRODUCT/SERVICE DEFINITION                   │   │
│ │ Output: /outputs/business-plan/04-offering.md         │   │
│ │ Time: 2-3 hours                                        │   │
│ └──────────────────────────────────────────────────────────┘   │
│                       │                                         │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Skill 4: GO-TO-MARKET STRATEGY                         │   │
│ │ Output: /outputs/business-plan/05-go-to-market.md    │   │
│ │ Time: 3-4 hours                                        │   │
│ └──────────────────────────────────────────────────────────┘   │
│                       │                                         │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Skill 5: FINANCIAL PROJECTIONS                         │   │
│ │ Output: /outputs/business-plan/06-financials.md      │   │
│ │ Time: 4-5 hours                                        │   │
│ └──────────────────────────────────────────────────────────┘   │
│                       │                                         │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Skill 6: TEAM & ORGANIZATION                           │   │
│ │ Output: /outputs/business-plan/07-team.md            │   │
│ │ Time: 2-3 hours                                        │   │
│ └──────────────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: SYNTHESIS & EXECUTIVE SUMMARY                          │
│                                                                  │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Skill 7: EXECUTIVE SUMMARY GENERATOR                   │   │
│ │ Output: /outputs/business-plan/01-executive-summary.md│   │
│ │ (Written last, synthesizes all sections)              │   │
│ │ Time: 3-4 hours                                        │   │
│ └──────────────────────────────────────────────────────────┘   │
│                       │                                         │
│ Output: COMPLETE BUSINESS PLAN                                 │
│ File: /outputs/business-plan/BUSINESS_PLAN.md                 │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 4: ELEVATOR PITCH & DECK GENERATION                       │
│                                                                  │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Skill 8: ELEVATOR PITCH GENERATOR                      │   │
│ │ Outputs:                                                │   │
│ │ - /outputs/pitch-decks/elevator-pitch-30s.md          │   │
│ │ - /outputs/pitch-decks/elevator-pitch-60s.md          │   │
│ │ Time: 2-3 hours                                        │   │
│ └──────────────────────────────────────────────────────────┘   │
│                       │                                         │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Skill 9: PITCH DECK GENERATOR                          │   │
│ │ Outputs:                                                │   │
│ │ - /outputs/pitch-decks/seed-round-deck.pptx           │   │
│ │ - /outputs/pitch-decks/series-a-deck.pptx             │   │
│ │ Time: 4-5 hours                                        │   │
│ └──────────────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
              COMPLETE BUSINESS PLAN
         + ELEVATOR PITCHES + DECK PRESENTATIONS
```

## Phase-by-Phase Instructions

### PHASE 1: DATA COLLECTION & DISCOVERY (2-3 hours)

**Goal**: Gather all information needed to generate comprehensive business plan sections.

**Steps:**
1. Open `/data/DATA_COLLECTION_TEMPLATE.md`
2. Fill in all sections to the best of your current knowledge
3. Mark sections with ❓ where you need additional research
4. Conduct focused research on key unknowns:
   - Market sizing (use Gartner, IDC reports)
   - Competitor information (LinkedIn, websites, case studies)
   - Pricing benchmarks (industry reports, comparable services)
5. Create `/data/company-info.md` with basic company facts
6. Create `/data/financial-assumptions.md` with key assumptions
7. Create `/data/competitive-landscape.md` with competitor research

**Success Criteria:**
- ✅ DATA_COLLECTION_TEMPLATE is 80%+ complete
- ✅ You can articulate your service in 2-3 sentences
- ✅ You've identified your primary target segment
- ✅ You have preliminary market size estimates

---

### PHASE 2A: MARKET ANALYSIS (4-6 hours)

**Goal**: Create a comprehensive market analysis with TAM/SAM/SOM and growth drivers.

**How to Use the Market Analysis Skill:**

1. **Invoke the Skill**:
   ```
   I want to use the Market Analysis Skill to develop our business plan.
   Here's my current understanding:
   - Target sectors: Financial Services, Healthcare, Industrial
   - Estimated TAM: $8-12B based on AI services market
   - Primary customers: Enterprise executives (CDOs, COOs, CTOs)
   ```

2. **Work Through Steps 1-7** of the skill:
   - Define TAM with top-down and bottom-up approaches
   - Calculate SAM based on target segments
   - Determine SOM based on market share assumptions
   - Document market trends and growth drivers
   - Create competitive positioning
   - Develop customer personas

3. **Produce Output**:
   - File: `/outputs/business-plan/02-market-analysis.md`
   - Should be 6-8 pages
   - Include data sources and calculations

4. **Review & Iterate**:
   - Does TAM/SAM/SOM feel realistic?
   - Are market trends compelling?
   - Does competitive positioning resonate?

---

### PHASE 2B: COMPETITIVE ANALYSIS (3-4 hours)

**Goal**: Deep dive into competitive positioning and differentiation strategy.

**Preparation for Competitive Analysis Skill:**
- List 5-10 direct and indirect competitors
- Research their positioning, pricing, case studies
- Document their strengths and weaknesses

**Skill Application:**
(Competitive Analysis Skill - to be created in next iteration)
- Create detailed competitive comparison
- Develop differentiation strategy
- Identify white space opportunities
- Build competitive response scenarios

**Produce Output**:
- File: `/outputs/business-plan/03-competitive-analysis.md`
- Competitive matrix visual
- Differentiation positioning statement

---

### PHASE 2C-F: ADDITIONAL SKILLS (Parallel Execution)

**Skills to Apply:**
- **Product/Service Definition**: Detail your offering, use cases, value proposition
- **Go-to-Market Strategy**: Sales model, customer acquisition, partnerships
- **Financial Projections**: Revenue models, expense projections, unit economics
- **Team & Organization**: Founding team, organizational structure, hiring plan

**Timing**: Can be done in parallel once data collection is complete.

**Output Files**:
- `/outputs/business-plan/04-offering.md`
- `/outputs/business-plan/05-go-to-market.md`
- `/outputs/business-plan/06-financials.md`
- `/outputs/business-plan/07-team.md`

---

### PHASE 3: EXECUTIVE SUMMARY (3-4 hours)

**Goal**: Create a compelling 1-2 page executive summary.

**Wait Until**: All other sections are complete (executive summary synthesizes them)

**Executive Summary Skill** (to be created):
- Review all sections
- Synthesize into 1-2 page overview
- Craft compelling narrative
- Lead with strongest points

**Produce Output**:
- File: `/outputs/business-plan/01-executive-summary.md`
- Also: `/outputs/business-plan/BUSINESS_PLAN.md` (complete document with all sections)

---

### PHASE 4A: ELEVATOR PITCH GENERATION (2-3 hours)

**Goal**: Create 30-second and 60-second elevator pitches for networking/investors.

**Elevator Pitch Skill** (to be created):
- 30-second pitch: Problem, Solution, Why Now (opening/icebreaker)
- 60-second pitch: Problem, Solution, Market, Why You (fuller story)
- Variations for different audiences (investors, customers, partners)

**Produce Output**:
- `/outputs/pitch-decks/elevator-pitch-30s.md`
- `/outputs/pitch-decks/elevator-pitch-60s.md`
- Includes multiple variations for different contexts

---

### PHASE 4B: PITCH DECK GENERATION (4-5 hours)

**Goal**: Create investor-ready pitch decks for different funding stages.

**Pitch Deck Skill** (to be created):
- Seed-stage deck (14-16 slides): Problem, Solution, Market, Team, Ask
- Series A deck (18-20 slides): Add traction, metrics, deeper competitive analysis
- Design guidelines: professional, visual, consistent brand

**Produce Output**:
- `/outputs/pitch-decks/seed-round-deck.pptx` (PowerPoint)
- `/outputs/pitch-decks/series-a-deck.pptx` (PowerPoint)
- Includes speaker notes for each slide

---

## How to Invoke Each Skill

### General Pattern

When you want to use a skill, say:

```
I want to use the [SKILL NAME] to [GOAL].

Current context:
- [Key information 1]
- [Key information 2]
- [Key information 3]

Relevant data files:
- /data/company-info.md
- /data/financial-assumptions.md

Expected output:
- /outputs/business-plan/[FILENAME].md
```

### Example: Market Analysis Skill

```
I want to use the Market Analysis Skill to develop comprehensive market sizing and opportunity analysis for Forward Deployed AIX.

Current context:
- Target sectors: Financial Services (35%), Healthcare (30%), Industrial (20%), Other (15%)
- AI services market size: ~$25B globally (Gartner 2024)
- Forward-deployed AI represents estimated 20-30% of AI services market
- Primary customers: CDOs, COOs, VP Operations, CTOs

Relevant data files:
- /data/company-info.md
- /data/competitive-landscape.md
- /data/DATA_COLLECTION_TEMPLATE.md (partially filled)

Expected output:
- /outputs/business-plan/02-market-analysis.md
- ~6-8 pages
- Include TAM/SAM/SOM with calculations
- Include growth drivers and market trends
- Include customer personas
```

---

## Timeline & Resource Allocation

### Estimated Total Time: 28-35 hours

| Phase | Task | Time | Dependencies |
|-------|------|------|--------------|
| 1 | Data Collection | 2-3 hrs | None |
| 2A | Market Analysis | 4-6 hrs | Phase 1 |
| 2B | Competitive Analysis | 3-4 hrs | Phase 1 |
| 2C | Product/Service | 3-4 hrs | Phase 1 |
| 2D | Go-to-Market | 3-4 hrs | Phase 1, 2B |
| 2E | Financial Projections | 4-5 hrs | Phase 1 |
| 2F | Team & Organization | 2-3 hrs | Phase 1 |
| 3 | Executive Summary | 3-4 hrs | Phase 2 (all) |
| 4A | Elevator Pitches | 2-3 hrs | Phase 3 |
| 4B | Pitch Decks | 4-5 hrs | Phase 3 |

**Acceleration**: Skills 2B-2F can run in parallel (depends only on Phase 1)

---

## Quality Checkpoints

### After Each Phase

**Phase 1 Checkpoint**:
- ✅ Can explain business in investor terms
- ✅ Market data is researched and documented
- ✅ Competitive positioning is clear

**Phase 2 Checkpoint** (Each Skill):
- ✅ Outputs follow .cursor/rules standards
- ✅ Data is cited with sources
- ✅ Claims are supported with evidence
- ✅ No typos or formatting errors

**Phase 3 Checkpoint**:
- ✅ Executive summary compels immediate interest
- ✅ All key sections are integrated
- ✅ Story arc is clear (problem → solution → opportunity → team → ask)

**Phase 4 Checkpoint**:
- ✅ Pitches are compelling and memorable
- ✅ Decks are visually professional
- ✅ Messaging is consistent with business plan

---

## Iteration & Refinement

**Expected iterations:**
- Round 1: Initial generation using skills
- Round 2: Refinement based on feedback
- Round 3: Investor feedback incorporation
- Round 4: Final polish for presentation

**When to iterate:**
- After getting feedback from advisors
- After market research reveals new insights
- After refining pricing or financial assumptions
- Before major investor pitching

---

## Files Reference

### Input Data Files
- `/data/DATA_COLLECTION_TEMPLATE.md` - Structured data input
- `/data/company-info.md` - Basic company information
- `/data/financial-assumptions.md` - Key financial assumptions
- `/data/competitive-landscape.md` - Competitor research

### Cursor Rules
- `.cursor/rules/business-writing.md` - Writing standards
- `.cursor/rules/financial-standards.md` - Financial accuracy guidelines

### Skills
- `.cursor/skills/market-analysis/SKILL.md` - Market sizing
- `.cursor/skills/competitive-analysis/SKILL.md` - Competitive positioning (coming soon)
- `.cursor/skills/product-service/SKILL.md` - Service definition (coming soon)
- `.cursor/skills/go-to-market/SKILL.md` - GTM strategy (coming soon)
- `.cursor/skills/financial-projections/SKILL.md` - Financial modeling (coming soon)
- `.cursor/skills/team-org/SKILL.md` - Team building (coming soon)
- `.cursor/skills/executive-summary/SKILL.md` - Summary writing (coming soon)
- `.cursor/skills/elevator-pitch/SKILL.md` - Pitch crafting (coming soon)
- `.cursor/skills/pitch-deck/SKILL.md` - Deck generation (coming soon)

### Output Files
- `/outputs/business-plan/01-executive-summary.md`
- `/outputs/business-plan/02-market-analysis.md`
- `/outputs/business-plan/03-competitive-analysis.md`
- `/outputs/business-plan/04-offering.md`
- `/outputs/business-plan/05-go-to-market.md`
- `/outputs/business-plan/06-financials.md`
- `/outputs/business-plan/07-team.md`
- `/outputs/business-plan/BUSINESS_PLAN.md` (complete document)
- `/outputs/pitch-decks/elevator-pitch-30s.md`
- `/outputs/pitch-decks/elevator-pitch-60s.md`
- `/outputs/pitch-decks/seed-round-deck.pptx`
- `/outputs/pitch-decks/series-a-deck.pptx`

---

## Next Steps

1. **Complete Phase 1**: Fill in `/data/DATA_COLLECTION_TEMPLATE.md`
2. **Invoke Market Analysis Skill**: Start Phase 2A
3. **Work through remaining skills**: Parallel execution where possible
4. **Synthesize**: Create executive summary and final business plan
5. **Polish**: Generate elevator pitches and pitch decks

---

**Workflow Version**: 1.0  
**Last Updated**: January 23, 2026  
**Status**: Ready for execution
