/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.9.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export interface InstantiateMsg {
  minter?: string | null;
  name: string;
  symbol: string;
}
export type ExecuteMsg = {
  send_batch: {
    batch: TokenAmount[];
    from?: string | null;
    msg?: Binary | null;
    to: string;
  };
} | {
  mint_batch: {
    msgs: Cw1155MintMsgForNullable_Metadata[];
    recipient: string;
  };
} | {
  burn_batch: {
    batch: TokenAmount[];
    from?: string | null;
  };
} | {
  approve_all: {
    expires?: Expiration | null;
    operator: string;
  };
} | {
  revoke_all: {
    operator: string;
  };
} | {
  send: {
    amount: Uint128;
    from?: string | null;
    msg?: Binary | null;
    to: string;
    token_id: string;
  };
} | {
  mint: {
    msg: Cw1155MintMsgForNullable_Metadata;
    recipient: string;
  };
} | {
  burn: {
    amount: Uint128;
    from?: string | null;
    token_id: string;
  };
} | {
  approve: {
    amount?: Uint128 | null;
    expires?: Expiration | null;
    spender: string;
    token_id: string;
  };
} | {
  revoke: {
    amount?: Uint128 | null;
    spender: string;
    token_id: string;
  };
};
export type Uint128 = string;
export type Binary = string;
export type Expiration = {
  at_height: number;
} | {
  at_time: Timestamp;
} | {
  never: {};
};
export type Timestamp = Uint64;
export type Uint64 = string;
export interface TokenAmount {
  amount: Uint128;
  token_id: string;
}
export interface Cw1155MintMsgForNullable_Metadata {
  amount: Uint128;
  extension?: Metadata | null;
  token_id: string;
  token_uri?: string | null;
}
export interface Metadata {
  animation_url?: string | null;
  attributes?: Trait[] | null;
  background_color?: string | null;
  description?: string | null;
  external_url?: string | null;
  image?: string | null;
  image_data?: string | null;
  name?: string | null;
  youtube_url?: string | null;
}
export interface Trait {
  display_type?: string | null;
  trait_type: string;
  value: string;
}
export type QueryMsg = {
  balance_of: {
    owner: string;
    token_id: string;
  };
} | {
  balance_of_batch: {
    owner: string;
    token_ids: string[];
  };
} | {
  is_approved_for_all: {
    operator: string;
    owner: string;
  };
} | {
  token_approvals: {
    include_expired?: boolean | null;
    owner: string;
    token_id: string;
  };
} | {
  approvals_for_all: {
    include_expired?: boolean | null;
    limit?: number | null;
    owner: string;
    start_after?: string | null;
  };
} | {
  all_balances: {
    limit?: number | null;
    start_after?: string | null;
    token_id: string;
  };
} | {
  supply: {};
} | {
  num_tokens: {
    token_id: string;
  };
} | {
  contract_info: {};
} | {
  minter: {};
} | {
  token_info: {
    token_id: string;
  };
} | {
  all_token_info: {
    limit?: number | null;
    start_after?: string | null;
  };
} | {
  tokens: {
    limit?: number | null;
    owner: string;
    start_after?: string | null;
  };
} | {
  all_tokens: {
    limit?: number | null;
    start_after?: string | null;
  };
} | {
  extension: {
    msg: Empty;
  };
} | {
  ownership: {};
};
export interface Empty {
  [k: string]: unknown;
}
export type Addr = string;
export interface AllBalancesResponse {
  balances: Balance[];
}
export interface Balance {
  amount: Uint128;
  owner: Addr;
  token_id: string;
}
export interface TokenInfoResponseForEmpty {
  extension: Empty;
  token_uri?: string | null;
}
export interface TokensResponse {
  tokens: string[];
}
export interface ApprovedForAllResponse {
  operators: Approval[];
}
export interface Approval {
  expires: Expiration;
  spender: string;
}
export interface BalanceResponse {
  balance: Uint128;
}
export interface BatchBalanceResponse {
  balances: Uint128[];
}
export interface ContractInfoResponse {
  name: string;
  symbol: string;
}
export type Null = null;
export interface IsApprovedForAllResponse {
  approved: boolean;
}
export interface MinterResponse {
  minter?: string | null;
}
export interface NumTokensResponse {
  count: number;
}
export interface OwnershipForString {
  owner?: string | null;
  pending_expiry?: Expiration | null;
  pending_owner?: string | null;
}
export type ArrayOfTokenApproval = TokenApproval[];
export interface TokenApproval {
  amount: Uint128;
  expiration: Expiration;
}