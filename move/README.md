SUIME — Move package

This folder contains a minimal Sui Move package skeleton to start writing Move modules.

Files:

- Move.toml — package manifest (named address `Suime` mapped to `0x1`).
- sources/Math.move — example Move module with simple functions.

Build & test (local, requires Sui toolchain):

# Compile

sui move build

# Run Move unit tests (if added)

sui move test

Notes:

- Update addresses in `Move.toml` to match your deployment addresses.
- Convert example functions into resources, entry functions, and tests as needed.
