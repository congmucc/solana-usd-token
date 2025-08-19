use anchor_lang::prelude::*;

declare_id!("9Xyk3G6kk35K1BnjVZr3NP7Lk844MYgNgn4nYVQBauNL");

#[program]
pub mod solana_usd_token {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
