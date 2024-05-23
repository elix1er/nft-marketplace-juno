/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.9.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { InstantiateMsg, ExecuteMsg, Uint128, Binary, Expiration, Timestamp, Uint64, TokenAmount, Cw1155MintMsgForNullable_Metadata, Metadata, Trait, QueryMsg, Empty, Addr, AllBalancesResponse, Balance, TokenInfoResponseForEmpty, TokensResponse, ApprovedForAllResponse, Approval, BalanceResponse, BatchBalanceResponse, ContractInfoResponse, Null, IsApprovedForAllResponse, MinterResponse, NumTokensResponse, OwnershipForString, ArrayOfTokenApproval, TokenApproval } from "./Cw1155x.types";
export interface Cw1155xReadOnlyInterface {
  contractAddress: string;
  balanceOf: ({
    owner,
    tokenId
  }: {
    owner: string;
    tokenId: string;
  }) => Promise<BalanceResponse>;
  balanceOfBatch: ({
    owner,
    tokenIds
  }: {
    owner: string;
    tokenIds: string[];
  }) => Promise<BatchBalanceResponse>;
  isApprovedForAll: ({
    operator,
    owner
  }: {
    operator: string;
    owner: string;
  }) => Promise<IsApprovedForAllResponse>;
  tokenApprovals: ({
    includeExpired,
    owner,
    tokenId
  }: {
    includeExpired?: boolean;
    owner: string;
    tokenId: string;
  }) => Promise<ArrayOfTokenApproval>;
  approvalsForAll: ({
    includeExpired,
    limit,
    owner,
    startAfter
  }: {
    includeExpired?: boolean;
    limit?: number;
    owner: string;
    startAfter?: string;
  }) => Promise<ApprovedForAllResponse>;
  allBalances: ({
    limit,
    startAfter,
    tokenId
  }: {
    limit?: number;
    startAfter?: string;
    tokenId: string;
  }) => Promise<AllBalancesResponse>;
  supply: () => Promise<NumTokensResponse>;
  numTokens: ({
    tokenId
  }: {
    tokenId: string;
  }) => Promise<NumTokensResponse>;
  contractInfo: () => Promise<ContractInfoResponse>;
  minter: () => Promise<MinterResponse>;
  tokenInfo: ({
    tokenId
  }: {
    tokenId: string;
  }) => Promise<TokenInfoResponseForEmpty>;
  allTokenInfo: ({
    limit,
    startAfter
  }: {
    limit?: number;
    startAfter?: string;
  }) => Promise<TokenInfoResponseForEmpty>;
  tokens: ({
    limit,
    owner,
    startAfter
  }: {
    limit?: number;
    owner: string;
    startAfter?: string;
  }) => Promise<TokensResponse>;
  allTokens: ({
    limit,
    startAfter
  }: {
    limit?: number;
    startAfter?: string;
  }) => Promise<TokensResponse>;
  extension: ({
    msg
  }: {
    msg: Empty;
  }) => Promise<Null>;
  ownership: () => Promise<OwnershipForString>;
}
export class Cw1155xQueryClient implements Cw1155xReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;
  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.balanceOf = this.balanceOf.bind(this);
    this.balanceOfBatch = this.balanceOfBatch.bind(this);
    this.isApprovedForAll = this.isApprovedForAll.bind(this);
    this.tokenApprovals = this.tokenApprovals.bind(this);
    this.approvalsForAll = this.approvalsForAll.bind(this);
    this.allBalances = this.allBalances.bind(this);
    this.supply = this.supply.bind(this);
    this.numTokens = this.numTokens.bind(this);
    this.contractInfo = this.contractInfo.bind(this);
    this.minter = this.minter.bind(this);
    this.tokenInfo = this.tokenInfo.bind(this);
    this.allTokenInfo = this.allTokenInfo.bind(this);
    this.tokens = this.tokens.bind(this);
    this.allTokens = this.allTokens.bind(this);
    this.extension = this.extension.bind(this);
    this.ownership = this.ownership.bind(this);
  }
  balanceOf = async ({
    owner,
    tokenId
  }: {
    owner: string;
    tokenId: string;
  }): Promise<BalanceResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      balance_of: {
        owner,
        token_id: tokenId
      }
    });
  };
  balanceOfBatch = async ({
    owner,
    tokenIds
  }: {
    owner: string;
    tokenIds: string[];
  }): Promise<BatchBalanceResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      balance_of_batch: {
        owner,
        token_ids: tokenIds
      }
    });
  };
  isApprovedForAll = async ({
    operator,
    owner
  }: {
    operator: string;
    owner: string;
  }): Promise<IsApprovedForAllResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      is_approved_for_all: {
        operator,
        owner
      }
    });
  };
  tokenApprovals = async ({
    includeExpired,
    owner,
    tokenId
  }: {
    includeExpired?: boolean;
    owner: string;
    tokenId: string;
  }): Promise<ArrayOfTokenApproval> => {
    return this.client.queryContractSmart(this.contractAddress, {
      token_approvals: {
        include_expired: includeExpired,
        owner,
        token_id: tokenId
      }
    });
  };
  approvalsForAll = async ({
    includeExpired,
    limit,
    owner,
    startAfter
  }: {
    includeExpired?: boolean;
    limit?: number;
    owner: string;
    startAfter?: string;
  }): Promise<ApprovedForAllResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      approvals_for_all: {
        include_expired: includeExpired,
        limit,
        owner,
        start_after: startAfter
      }
    });
  };
  allBalances = async ({
    limit,
    startAfter,
    tokenId
  }: {
    limit?: number;
    startAfter?: string;
    tokenId: string;
  }): Promise<AllBalancesResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      all_balances: {
        limit,
        start_after: startAfter,
        token_id: tokenId
      }
    });
  };
  supply = async (): Promise<NumTokensResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      supply: {}
    });
  };
  numTokens = async ({
    tokenId
  }: {
    tokenId: string;
  }): Promise<NumTokensResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      num_tokens: {
        token_id: tokenId
      }
    });
  };
  contractInfo = async (): Promise<ContractInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      contract_info: {}
    });
  };
  minter = async (): Promise<MinterResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      minter: {}
    });
  };
  tokenInfo = async ({
    tokenId
  }: {
    tokenId: string;
  }): Promise<TokenInfoResponseForEmpty> => {
    return this.client.queryContractSmart(this.contractAddress, {
      token_info: {
        token_id: tokenId
      }
    });
  };
  allTokenInfo = async ({
    limit,
    startAfter
  }: {
    limit?: number;
    startAfter?: string;
  }): Promise<TokenInfoResponseForEmpty> => {
    return this.client.queryContractSmart(this.contractAddress, {
      all_token_info: {
        limit,
        start_after: startAfter
      }
    });
  };
  tokens = async ({
    limit,
    owner,
    startAfter
  }: {
    limit?: number;
    owner: string;
    startAfter?: string;
  }): Promise<TokensResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      tokens: {
        limit,
        owner,
        start_after: startAfter
      }
    });
  };
  allTokens = async ({
    limit,
    startAfter
  }: {
    limit?: number;
    startAfter?: string;
  }): Promise<TokensResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      all_tokens: {
        limit,
        start_after: startAfter
      }
    });
  };
  extension = async ({
    msg
  }: {
    msg: Empty;
  }): Promise<Null> => {
    return this.client.queryContractSmart(this.contractAddress, {
      extension: {
        msg
      }
    });
  };
  ownership = async (): Promise<OwnershipForString> => {
    return this.client.queryContractSmart(this.contractAddress, {
      ownership: {}
    });
  };
}
export interface Cw1155xInterface extends Cw1155xReadOnlyInterface {
  contractAddress: string;
  sender: string;
  sendBatch: ({
    batch,
    from,
    msg,
    to
  }: {
    batch: TokenAmount[];
    from?: string;
    msg?: Binary;
    to: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  mintBatch: ({
    msgs,
    recipient
  }: {
    msgs: Cw1155MintMsgForNullable_Metadata[];
    recipient: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  burnBatch: ({
    batch,
    from
  }: {
    batch: TokenAmount[];
    from?: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  approveAll: ({
    expires,
    operator
  }: {
    expires?: Expiration;
    operator: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  revokeAll: ({
    operator
  }: {
    operator: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  send: ({
    amount,
    from,
    msg,
    to,
    tokenId
  }: {
    amount: Uint128;
    from?: string;
    msg?: Binary;
    to: string;
    tokenId: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  mint: ({
    msg,
    recipient
  }: {
    msg: Cw1155MintMsgForNullable_Metadata;
    recipient: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  burn: ({
    amount,
    from,
    tokenId
  }: {
    amount: Uint128;
    from?: string;
    tokenId: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  approve: ({
    amount,
    expires,
    spender,
    tokenId
  }: {
    amount?: Uint128;
    expires?: Expiration;
    spender: string;
    tokenId: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  revoke: ({
    amount,
    spender,
    tokenId
  }: {
    amount?: Uint128;
    spender: string;
    tokenId: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class Cw1155xClient extends Cw1155xQueryClient implements Cw1155xInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;
  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.sendBatch = this.sendBatch.bind(this);
    this.mintBatch = this.mintBatch.bind(this);
    this.burnBatch = this.burnBatch.bind(this);
    this.approveAll = this.approveAll.bind(this);
    this.revokeAll = this.revokeAll.bind(this);
    this.send = this.send.bind(this);
    this.mint = this.mint.bind(this);
    this.burn = this.burn.bind(this);
    this.approve = this.approve.bind(this);
    this.revoke = this.revoke.bind(this);
  }
  sendBatch = async ({
    batch,
    from,
    msg,
    to
  }: {
    batch: TokenAmount[];
    from?: string;
    msg?: Binary;
    to: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      send_batch: {
        batch,
        from,
        msg,
        to
      }
    }, fee, memo, _funds);
  };
  mintBatch = async ({
    msgs,
    recipient
  }: {
    msgs: Cw1155MintMsgForNullable_Metadata[];
    recipient: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      mint_batch: {
        msgs,
        recipient
      }
    }, fee, memo, _funds);
  };
  burnBatch = async ({
    batch,
    from
  }: {
    batch: TokenAmount[];
    from?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      burn_batch: {
        batch,
        from
      }
    }, fee, memo, _funds);
  };
  approveAll = async ({
    expires,
    operator
  }: {
    expires?: Expiration;
    operator: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      approve_all: {
        expires,
        operator
      }
    }, fee, memo, _funds);
  };
  revokeAll = async ({
    operator
  }: {
    operator: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      revoke_all: {
        operator
      }
    }, fee, memo, _funds);
  };
  send = async ({
    amount,
    from,
    msg,
    to,
    tokenId
  }: {
    amount: Uint128;
    from?: string;
    msg?: Binary;
    to: string;
    tokenId: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      send: {
        amount,
        from,
        msg,
        to,
        token_id: tokenId
      }
    }, fee, memo, _funds);
  };
  mint = async ({
    msg,
    recipient
  }: {
    msg: Cw1155MintMsgForNullable_Metadata;
    recipient: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      mint: {
        msg,
        recipient
      }
    }, fee, memo, _funds);
  };
  burn = async ({
    amount,
    from,
    tokenId
  }: {
    amount: Uint128;
    from?: string;
    tokenId: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      burn: {
        amount,
        from,
        token_id: tokenId
      }
    }, fee, memo, _funds);
  };
  approve = async ({
    amount,
    expires,
    spender,
    tokenId
  }: {
    amount?: Uint128;
    expires?: Expiration;
    spender: string;
    tokenId: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      approve: {
        amount,
        expires,
        spender,
        token_id: tokenId
      }
    }, fee, memo, _funds);
  };
  revoke = async ({
    amount,
    spender,
    tokenId
  }: {
    amount?: Uint128;
    spender: string;
    tokenId: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      revoke: {
        amount,
        spender,
        token_id: tokenId
      }
    }, fee, memo, _funds);
  };
}