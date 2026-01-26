# Financial Standards and Projections Guidelines

## Purpose
These rules ensure financial sections are credible, realistic, and transparent. They provide standardized approaches for building financial models that pass investor scrutiny.

## Financial Projection Principles

### Core Requirements
- **Transparency**: All assumptions explicitly stated and justified
- **Conservatism**: Conservative assumptions are better than aggressive ones
- **Realism**: Projections grounded in market data and comparable benchmarks
- **Consistency**: All calculations follow the same methodology throughout
- **Auditability**: Someone could verify your numbers by reviewing assumptions

## Revenue Model Framework

### Revenue Streams for Forward Deployed AIX
1. **Implementation Services**
   - One-time fees for deployment, customization, and integration
   - Varies by complexity and scope
   - Should represent 20-40% of Year 1 revenue

2. **Managed Services (Recurring)**
   - Monthly/annual subscription for ongoing management
   - Team time, system monitoring, optimization
   - Should scale to 60-80% of revenue by Year 3

3. **Platform Licensing** (if applicable)
   - Software components and tools
   - Typically 10-20% of recurring revenue

4. **Professional Services**
   - Training, workshops, and consulting
   - Time-and-materials or fixed-fee basis

### Assumptions to Document

For each revenue stream, explicitly state:
- **Customer Acquisition Cost (CAC)**
- **Average Contract Value (ACV)**
- **Contract Duration**
- **Churn Rate** (% of customers leaving annually)
- **Expansion Rate** (% of revenue growth from existing customers)
- **Sales Cycle** (months from initial contact to signature)

## Market Sizing (TAM/SAM/SOM)

### Total Addressable Market (TAM)
- **Definition**: Total revenue opportunity if you captured 100% of the market
- **Calculation**: Market size × number of potential customers OR industry data from reputable sources
- **Sources**: Gartner, IDC, McKinsey reports (cite them)
- **Format**: "The forward-deployed AI services market is estimated at $XX billion globally"

### Serviceable Addressable Market (SAM)
- **Definition**: Revenue opportunity in your target segments with your specific offering
- **Approach**: TAM × your target market segment percentage
- **Example**: "We target enterprise financial services companies (40% of TAM), yielding $XX billion SAM"
- **Realism Check**: SAM should be 10-30% of TAM

### Serviceable Obtainable Market (SOM)
- **Definition**: Revenue you could realistically capture in the specified timeframe (3-5 years)
- **Approach**: Conservative market share assumptions (0.1-1% is typical for 5 years)
- **Format**: "Capturing 0.5% of SAM by Year 5 = $XX million in revenue"
- **Rule**: SOM should be 5-10% of SAM

## Financial Projection Timeline

### Standard Projection Period
- **Years**: 5 years forward (3 years detailed, 2 years directional)
- **Detail Level**: 
  - Year 1: Monthly (12 months)
  - Year 2: Quarterly (4 quarters)
  - Years 3-5: Annual

### Key Financial Statements

#### Revenue Projections
- Break down by segment/stream month by month (Year 1), quarterly (Year 2), annually (Years 3-5)
- Show customer count and ACV growth
- Document assumptions for each projection

**Example Format**:
| Metric | Y1 Q1 | Y1 Q2 | Y1 Q3 | Y1 Q4 | Y1 Total |
|--------|-------|-------|-------|-------|----------|
| Implementation Revenue | $XXX | $XXX | $XXX | $XXX | $XXXX |
| Managed Services Revenue | $X | $X | $XXX | $XXX | $XXXX |
| **Total Revenue** | $XXX | $XXX | $XXXX | $XXXX | $XXXXX |

#### Cost of Revenue (COGS)
- **Salary costs** for engineering/deployment teams
- **Infrastructure** and hosting costs
- **Third-party tools** and services
- **Travel** for on-site work (especially important for forward deployment model)

**Gross Margin Goal**: 50%+ by Year 2 for managed services focused business

#### Operating Expenses
- **Sales & Marketing**: Typically 15-25% of revenue
- **General & Administrative**: Typically 10-15% of revenue
- **Research & Development**: 10-20% of revenue for tech-forward business
- **Personnel**: Breakdown by department and cost per role

#### Cash Flow Projections
- **Cash Inflows**: Revenue (adjusted for payment timing)
- **Cash Outflows**: All expenses, equipment, payroll
- **Net Cash Flow**: Inflows - Outflows
- **Cumulative Cash**: Runway analysis
- **Key Metric**: Months of runway (important for fundraising)

