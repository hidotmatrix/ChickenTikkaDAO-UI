## RaspberryDAO-UI

RaspberryDAO-UI Project is a frontend of RaspberryDAO ecosystem which is used for the community based management of NFTs and assets locked in the treasury when user tries to swap from Ethereum to Godowoken NFTs [RaspberryDAO-User-UI](https://github.com/hidotmatrix/RaspberryDAO-User-UI). This project act as manager of locked NFTs into the bridge smart contracts.

## RaspberryDAO

RaspberryDAO is an ERC20 based governance mechanism.

DAOs are an effective and safe way to work with like-minded folks around the globe.

Think of them like an internet-native business that's collectively owned and managed by its members. They have built-in treasuries that no one has the authority to access without the approval of the group. Decisions are governed by proposals and voting to ensure everyone in the organization has a voice. [Read More About DAOs](https://ethereum.org/en/dao/)

---

### Clone repository

```bash
git clone https://github.com/hidotmatrix/RaspberryDAO-UI.git
```

---

### Installation

```bash
cd RaspberryDAO-UI
npm install
```

---

### Smart contract structure

This repository uses openzeppelin's modular system of governance

- [Governance](https://github.com/hidotmatrix/RaspberryDAO-UI/blob/main/contracts/Governance.sol): The core contract that contains all the logic and primitives
- [Timelock](https://github.com/hidotmatrix/RaspberryDAO-UI/blob/main/contracts/Timelock.sol): Allows multiple proposers and executors, in addition to the Governor itself.
- [Governance Token](https://github.com/hidotmatrix/RaspberryDAO-UI/blob/main/contracts/Token.sol): Extension of ERC20 to support Compound-like voting and delegation
- [Treasury](https://github.com/hidotmatrix/RaspberryDAO-UI/blob/main/contracts/Treasury.sol): Contract holding the funds inside it

---

### Smart contract Interaction

#### Compile smart contracts

```bash
npx hardhat compile
```

#### Test smart contracts

```bash
npx hardhat test
```

#### Smart contract Deployment

Create a .env file in the root directory and add the following variables

- `REACT_APP_ALCHEMY_RPC_URL = ""`
- `REACT_APP_DEPLOYER_PRIV_KEY = ""`
- `REACT_APP_TOKEN_CONTRACT = ""`
- `REACT_APP_TIMELOCK_CONTRACT = ""`
- `REACT_APP_GOVERNANCE_CONTRACT = ""`
- `REACT_APP_TREASURY_CONTRACT = ""`
- `REACT_APP_PARTICIPANT_1 = ""`
- `REACT_APP_PARTICIPANT_2 = ""`
- `REACT_APP_PARTICIPANT_3 = ""`
- `REACT_APP_PARTICIPANT_4 = ""`
- `REACT_APP_PARTICIPANT_5 = ""`

Supported networks for deployment

- `localhost`
- `ropsten`
- `rinkeby`
- `goerli`
- `polygon (mumbai testnet)`
- `bsc testnet`

##### Deploying GTP Token Smart Contract

```bash
npx hardhat run --network localhost scripts/deploy-governance.js
```

#### Smart contract verification

Add the following to your .env file

> `ETHERSCAN_API_KEY = ""`

```bash
npx hardhat verify --network polygon DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
```

---

### Frontend Interaction

```bash
npm start
```

#### Wallet support

Used rainbowkit for the wallet Interaction. [rainbowkit docs](https://www.rainbowkit.com/docs/introduction)
