#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

pub mod instructions;

use instructions::*;
declare_id!("9Xyk3G6kk35K1BnjVZr3NP7Lk844MYgNgn4nYVQBauNL");

#[program]
pub mod solana_usd_token {
    use super::*;

    pub fn create_token(
        ctx: Context<CreateToken>,
        token_symbol: String,
        token_name: String,
        token_uri: String,
    ) -> Result<()> {
        create::create_token(ctx, token_symbol, token_name, token_uri)
    }

    pub fn mint_token(ctx: Context<MintToken>, amount: u64) -> Result<()> {
        mint::mint_token(ctx, amount)
    }

    pub fn transfer_tokens(ctx: Context<TransferTokens>, amount: u64) -> Result<()> {
        transfer::transfer_tokens(ctx, amount)
    }
}
