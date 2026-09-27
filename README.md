# Startup Investment Syndicate
[![CI](https://github.com/sachinnit25/Startup-Investment-syndicate/actions/workflows/ci.yml/badge.svg)](https://github.com/sachinnit25/Startup-Investment-syndicate/actions/workflows/ci.yml)
> A privacy-preserving startup investment syndicate smart contract on the Midnight Network.

## Live Demo
https://startup-investment-syndicate.vercel.app

## Contract Address
| Network  | Address                                                          |
|----------|------------------------------------------------------------------|
| Preprod  | `52d14a9f3588ceb1c8934b8e6ee2f5de829b74ae5db7b507c65f6b4494a4d042` |

> ⚠️ Contract address is mandatory. Deployed on Midnight Preprod / Devnet.

## What This Does
The **Startup Investment Syndicate** is a decentralized application (dApp) that enables investors to pool capital towards a startup funding goal without revealing their personal identity or their exact financial contribution.

Investors connect their Lace wallet, generate zero-knowledge proofs locally in the browser, and submit them directly on-chain. The smart contract tallies aggregate funds and publicly reveals when the funding goal is reached, while ensuring individual participant data stays completely confidential.

## Privacy Model
- **PUBLIC:**
  - `total_committed`: Aggregate funds pooled by all investors on-chain
  - `investor_count`: Total number of participating investors
  - `goal_amount`: Target fundraising goal
  - `goal_reached`: Boolean indicating if `total_committed >= goal_amount`
- **PRIVATE:**
  - `investor_secret`: 32-byte secret witness key uniquely identifying the investor
  - `investment_amount`: Exact numerical contribution of each investor
- **PROVED without revealing:**
  - The investor possesses a valid secret identity key
  - The investor committed a valid non-zero amount
  - The updated aggregate total and whether the syndicate goal has been reached

## Privacy Claim
An on-chain observer sees that a transaction occurred, the incremented count of investors, and the cumulative capital pooled. An observer **CANNOT** see who participated, their wallet identity, or their specific investment amount.

## Tech Stack
- **Blockchain:** Midnight Network (Privacy-focused L1)
- **Language:** Compact (v0.31.1 zero-knowledge smart contracts)
- **SDK:** `@midnight-ntwrk/compact-runtime`, `@midnight-ntwrk/dapp-connector-api`
- **Frontend:** React 18, Vite 5, TypeScript
- **Wallet:** Lace Wallet (with Midnight DApp Connector)
- **CI/CD:** GitHub Actions

## Prerequisites
- Node.js v22 (`node -v` → `v22.x.x`)
- Docker Desktop (for proof server during contract development)
- Lace Wallet browser extension
- Compact compiler v0.31.1

## Setup & Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/sachinnit25/Startup-Investment-syndicate.git
cd Startup-Investment-syndicate

# 2. Install dependencies
npm install

# 3. Compile the Compact contract (WSL / Linux)
compact compile contracts/counter.compact managed/counter

# 4. Start the frontend development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Run Tests

Run the test suite verifying circuit logic, state transitions, and zero-knowledge privacy:

```bash
npm test
```

Expected output:
```
✓ tests/counter.test.ts (4 tests)
  ✓ circuit logic: returns false when total committed is strictly below the goal
  ✓ state transitions: accumulates total committed and increments investor count correctly
  ✓ privacy: investor secret and exact contribution are never stored in public ledger state
  ✓ read circuit: get_status reads public ledger state without mutating ledger

Test Files  1 passed (1)
     Tests  4 passed (4)
```

## CI/CD
The project features an automated continuous integration pipeline in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) that executes on every `push` and `pull_request` to `main`:
1. Checks out the code repository
2. Sets up Node.js v22
3. Installs NPM dependencies
4. Installs the Compact compiler (v0.31.1)
5. Compiles the Compact contract
6. Runs the complete test suite (`npm test`)
7. Builds the frontend production bundle (`npm run build`)

## Product Proposal
See [PROPOSAL.md](PROPOSAL.md) for the product proposal, user personas, Midnight rationale, data model, and mainnet feasibility.

## Demo Video
https://youtu.be/1uyMOp2bNT4
