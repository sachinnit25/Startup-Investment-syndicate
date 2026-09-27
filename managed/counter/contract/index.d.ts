import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  initialize(context: __compactRuntime.CircuitContext<PS>, goal_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  commit_investment(context: __compactRuntime.CircuitContext<PS>,
                    investor_secret_0: Uint8Array,
                    investment_amount_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  get_status(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  initialize(context: __compactRuntime.CircuitContext<PS>, goal_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  commit_investment(context: __compactRuntime.CircuitContext<PS>,
                    investor_secret_0: Uint8Array,
                    investment_amount_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  get_status(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  initialize(context: __compactRuntime.CircuitContext<PS>, goal_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  commit_investment(context: __compactRuntime.CircuitContext<PS>,
                    investor_secret_0: Uint8Array,
                    investment_amount_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  get_status(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly total_committed: bigint;
  readonly investor_count: bigint;
  readonly goal_amount: bigint;
  readonly goal_reached: boolean;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
