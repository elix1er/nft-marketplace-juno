use cosmwasm_schema::write_api;

use marketplace::auction::{Cw721HookMsg, ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg};

// use cw2981_royalties::{QueryMsg};

fn main() {
    write_api! {
        instantiate: InstantiateMsg,
        execute: ExecuteMsg,
        query: QueryMsg,
        migrate: MigrateMsg,
    }
}
