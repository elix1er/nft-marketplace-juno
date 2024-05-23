/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.9.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export type Decimal = string;
export type Uint128 = string;
export interface InstantiateMsg {
  accepted_denom: string[];
  collector_address: string;
  duration: number;
  extension_duration: number;
  max_royalty_fee: Decimal;
  min_increment: Decimal;
  min_reserve_price: Uint128;
  protocol_fee: Decimal;
  [k: string]: unknown;
}
export type ExecuteMsg = {
  receive_nft: Cw721ReceiveMsg;
} | {
  cancel_auction: {
    auction_id: Uint128;
    [k: string]: unknown;
  };
} | {
  place_bid: {
    auction_id: Uint128;
    [k: string]: unknown;
  };
} | {
  settle: {
    auction_id: Uint128;
    [k: string]: unknown;
  };
} | {
  admin_change_config: {
    accepted_denom: string[];
    collector_address: string;
    duration: number;
    extension_duration: number;
    max_royalty_fee: Decimal;
    min_increment: Decimal;
    min_reserve_price: Uint128;
    protocol_fee: Decimal;
    [k: string]: unknown;
  };
} | {
  admin_cancel_auction: {
    auction_id: Uint128;
    [k: string]: unknown;
  };
} | {
  set_royalty_fee: {
    contract_addr: string;
    creator: string;
    royalty_fee: Decimal;
    [k: string]: unknown;
  };
} | {
  set_royalty_admin: {
    address: string;
    enable: boolean;
    [k: string]: unknown;
  };
} | {
  admin_pause: {
    [k: string]: unknown;
  };
} | {
  admin_resume: {
    [k: string]: unknown;
  };
} | {
  settle_hook: {
    nft_contract: string;
    owner: string;
    token_id: string;
    [k: string]: unknown;
  };
};
export type Binary = string;
export interface Cw721ReceiveMsg {
  msg: Binary;
  sender: string;
  token_id: string;
  [k: string]: unknown;
}