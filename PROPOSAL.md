# Product Proposal

## What is the product, and who uses it?
The **Startup Investment Syndicate** is a decentralized, privacy-first capital pooling platform designed for angel investors, venture collectives, and early-stage founders.

In traditional finance and standard public blockchains, investment rounds suffer from unwanted transparency: every participant's wallet address, exact net worth commitment, and portfolio allocation are exposed to the public, competitor funds, analytics firms, and predatory front-runners.

Our product enables investors to join a syndicate round and commit funds via zero-knowledge proofs. The platform guarantees that:
- **Angel Investors & VCs** can participate in strategic funding rounds with complete privacy regarding their identity and exact investment ticket size.
- **Syndicate Leads (GPs)** can coordinate capital pooling trustlessly without bearing the legal and operational overhead of custodying private financial ledgers.
- **Startup Founders** can prove their fundraising momentum and milestone achievements (e.g., reaching a $1,000,000 seed target) without leaking premature cap-table details or investor identities to market competitors.

---

## Why Midnight specifically?
Transparent blockchains (such as Ethereum, Solana, or Cardano L1) record all account balances and transaction parameters in plain text. On these networks, building a private syndicate requires centralized intermediaries, trusted custodial escrow services, or complex off-chain legal entities that defeat the purpose of decentralization.

Midnight is uniquely suited for this product because:
1. **Dual-State Privacy Model:** Midnight divides state into a verifiable public ledger and a zero-knowledge private witness layer. This allows our syndicate smart contract to publicly enforce round rules (e.g., goal amounts and global participation counts) while keeping individual investments completely confidential.
2. **Client-Side Proving with Compact:** Using Midnight's Compact language, zero-knowledge proofs are generated locally inside the investor's browser. Sensitive inputs—such as the investor's private identity key and specific contribution amount—never leave the user's device and are never broadcast over the network.
3. **Selective Disclosure (`disclose()`):** The contract uses Midnight's explicit disclosure primitives to reveal only verified facts (such as whether the syndicate target has been met) without revealing the underlying transaction graph.

---

## Data Model

| Data Point | Type | Disclosed To | Description |
|---|---|---|---|
| `goal_amount` | Public ledger | Everyone | Minimum fundraising target set during contract initialization |
| `total_committed` | Public ledger | Everyone | Cumulative sum of all approved investments pooled on-chain |
| `investor_count` | Public ledger | Everyone | Total count of distinct participating investors |
| `goal_reached` | Public ledger (Disclosed) | Everyone | Boolean flag proving `total_committed >= goal_amount` |
| `investor_secret` | Private witness (`Bytes<32>`) | No one | Cryptographic identity secret generated and kept in local wallet |
| `investment_amount` | Private witness (`Uint<64>`) | No one | Exact token amount contributed by an individual investor |
| `partialProofData` | ZK Proof / Transcript | Consensus Nodes | Zero-knowledge proof verifying valid contribution and transition rules |

---

## Mainnet Feasibility
This project is architected with a clear milestone path to reach Midnight Mainnet by Level 6:

1. **Architecture & Toolchain Compatibility (Levels 1–3):**
   - Compact smart contract compiled with toolchain v0.31.1.
   - 4/4 passing unit tests verifying circuit logic, state transitions, and zero-knowledge privacy.
   - Automated CI/CD pipeline verifying builds on every commit.

2. **Milestone Roadmap to Mainnet (Levels 4–6):**
   - **Level 4 (Escrow & Timeouts):** Add deadline mechanics, funding expiry circuits, and automated refund pathways if the target goal is not met within the commitment window.
   - **Level 5 (Lace Integration & Cap-Table Minting):** Direct integration with Lace wallet signing on the official Midnight Preprod network, with private receipt minting for syndicate participants.
   - **Level 6 (Mainnet Readiness & Auditing):** Circuit constraints audit, gas and proving performance benchmarking, and mainnet deployment utilizing production NIGHT tokens.
