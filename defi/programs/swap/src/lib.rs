use anchor_lang::prelude::*;

declare_id!("CMtt58BcsLJvA8J8bEf7k2UygNc9i5ucrHugE2jNuThZ");

#[program]
pub mod swap {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
