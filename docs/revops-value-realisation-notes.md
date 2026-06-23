# RevOps Value Realisation Prototype Notes

## Source context

The prototype direction came from a RevOps discussion about making reporting more useful than simple “did we sell more?” measures. The key concern was that metrics such as monthly active users can rise when more is sold and fall after churn, but they do not explain whether customers are activated, engaged, or receiving the value promised.

## RevOps framing captured from the conversation

The proposed framework is:

1. **Commercial Reach** — did the business reach and sell the right thing to the right customers, and at what price?
2. **Customer Activation** — are customers live with what they bought and technically able to use it?
3. **Customer Engagement** — are customers using the thing they are eligible to use?
4. **Value Realisation** — when customers use it, does it generate the promised value?

The board focus was called out as strongest around **value realisation metrics**.

## Engagement metric principle

Engagement should be shown as a **rate** against an eligible population, not as a raw count.

Example pattern:

```text
Engagement rate = meaningful usage / eligible population
```

Because real portfolio/product activity is not currently available for the prototype, the UI should use neutral placeholders such as **Feature 1** and **Feature 2** rather than naming unavailable activity types.

## Current prototype direction

The canvas should be full page and visualise a flow from commercial/product eligibility through activation, engagement, value, and renewal confidence.

Current placeholder nodes include:

- Commercial reach: customers bought Feature 1 and Feature 2.
- Commercial reach: price realised for placeholder feature set.
- Customer activation: customers live with purchased features.
- Customer activation: Feature 1 configured and ready to use.
- Customer engagement: Feature 1 engagement rate.
- Breadth of engagement: eligible accounts using Feature 1 or Feature 2.
- Depth of engagement: recurring weekly Feature 2 usage by target users.
- Value realisation: customers generate the value promised.
- Board signal: health, expansion, and renewal confidence.

## Data still needed later

To replace placeholders with real metrics, the business will need:

- Product or feature entitlement data by account.
- A definition of eligible population per feature.
- Activation milestones per feature.
- Meaningful usage events per feature.
- Value-realisation milestones or proxy metrics.
- Account lifecycle stage, renewal date, ARR/NRR/GRR, and customer health context.
- A reliable join between CRM accounts, contracts, entitlement records, product events, and customer-success data.

## Design decisions made so far

- Use a full-page React Flow canvas rather than a contained card section.
- Keep the map business-facing rather than product-analytics-heavy.
- Show each card with owner, rate/signal, eligible population, confidence bar, and status.
- Use placeholder Feature 1 and Feature 2 terminology until the real product activity model is available.
- Preserve the metric rule in the canvas: **Engagement = meaningful usage ÷ eligible population**.
