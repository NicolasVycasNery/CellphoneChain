# CellPhoneChain

CellPhoneChain is a DApp demo project that uses Ethereum smart contracts to manage a list of cell phones.

## Project Structure

The project is divided into two main parts:

1. `backend/`: This directory contains the Solidity smart contracts and the Hardhat configuration for deploying the contracts to the Ethereum network.

2. `frontend/`: This directory contains a React application that interacts with the deployed contracts.

## Getting Started

### Prerequisites

- Node.js
- Yarn (or npm)
- Hardhat
- An Ethereum wallet like MetaMask

### Installation

1. Clone the repository:

```sh
git clone https://github.com/NicolasVycasNery/CellphoneChain.git
```

2. Install the dependencies:

```sh
cd frontend && npm install

cd backend && npm install
```

### Running the project locally

1. Start the Hardhat node:

```sh
cd backend && npm run local
```

2. Deploy the contracts to the local network:

```sh
cd backend && npm run deploy
```

3. Start the frontend:

```sh
cd frontend && npm run dev
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
