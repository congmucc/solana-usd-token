import * as anchor from "@coral-xyz/anchor";
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { SolanaUsdToken } from "../target/types/solana_usd_token";
import { Keypair } from '@solana/web3.js';

describe('USDC Tokens', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;
  const program = anchor.workspace.SolanaUsdToken as anchor.Program<SolanaUsdToken>;

  const metadata = {
    name: 'USDC',
    symbol: 'USDC',
    uri: 'https://raw.githubusercontent.com/congmucc/solana-usd-token/main/public/usdc-token.json',
  };
  // https://raw.githubusercontent.com/congmucc/solana-usd-token/main/public/usdc-token.json

  // Generate new keypair to use as address for mint account.
  const [mintAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('usd-token'), payer.publicKey.toBytes(), Buffer.from(metadata.symbol)],
    program.programId,
  )

  console.log('mintAccount :>> ', mintAccount.toString());

  // Derive the associated token address account for the mint and payer.
  const senderTokenAddress = getAssociatedTokenAddressSync(mintAccount, payer.publicKey);

  it('Create an SPL Token!', async () => {
    const transactionSignature = await program.methods
      .createToken(metadata.symbol, metadata.name, metadata.uri)
      .accounts({
        payer: payer.publicKey,
      })
      .rpc();

    console.log('Success!');
    console.log(`   Mint Address: ${mintAccount}`);
    console.log(`   Transaction Signature: ${transactionSignature}`);
  });

  it('Mint tokens!', async () => {
    // Amount of tokens to mint.
    const amount = new anchor.BN(100_000_000_000);

    // Mint the tokens to the associated token account.
    const transactionSignature = await program.methods
      .mintToken(amount)
      .accounts({
        mintAuthority: payer.publicKey,
        recipient: payer.publicKey,
        mintAccount: mintAccount,
        associatedTokenAccount: senderTokenAddress,
      })
      .rpc();

    console.log('Success!');
    console.log(`   Associated Token Account Address: ${senderTokenAddress}`);
    console.log(`   Transaction Signature: ${transactionSignature}`);
  });
});