#### Profitability Path
- **Year 1**: Likely negative (growth phase)
- **Year 2-3**: Path to breakeven should be visible
- **Year 4-5**: Positive EBITDA
- **Rule**: Show clear path to profitability within 3-4 years

## Assumptions Documentation

### Format for Each Key Assumption

```
**[Assumption Name]**
- Value/Range: [Specific number with unit]
- Justification: [Why this number is realistic]
- Source: [Data source, benchmark, or reasoning]
- Sensitivity: [What happens if ±10%, ±20%]
```

### Critical Assumptions for Forward Deployed AIX

1. **Average Contract Value (ACV)**
   - Initial Implementation: $500K - $2M (1-3 year contracts)
   - Justification: Based on Palantir and Anthropic deployment models
   - Market validation: Compare to consulting project sizes

2. **Sales Cycle Length**
   - Assumption: 6-9 months
   - Justification: Enterprise sales cycles for tech services
   - Source: SaaS benchmarks + professional services timelines

3. **Customer Acquisition Cost**
   - Assumption: 20-30% of Year 1 ACV
   - Justification: Professional services sales require significant investment
   - Sensitivity: Higher for new market, lower for second/third customer

4. **Churn Rate**
   - Assumption: 5-10% annually for managed services
   - Justification: High integration means stickiness; but contracts finite
   - Best case: Expand within account, reducing churn

5. **Team Growth**
   - Assumption: Hire X engineers/managers per quarter
   - Justification: Revenue per person benchmarks in professional services
   - Constraint: Hiring and onboarding takes time

## Sensitivity Analysis

### What-If Scenarios

Present alternative financial outcomes:
- **Optimistic Case**: +20% revenue growth, faster customer adoption
- **Base Case**: Your primary projection
- **Conservative Case**: -20% revenue growth, extended sales cycles, higher churn

**Format**: Show each scenario's Year 3 revenue and profitability to highlight impact

### Key Variables to Sensitize
1. ACV (±20%)
2. Customer Acquisition Cost (±20%)
3. Churn Rate (±5 percentage points)
4. Sales Cycle Length (±2 months)

## Financial Metrics for Investors

### Unit Economics
- **CAC Payback Period**: Months to recover customer acquisition cost (Target: <24 months)
- **Lifetime Value (LTV)**: Total revenue from customer over relationship
- **LTV/CAC Ratio**: Minimum 3:1 for subscription businesses
- **Magic Number**: (Quarter Revenue Growth × Gross Margin) / Previous Quarter S&M Spend (Target: >0.75)

### Growth Metrics
- **Month-over-Month Growth Rate**: Track early traction
- **Year-over-Year Growth Rate**: Normalized growth
- **CAC Efficiency**: Revenue per dollar of S&M spend

### Capital Efficiency
- **Burn Rate**: Monthly cash burn if negative cash flow
- **Runway**: Months of operations before running out of cash
- **Capital Raised to Date**: How much funding you've received
- **Funding Needed**: Amount you're raising and use of proceeds

## Benchmarks and Comparisons

### Professional Services Companies
- Average project size: $300K - $5M+
- Gross margins: 40-60%
- S&M spend: 15-25% of revenue
- Sales cycles: 3-12 months

### Software (SaaS) Companies (for comparison)
- Gross margins: 70-80%
- S&M spend: 20-50% of revenue
- Sales cycles: 1-6 months

### Forward Deployed AI Hybrid Model
- You'll likely be between these two
- Gross margins: 50-65% (higher than pure services, lower than pure software)
- S&M spend: 15-30%
- Sales cycles: 6-12 months

## Red Flags to Avoid

- **Unrealistic growth** (e.g., 400% YoY with no evidence)
- **Inconsistent assumptions** (CAC contradicts revenue projections)
- **No path to profitability** visible within 5 years
- **Overly precise projections** (claiming exact revenue to the dollar)
- **Missing key costs** (e.g., underestimating team costs for forward deployment)
- **No sensitivity analysis** (only showing one scenario)
- **Disconnect from market** (projections that don't align with TAM/SAM analysis)

## Presentation Standards

### In Business Plan
- Round numbers appropriately (e.g., "$10M" not "$10,237,459")
- Use charts/graphs for trends (not just tables)
- Keep financial details to 2-3 pages, full model available separately
- Highlight key metrics (profitability date, breakeven, key unit economics)

### Supporting Materials
- Full financial model as separate Excel/spreadsheet (available on request)
- Detailed assumptions document
- Sensitivity analysis scenarios

---

**Version**: 1.0  
**Last Updated**: January 23, 2026  
**Applies To**: Financial sections of business plan and pitch deck
