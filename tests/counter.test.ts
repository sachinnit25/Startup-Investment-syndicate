import { describe, it, expect } from 'vitest';
import { Contract, ledger } from '../managed/counter/contract/index.js';
import * as rt from '@midnight-ntwrk/compact-runtime';

// ---------------------------------------------------------------------------
// Helper: create a contract instance with an initialized fundraising goal
// ---------------------------------------------------------------------------
function setupContract(goal: bigint) {
  const contract = new Contract({});
  const constructorCtx = {
    initialZswapLocalState: { coinPublicKey: new Uint8Array(32) },
    initialPrivateState: {}
  };
  const initRes = contract.initialState(constructorCtx);
  const circuitCtx = rt.createCircuitContext(
    rt.dummyContractAddress(),
    new Uint8Array(32),
    initRes.currentContractState.data,
    {}
  );
  const initCircuitRes = contract.circuits.initialize(circuitCtx, goal);
  return { contract, context: initCircuitRes.context };
}

// 32-byte secret witness identifying the investor privately
const MOCK_INVESTOR_SECRET_1 = new Uint8Array(32).fill(1);
const MOCK_INVESTOR_SECRET_2 = new Uint8Array(32).fill(2);

describe('Startup Investment Syndicate — counter.compact', () => {

  // ── a) Circuit Logic: computes goal_reached correctly ─────────────────────
  it('circuit logic: returns false when total committed is strictly below the goal', () => {
    const { contract, context } = setupContract(1_000_000n); // Goal: 1,000,000 tNight

    // Commit 400,000 (below 1,000,000 goal)
    const commitRes = contract.circuits.commit_investment(context, MOCK_INVESTOR_SECRET_1, 400_000n);
    const currentLedger = ledger(commitRes.context.currentQueryContext.state);

    // Circuit return value should be false (goal not reached)
    expect(commitRes.result).toBe(false);
    expect(currentLedger.goal_reached).toBe(false);
  });

  // ── b) State Transitions: ledger state updates as expected ────────────────
  it('state transitions: accumulates total committed and increments investor count correctly', () => {
    const { contract, context } = setupContract(1_000_000n);

    // First investor commits 600,000
    const res1 = contract.circuits.commit_investment(context, MOCK_INVESTOR_SECRET_1, 600_000n);
    const ledger1 = ledger(res1.context.currentQueryContext.state);
    expect(ledger1.total_committed).toBe(600_000n);
    expect(ledger1.investor_count).toBe(1n);
    expect(ledger1.goal_reached).toBe(false);

    // Second investor commits 500,000 (total = 1,100,000 >= 1,000,000 goal)
    const res2 = contract.circuits.commit_investment(res1.context, MOCK_INVESTOR_SECRET_2, 500_000n);
    const ledger2 = ledger(res2.context.currentQueryContext.state);
    expect(ledger2.total_committed).toBe(1_100_000n);
    expect(ledger2.investor_count).toBe(2n);
    expect(ledger2.goal_reached).toBe(true);
    expect(res2.result).toBe(true);
  });

  // ── c) Privacy: private witness input is never exposed on-chain ───────────
  it('privacy: investor secret and exact contribution are never stored in public ledger state', () => {
    const { contract, context } = setupContract(500_000n);

    const secretKey = new Uint8Array(32).fill(0xaa);
    const privateAmount = 250_000n;

    const commitRes = contract.circuits.commit_investment(context, secretKey, privateAmount);
    const publicLedger = ledger(commitRes.context.currentQueryContext.state);

    // Verify public ledger schema: only aggregate totals exist
    const ledgerKeys = Object.keys(publicLedger);
    expect(ledgerKeys).toContain('total_committed');
    expect(ledgerKeys).toContain('investor_count');
    expect(ledgerKeys).toContain('goal_amount');
    expect(ledgerKeys).toContain('goal_reached');

    // Private inputs MUST NEVER exist in public ledger keys
    expect(ledgerKeys).not.toContain('investor_secret');
    expect(ledgerKeys).not.toContain('investment_amount');

    // Proof output only discloses the goal status boolean
    expect(typeof commitRes.result).toBe('boolean');
  });

  // ── d) Read-only get_status circuit ───────────────────────────────────────
  it('read circuit: get_status reads public ledger state without mutating ledger', () => {
    const { contract, context } = setupContract(750_000n);

    // Commit an investment of 300,000
    const commitRes = contract.circuits.commit_investment(context, MOCK_INVESTOR_SECRET_1, 300_000n);
    const ledgerBefore = ledger(commitRes.context.currentQueryContext.state);

    // Call read-only get_status circuit
    const statusRes = contract.circuits.get_status(commitRes.context);
    const ledgerAfter = ledger(statusRes.context.currentQueryContext.state);

    expect(ledgerAfter.total_committed).toBe(ledgerBefore.total_committed);
    expect(ledgerAfter.investor_count).toBe(ledgerBefore.investor_count);
    expect(ledgerAfter.goal_reached).toBe(ledgerBefore.goal_reached);
  });

});
