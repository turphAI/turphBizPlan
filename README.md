# Forward Deployed AIX - Business Plan Project

## Project Overview
This project generates a comprehensive business plan and elevator pitch decks for **Forward Deployed AIX**, a service offering that embeds AI systems and engineers directly within client operational environments for real-time problem-solving and context-specific optimization.

## Project Structure

```
bizPlan/
├── README.md                          # This file
├── CONCEPT.md                         # Core business concept and vision
├── .cursor/
│   ├── rules/                         # Cursor rules for consistency
│   │   ├── business-writing.md        # Business writing standards
│   │   └── financial-standards.md     # Financial accuracy guidelines
│   └── skills/                        # Custom Agent Skills
│       ├── executive-summary/SKILL.md
│       ├── market-analysis/SKILL.md
│       ├── financial-projections/SKILL.md
│       ├── competitive-analysis/SKILL.md
│       ├── elevator-pitch/SKILL.md
│       └── deck-generator/SKILL.md
├── data/
│   ├── company-info.md                # Company details and positioning
│   ├── market-research/               # Market insights and data
│   ├── financial-assumptions.md       # Key financial assumptions
│   └── competitive-landscape.md       # Competitor analysis
├── outputs/
│   ├── business-plan/                 # Generated business plan
│   │   ├── 01-executive-summary.md
│   │   ├── 02-market-analysis.md
│   │   ├── 03-competitive-analysis.md
│   │   ├── 04-product-service.md
│   │   ├── 05-go-to-market.md
│   │   ├── 06-financial-projections.md
│   │   ├── 07-team.md
│   │   └── BUSINESS_PLAN.md           # Complete plan
│   └── pitch-decks/
│       ├── elevator-pitch-30s.md
│       ├── elevator-pitch-60s.md
│       ├── deck-seed-round.pptx
│       └── deck-investor-series-a.pptx
└── agents.md                          # Agent workflow orchestration

```

## Agentic Workflow

### Phase 1: Data Collection & Inputs
- [ ] Gather company information
- [ ] Document market research
- [ ] Define financial assumptions
- [ ] Analyze competitive landscape

### Phase 2: Business Plan Generation (Agentic Skills)
1. **Market Analysis Agent** → Market and opportunity analysis
2. **Competitive Analysis Agent** → Competitor positioning
3. **Financial Projections Agent** → Revenue models and projections
4. **Product/Service Agent** → Detailed offering description
5. **Executive Summary Agent** → Compelling overview
6. **Synthesis Agent** → Complete business plan assembly

### Phase 3: Pitch Deck Generation
1. **Elevator Pitch Agent** → 30s and 60s versions
2. **Deck Generator Agent** → Visual presentations

## Using This Project

### To Generate a Business Plan Section
1. Ensure required input data exists in `/data`
2. Invoke the appropriate Skill agent (e.g., "Use Market Analysis Skill")
3. Review and refine the generated output
4. Move to `/outputs/business-plan`

### To Create an Elevator Pitch
1. Run the Elevator Pitch Skill with business plan context
2. Generate 30s and 60s versions
3. Iterate for clarity and impact

## Quality Standards

This project uses Cursor Rules to maintain:
- **Business Writing Excellence** - Clear, compelling, professional tone
- **Financial Accuracy** - Realistic assumptions and transparent calculations
- **Strategic Clarity** - Clear positioning and differentiation
- **Investor Readiness** - Professional formatting and completeness

See `.cursor/rules/` for detailed standards.

## Next Steps

1. Start with the **Market Analysis Skill** to understand TAM, SAM, and SOM
2. Document initial competitive analysis using **Competitive Analysis Skill**
3. Build financial projections using **Financial Projections Skill**
4. Generate **Executive Summary** once core sections complete
5. Create **Elevator Pitches** for networking and investor conversations
6. Generate **Pitch Decks** for formal presentations

---

**Status**: Project Setup Complete | Next: Data Collection Phase
