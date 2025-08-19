import * as anchor from "@coral-xyz/anchor";
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { SolanaUsdToken } from "../target/types/solana_usd_token";
import { Keypair } from '@solana/web3.js';

describe('Usdt Tokens', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;
  const program = anchor.workspace.SolanaUsdToken as anchor.Program<SolanaUsdToken>;

  const metadata = {
    name: 'Solana Usdt',
    symbol: 'USDT',
    uri: 'https://raw.githubusercontent.com/congmucc/solana-usd-token/main/public/spl-token.json',
  };

  // Generate new keypair to use as address for mint account.
  const [mintAccount, mintBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('usd-token'), payer.publicKey.toBytes(), Buffer.from(metadata.symbol)],
    program.programId,
  )


  console.log('mintAccount :>> ', mintAccount.toString());
  // Generate new keypair to use as address for recipient wallet.
  const recipient = new Keypair();

  // Derive the associated token address account for the mint and payer.
  const senderTokenAddress = getAssociatedTokenAddressSync(mintAccount, payer.publicKey);

  // Derive the associated token address account for the mint and recipient.
  const recepientTokenAddress = getAssociatedTokenAddressSync(mintAccount, recipient.publicKey);

  it('Create an SPL Token!', async () => {
    const transactionSignature = await program.methods
      .createToken(metadata.symbol, metadata.name, metadata.uri)
      .accounts({
        payer: payer.publicKey,
        mintAccount: mintAccount,
      })
      .rpc();

    console.log('Success!');
    console.log(`   Mint Address: ${mintAccount}`);
    console.log(`   Transaction Signature: ${transactionSignature}`);
  });

  it('Mint tokens!', async () => {
    // Amount of tokens to mint.
    const amount = new anchor.BN(100);

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

  it('Transfer tokens!', async () => {
    // Amount of tokens to transfer.
    const amount = new anchor.BN(50);

    const transactionSignature = await program.methods
      .transferTokens(amount)
      .accounts({
        sender: payer.publicKey,
        recipient: recipient.publicKey,
        mintAccount: mintAccount,
        senderTokenAccount: senderTokenAddress,
        recipientTokenAccount: recepientTokenAddress,
      })
      .rpc();

    console.log('Success!');
    console.log(`   Transaction Signature: ${transactionSignature}`);
  });
});
