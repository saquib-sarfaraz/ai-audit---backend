# AI Tool Pricing Data

This document tracks the base pricing data used by the Audit Engine to calculate estimates. 

*Verification Date: May 2026*

| Tool Name | Plan Tier | Monthly Cost (Per Seat) | Official URL | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **ChatGPT** | Plus | $20 | [openai.com/pricing](https://openai.com/pricing) | Individual plan. |
| **ChatGPT** | Team | $25 (billed annually) | [openai.com/pricing](https://openai.com/pricing) | Minimum 2 seats. |
| **GitHub Copilot** | Individual | $10 | [github.com/features/copilot](https://github.com/features/copilot) | |
| **GitHub Copilot** | Business | $19 | [github.com/features/copilot](https://github.com/features/copilot) | Policy management included. |
| **Notion AI** | Add-on | $8-$10 | [notion.so/pricing](https://notion.so/pricing) | $8 if billed annually, $10 monthly. |
| **Midjourney** | Pro | $60 | [midjourney.com/pricing](https://midjourney.com/pricing) | |
| **Claude** | Pro | $20 | [anthropic.com/pricing](https://anthropic.com/pricing) | |

## Assumptions Used in Logic
- If a user inputs "Enterprise" for a tool, the engine assumes custom pricing but targets a 40% reduction if the team size is under 10 (indicating they are over-provisioned).
- "Optimization" recommendations assume a conservative 15-20% savings through seat cleanup (removing inactive users).
