# Solana USD Token

A Solana program for creating and managing USD-pegged tokens (USDT and USDC) using the Anchor framework.

## Features

- Create SPL tokens with metadata
- Mint tokens to any wallet
- Transfer tokens between wallets
- Support for both USDT and USDC tokens
- 6 decimal precision (standard for USD tokens)

## Program ID

```
nyr3tiGvwr9pWZ8Aj7vuDWsrom6CoxAshr3MSqFZojr
```
> Program_Id

```
39n7pLeC6hj3NGSxuL6gkHKsthnwabz4AiqeTXxEpteg
```
> USDT

 
```
6qQsLebiBiPbE99rNm5V8Ej7AuHL93iXtqz8s7JjHcMS
```
> USDC


## Prerequisites

- [Rust](https://rustlang.org/tools/install)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor Framework](https://www.anchor-lang.com/docs/installation)
- [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/congmucc/solana-usd-token.git
cd solana-usd-token
```

2. Install dependencies:
```bash
yarn install
```

3. Build the program:
```bash
make build
```

4. Deploy to devnet:
```bash
make deploy
```

## Usage

This project includes a convenient Makefile for common operations:

### Available Commands

```bash
make help          # Show all available commands
make build         # Build the Anchor program
make deploy        # Deploy the program to devnet
make setup         # Build and deploy in one command
```

### Token Operations

#### USDT Operations
```bash
make test-usdt     # Create and mint USDT tokens
make create-usdt   # Create USDT token only
make mint-usdt     # Mint USDT tokens only
```

#### USDC Operations
```bash
make test-usdc     # Create and mint USDC tokens
make create-usdc   # Create USDC token only
make mint-usdc     # Mint USDC tokens only
```

### Cleanup
```bash
make clean         # Clean build artifacts
```

## Program Instructions

### 1. Create Token
Creates a new SPL token with metadata.

**Parameters:**
- `token_symbol`: Symbol for the token (e.g., "USDT", "USDC")
- `token_name`: Display name for the token
- `token_uri`: URI pointing to token metadata JSON

### 2. Mint Token
Mints tokens to a specified recipient.

**Parameters:**
- `amount`: Amount to mint (in base units, considering 6 decimals)

### 3. Transfer Tokens
Transfers tokens between wallets.

**Parameters:**
- `amount`: Amount to transfer (in base units, considering 6 decimals)

## Token Metadata

The program uses metadata stored at:
- USDT: `https://raw.githubusercontent.com/congmucc/solana-usd-token/main/public/usdt-token.json`
- USDC: `https://raw.githubusercontent.com/congmucc/solana-usd-token/main/public/usdc-token.json`

## Configuration

The program is configured for devnet deployment. To change networks, update the `cluster` setting in `Anchor.toml`:

```toml
[provider]
cluster = "devnet"  # or "localnet", "mainnet-beta"

# if localnet
[test]
startup_wait = 5000
shutdown_wait = 2000
upgradeable = false

[test.validator]
bind_address = "0.0.0.0"
url = "https://api.mainnet-beta.solana.com"
ledger = ".anchor/test-ledger"
rpc_port = 8899

[[test.validator.clone]]
address = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
```

## Testing

Run all tests:
```bash
anchor test --skip-local-validator
```

Run specific token tests:
```bash
make test-usdt  # Test USDT functionality
make test-usdc  # Test USDC functionality
```

## Error Handling

If you encounter errors during token creation:

1. **ConstraintSeeds Error**: The token with the same symbol already exists for your wallet
2. **AlreadyInitialized Error**: The metadata account already exists

**Solution**: The program automatically generates unique symbols using timestamps to avoid conflicts.

## Development

### Project Structure
```
├── programs/
│   └── solana-usd-token/
│       └── src/
│           ├── lib.rs              # Main program entry
│           └── instructions/
│               ├── create.rs       # Token creation logic
│               ├── mint.rs         # Token minting logic
│               └── transfer.rs     # Token transfer logic
├── tests/
│   ├── solana-usd-token.ts        # USDT tests
│   └── solana-usdc-token.ts       # USDC tests
├── Makefile                       # Build and deployment commands
└── README.md                      # This file
```

## Upgrade Program

To upgrade the deployed program:
```bash
anchor upgrade --program-id nyr3tiGvwr9pWZ8Aj7vuDWsrom6CoxAshr3MSqFZojr target/deploy/solana_usd_token.so
```

## Deploy History

```zsh
easondeMacBook-Pro:solana-usd-token eason$ anchor deploy
Deploying cluster: https://api.devnet.solana.com
Upgrade authority: /Users/eason/.config/solana/id.json
Deploying program "solana_usd_token"...
Program path: /Users/eason/Desktop/project/solana/token/solana-usd-token/target/deploy/solana_usd_token.so...
Program Id: nyr3tiGvwr9pWZ8Aj7vuDWsrom6CoxAshr3MSqFZojr

Signature: 3QUcsmcAooPrYdD5Em9mJVSwtDvDQs4vDhywqb4YvKKguBna67WHb3g7jEYmW5JXtj577cnGLmSVYY582P986YsS

Deploy success
```
