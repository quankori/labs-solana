import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Swap } from "../target/types/swap";
import { Calculator } from "../target/types/calculator";
import assert from "assert";
const { SystemProgram } = anchor.web3;

describe("calculator", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Calculator as Program<Calculator>;

  it("Create a calculator", async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.greeting === "Welcome to Solana");
  });

  it("calculate 2 numbers", async () => {
    await program.rpc.add(new anchor.BN(2), new anchor.BN(1), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(3)));
  });
});
