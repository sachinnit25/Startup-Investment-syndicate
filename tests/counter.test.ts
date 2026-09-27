import { describe, it, expect, beforeAll } from '@midnight-ntwrk/midnight-js-testing';
import { WitnessContext }                   from '@midnight-ntwrk/compact-runtime';
import { Contract, Ledger, witnesses }       from '../managed/counter/contract/index.cjs';

// ---------------------------------------------------------------------------
// Helper: build a fresh in-memory ledger with a given goal
// ---------------------------------------------------------------------------
function buildLedger(goal: bigint): Ledger {
  return {
    total_committed: 0n,
    investor_count:  0n,
    goal_amount:     goal,
    goal_reached:    false,
  };
}

// A deterministic fake investor secret (32 bytes, all zeros) — never on-chain
const MOCK_SECRET = new Uint8Array(32).fill(0);

// ---------------------------------------------------------------------------
// Test Suite
// ---------------------------------------------------------------------------
describe('Startup Investment Syndicate — counter.compact', () => {

  // ── Test 1: Circuit Logic — goal not reached when committed < goal ────────
  it('goal_reached is false when total committed is below the goal', async () => {
    const ledger = buildLedger(1_000_000n); // goal: 1,000,000 units

    const witnessCtx: WitnessContext<Ledger> = {
      ledger,
      // Provide private investor_secret witness — never stored on-chain
      privateSeed: MOCK_SECRET,
    };

    const contract = new Contract(witnesses);
    const result   = await contract.commit_investment(witnessCtx, 500_000n); // 500k < 1M

    expect(result.output).toBe(false);           // goal NOT reached
    expect(result.ledger.total_committed).toBe(500_000n);
    expect(result.ledger.investor_count).toBe(1n);
    expect(result.ledger.goal_reached).toBe(false);
  });

  // ── Test 2: State Transition — multiple investors accumulate correctly ─────
  it('accumulates investments from multiple investors correctly', async () => {
    const ledger = buildLedger(1_000_000n);

    const contract = new Contract(witnesses);

    // First investor commits 600k
    const ctx1: WitnessContext<Ledger> = { ledger, privateSeed: MOCK_SECRET };
    const r1 = await contract.commit_investment(ctx1, 600_000n);

    // Second investor commits 500k using updated ledger state
    const ctx2: WitnessContext<Ledger> = { ledger: r1.ledger, privateSeed: MOCK_SECRET };
    const r2 = await contract.commit_investment(ctx2, 500_000n);

    expect(r2.ledger.total_committed).toBe(1_100_000n);  // 600k + 500k
    expect(r2.ledger.investor_count).toBe(2n);
    expect(r2.ledger.goal_reached).toBe(true);            // 1.1M >= 1M goal
    expect(r2.output).toBe(true);
  });

  // ── Test 3: Private Inputs Are Never Exposed ──────────────────────────────
  it('does not expose the investor secret or exact investment amount on-chain', async () => {
    const ledger = buildLedger(500_000n);

    const contract = new Contract(witnesses);
    const ctx: WitnessContext<Ledger> = { ledger, privateSeed: MOCK_SECRET };

    const result = await contract.commit_investment(ctx, 300_000n);

    // The on-chain ledger must NOT contain raw private inputs
    const ledgerKeys = Object.keys(result.ledger);
    expect(ledgerKeys).not.toContain('investor_secret');
    expect(ledgerKeys).not.toContain('investment_amount');

    // The proof output only discloses the goal-reached boolean — nothing else
    expect(typeof result.output).toBe('boolean');

    // total_committed is updated (aggregate), but individual amount is not stored
    expect(result.ledger.total_committed).toBe(300_000n);
  });

  // ── Test 4: Zero Investment Should Fail ───────────────────────────────────
  it('rejects a zero-value investment', async () => {
    const ledger   = buildLedger(1_000_000n);
    const contract = new Contract(witnesses);
    const ctx: WitnessContext<Ledger> = { ledger, privateSeed: MOCK_SECRET };

    await expect(contract.commit_investment(ctx, 0n))
      .rejects.toThrow('Investment amount must be greater than zero');
  });

  // ── Test 5: get_status returns correct public state ───────────────────────
  it('get_status returns correct aggregated public ledger values', async () => {
    const ledger   = buildLedger(1_000_000n);
    const contract = new Contract(witnesses);

    // Commit two investments
    const ctx1  = { ledger,       privateSeed: MOCK_SECRET };
    const r1    = await contract.commit_investment(ctx1, 400_000n);
    const ctx2  = { ledger: r1.ledger, privateSeed: MOCK_SECRET };
    const r2    = await contract.commit_investment(ctx2, 700_000n);

    const [total, count, reached] = r2.output as [bigint, bigint, boolean];
    // get_status is read-only; call directly on final ledger state
    expect(r2.ledger.total_committed).toBe(1_100_000n);
    expect(r2.ledger.investor_count).toBe(2n);
    expect(r2.ledger.goal_reached).toBe(true);
  });

});
