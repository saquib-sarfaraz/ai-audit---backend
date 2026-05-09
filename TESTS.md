# Tests

## Overview
The application uses Jest for unit testing. The test suite is designed to validate the core financial logic in the Audit Engine and ensure graceful degradation of the AI services.

## Test Files

### 1. `tests/auditEngine.test.js`
**Purpose:** Validates the deterministic business rules that calculate financial savings.
**Tests Covered:**
- Verifies that optimized teams receive a "Maintain" recommendation and $0 in projected savings.
- Verifies that small teams (under 10 seats) on Enterprise plans trigger a "Downgrade" recommendation.
- Ensures the math accurately catches overspending (e.g., cost per seat exceeding $100) and triggers an "Optimize" action.
- Validates that multiple tool inputs are correctly aggregated into total monthly and annual savings.

### 2. `tests/aiService.test.js`
**Purpose:** Tests the Groq AI integration and resilience.
**Tests Covered:**
- Mocks a network timeout/failure from the Groq SDK.
- Verifies that the system catches the error and returns a deterministic, professional fallback summary containing the correct dynamically injected annual savings figure, ensuring the UI never breaks.

## How to Run Tests
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the Jest test suite:
   ```bash
   npm test
   ```
3. To run tests in watch mode during development:
   ```bash
   npx jest --watchAll
   ```
