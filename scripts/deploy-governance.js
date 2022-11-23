const { Wallet } = require("ethers");
require("ethers");
require("dotenv").config();

const signer = new Wallet(process.env.REACT_APP_DEPLOYER_PRIV_KEY);
const signerAddress = signer.address;
const participant_1 = process.env.REACT_APP_PARTICIPANT_1;
const participant_2 = process.env.REACT_APP_PARTICIPANT_2;
const participant_3 = process.env.REACT_APP_PARTICIPANT_3;
const participant_4 = process.env.REACT_APP_PARTICIPANT_4;
const participant_5 = process.env.REACT_APP_PARTICIPANT_5;

async function main() {
  // deploy token contract
  const Token = await ethers.getContractFactory("Token");

  // constructor args for token contract
  const tokenName = "Governance Token";
  const tokenSymbol = "GVNT";
  const initialSupply = ethers.utils.parseEther("100000");
  const token = await Token.deploy(tokenName, tokenSymbol, initialSupply);

  console.log("Deploying token contract...");
  await token.deployed();
  console.log("Token contract address:", token.address);

  // transfer some initial tokens to participants
  // this can be managed using a exchange to provide utility token
  const amountToTransferInParticipantWallet = ethers.utils.parseEther("1500");
  const transfer_1 = await token.transfer(
    participant_1,
    amountToTransferInParticipantWallet
  );
  await transfer_1.wait();
  const transfer_2 = await token.transfer(
    participant_2,
    amountToTransferInParticipantWallet
  );
  await transfer_2.wait();
  const transfer_3 = await token.transfer(
    participant_3,
    amountToTransferInParticipantWallet
  );
  await transfer_3.wait();
  const transfer_4 = await token.transfer(
    participant_4,
    amountToTransferInParticipantWallet
  );
  await transfer_4.wait();
  const transfer_5 = await token.transfer(
    participant_5,
    amountToTransferInParticipantWallet
  );
  await transfer_5.wait();

  // deploying timelock contract
  const minDelay = 2; // How long do we have to wait until we can execute after a passed proposal (in block numbers)
  const Timelock = await ethers.getContractFactory("TimeLock");
  const timelock = await Timelock.deploy(
    minDelay,
    [signerAddress],
    [signerAddress],
  );

  console.log("Deploying Timelock contract...");
  await timelock.deployed();
  console.log("Timelock contract address", timelock.address);

  // deploy governance contract
  const quorum = 5; // Percentage of total supply of tokens needed to aprove proposals (5%)
  const votingDelay = 1; // How many blocks after proposal until voting becomes active
  const votingPeriod = 25; // How many blocks to allow voters to vote

  const Governance = await ethers.getContractFactory("Governance");
  const governance = await Governance.deploy(
    token.address,
    timelock.address,
    quorum,
    votingDelay,
    votingPeriod
  );

  console.log("Deploying governance contract...");
  await governance.deployed();
  console.log("Governance contract address:", governance.address);

  // deploy treasury contract
  const funds = ethers.utils.parseEther("0.0001");
  console.log("funds", funds);

  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy(signerAddress, { value: funds });

  console.log("Deploying treasury contract...");
  await treasury.deployed();
  console.log("Treasury contract address:", treasury.address);

  // transfer treasury ownership to executor
  let treasuryOwnership = await treasury.transferOwnership(timelock.address);
  await treasuryOwnership.wait();

  // Assign roles
  const proposerRole = await timelock.PROPOSER_ROLE();
  const executorRole = await timelock.EXECUTOR_ROLE();

  console.log(`
    proposer role: ${proposerRole}
    executor role: ${executorRole}
  `);

  let grantProposerRole = await timelock.grantRole(proposerRole, governance.address);
  grantProposerRole.wait();
  console.log("grant proposer role", grantProposerRole);

  let grantExecutorRole = await timelock.grantRole(executorRole, governance.address);
  grantExecutorRole.wait();
  console.log("grant executor role", grantExecutorRole);

}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
