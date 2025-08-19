# Solana USD Token Makefile
# This Makefile provides convenient commands for creating and minting USDT and USDC tokens

.PHONY: help build deploy test-usdt test-usdc create-usdt create-usdc mint-usdt mint-usdc clean

# Default target
help:
	@echo "Available commands:"
	@echo "  build        - Build the Anchor program"
	@echo "  deploy       - Deploy the program to devnet"
	@echo "  test-usdt    - Run USDT token tests (create + mint)"
	@echo "  test-usdc    - Run USDC token tests (create + mint)"
	@echo "  create-usdt  - Create USDT token only"
	@echo "  create-usdc  - Create USDC token only"
	@echo "  mint-usdt    - Mint USDT tokens only"
	@echo "  mint-usdc    - Mint USDC tokens only"
	@echo "  clean        - Clean build artifacts"

# Build the program
build:
	@echo "Building Anchor program..."
	anchor build

# Deploy to devnet
deploy:
	@echo "Deploying to devnet..."
	anchor deploy

# Test USDT (create + mint)
test-usdt:
	@echo "Running USDT token tests..."
	ANCHOR_PROVIDER_URL=https://api.devnet.solana.com ANCHOR_WALLET=~/.config/solana/id.json yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/solana-usdt-token.ts

# Test USDC (create + mint)
test-usdc:
	@echo "Running USDC token tests..."
	ANCHOR_PROVIDER_URL=https://api.devnet.solana.com ANCHOR_WALLET=~/.config/solana/id.json yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/solana-usdc-token.ts

# Create USDT token only
create-usdt:
	@echo "Creating USDT token..."
	ANCHOR_PROVIDER_URL=https://api.devnet.solana.com ANCHOR_WALLET=~/.config/solana/id.json yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/solana-usdt-token.ts --grep "Create an SPL Token"

# Create USDC token only
create-usdc:
	@echo "Creating USDC token..."
	ANCHOR_PROVIDER_URL=https://api.devnet.solana.com ANCHOR_WALLET=~/.config/solana/id.json yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/solana-usdc-token.ts --grep "Create an SPL Token"

# Mint USDT tokens only
mint-usdt:
	@echo "Minting USDT tokens..."
	ANCHOR_PROVIDER_URL=https://api.devnet.solana.com ANCHOR_WALLET=~/.config/solana/id.json yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/solana-usdt-token.ts --grep "Mint tokens"

# Mint USDC tokens only
mint-usdc:
	@echo "Minting USDC tokens..."
	ANCHOR_PROVIDER_URL=https://api.devnet.solana.com ANCHOR_WALLET=~/.config/solana/id.json yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/solana-usdc-token.ts --grep "Mint tokens"

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	anchor clean
	rm -rf target/
	rm -rf .anchor/

# Quick setup (build + deploy)
setup: build deploy
	@echo "Setup complete!"
