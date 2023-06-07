import type { AbiItem } from 'web3-utils'

/* eslint-disable */
export const yv2VaultAbi: AbiItem[] = [
  {
    "name": "Transfer",
    "inputs": [
      { "type": "address", "name": "sender", "indexed": true },
      { "type": "address", "name": "receiver", "indexed": true },
      { "type": "uint256", "name": "value", "indexed": false }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "Approval",
    "inputs": [
      { "type": "address", "name": "owner", "indexed": true },
      { "type": "address", "name": "spender", "indexed": true },
      { "type": "uint256", "name": "value", "indexed": false }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyAdded",
    "inputs": [
      { "type": "address", "name": "strategy", "indexed": true },
      { "type": "uint256", "name": "debtLimit", "indexed": false },
      { "type": "uint256", "name": "rateLimit", "indexed": false },
      { "type": "uint256", "name": "performanceFee", "indexed": false }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyReported",
    "inputs": [
      { "type": "address", "name": "strategy", "indexed": true },
      { "type": "uint256", "name": "gain", "indexed": false },
      { "type": "uint256", "name": "loss", "indexed": false },
      { "type": "uint256", "name": "totalGain", "indexed": false },
      { "type": "uint256", "name": "totalLoss", "indexed": false },
      { "type": "uint256", "name": "totalDebt", "indexed": false },
      { "type": "uint256", "name": "debtAdded", "indexed": false },
      { "type": "uint256", "name": "debtLimit", "indexed": false }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "outputs": [],
    "inputs": [
      { "type": "address", "name": "_token" },
      { "type": "address", "name": "_governance" },
      { "type": "address", "name": "_rewards" },
      { "type": "string", "name": "_nameOverride" },
      { "type": "string", "name": "_symbolOverride" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "name": "apiVersion",
    "outputs": [{ "type": "string", "name": "" }],
    "inputs": [],
    "stateMutability": "pure",
    "type": "function",
    "gas": 4489
  },
  {
    "name": "setName",
    "outputs": [],
    "inputs": [{ "type": "string", "name": "_name" }],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 106987
  },
  {
    "name": "setSymbol",
    "outputs": [],
    "inputs": [{ "type": "string", "name": "_symbol" }],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 71837
  },
  {
    "name": "setGovernance",
    "outputs": [],
    "inputs": [{ "type": "address", "name": "_governance" }],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 36308
  },
  {
    "name": "acceptGovernance",
    "outputs": [],
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 36234
  },
  {
    "name": "setGuestList",
    "outputs": [],
    "inputs": [{ "type": "address", "name": "_guestList" }],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 36368
  },
  {
    "name": "setRewards",
    "outputs": [],
    "inputs": [{ "type": "address", "name": "_rewards" }],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 36398
  },
  {
    "name": "setDepositLimit",
    "outputs": [],
    "inputs": [{ "type": "uint256", "name": "_limit" }],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 36328
  },
  {
    "name": "setPerformanceFee",
    "outputs": [],
    "inputs": [{ "type": "uint256", "name": "_fee" }],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 36358
  },
  {
    "name": "setManagementFee",
    "outputs": [],
    "inputs": [{ "type": "uint256", "name": "_fee" }],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 36388
  },
  {
    "name": "setGuardian",
    "outputs": [],
    "inputs": [{ "type": "address", "name": "_guardian" }],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 37745
  },
  {
    "name": "setEmergencyShutdown",
    "outputs": [],
    "inputs": [{ "type": "bool", "name": "_active" }],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 37775
  },
  {
    "name": "setWithdrawalQueue",
    "outputs": [],
    "inputs": [{ "type": "address[20]", "name": "_queue" }],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 750044
  },
  {
    "name": "transfer",
    "outputs": [{ "type": "bool", "name": "" }],
    "inputs": [
      { "type": "address", "name": "_to" },
      { "type": "uint256", "name": "_value" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 76619
  },
  {
    "name": "transferFrom",
    "outputs": [{ "type": "bool", "name": "" }],
    "inputs": [
      { "type": "address", "name": "_from" },
      { "type": "address", "name": "_to" },
      { "type": "uint256", "name": "_value" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 114054
  },
  {
    "name": "approve",
    "outputs": [{ "type": "bool", "name": "" }],
    "inputs": [
      { "type": "address", "name": "_spender" },
      { "type": "uint256", "name": "_value" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 38184
  },
  {
    "name": "increaseAllowance",
    "outputs": [{ "type": "bool", "name": "" }],
    "inputs": [
      { "type": "address", "name": "_spender" },
      { "type": "uint256", "name": "_value" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 40225
  },
  {
    "name": "decreaseAllowance",
    "outputs": [{ "type": "bool", "name": "" }],
    "inputs": [
      { "type": "address", "name": "_spender" },
      { "type": "uint256", "name": "_value" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 40249
  },
  {
    "name": "totalAssets",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3943
  },
  {
    "name": "balanceSheetOfStrategy",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [{ "type": "address", "name": "_strategy" }],
    "stateMutability": "view",
    "type": "function",
    "gas": 2448
  },
  {
    "name": "totalBalanceSheet",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [{ "type": "address[40]", "name": "_strategies" }],
    "stateMutability": "view",
    "type": "function",
    "gas": 75836
  },
  {
    "name": "deposit",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "deposit",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [{ "type": "uint256", "name": "_amount" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "deposit",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [
      { "type": "uint256", "name": "_amount" },
      { "type": "address", "name": "_recipient" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "maxAvailableShares",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 356611
  },
  {
    "name": "withdraw",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "withdraw",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [{ "type": "uint256", "name": "_shares" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "withdraw",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [
      { "type": "uint256", "name": "_shares" },
      { "type": "address", "name": "_recipient" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "pricePerShare",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 11391
  },
  {
    "name": "addStrategy",
    "outputs": [],
    "inputs": [
      { "type": "address", "name": "_strategy" },
      { "type": "uint256", "name": "_debtLimit" },
      { "type": "uint256", "name": "_rateLimit" },
      { "type": "uint256", "name": "_performanceFee" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 1445692
  },
  {
    "name": "updateStrategyDebtLimit",
    "outputs": [],
    "inputs": [
      { "type": "address", "name": "_strategy" },
      { "type": "uint256", "name": "_debtLimit" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 111466
  },
  {
    "name": "updateStrategyRateLimit",
    "outputs": [],
    "inputs": [
      { "type": "address", "name": "_strategy" },
      { "type": "uint256", "name": "_rateLimit" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 38518
  },
  {
    "name": "updateStrategyPerformanceFee",
    "outputs": [],
    "inputs": [
      { "type": "address", "name": "_strategy" },
      { "type": "uint256", "name": "_performanceFee" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 38542
  },
  {
    "name": "migrateStrategy",
    "outputs": [],
    "inputs": [
      { "type": "address", "name": "_oldVersion" },
      { "type": "address", "name": "_newVersion" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 1178388
  },
  {
    "name": "revokeStrategy",
    "outputs": [],
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "revokeStrategy",
    "outputs": [],
    "inputs": [{ "type": "address", "name": "_strategy" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "addStrategyToQueue",
    "outputs": [],
    "inputs": [{ "type": "address", "name": "_strategy" }],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 1195542
  },
  {
    "name": "removeStrategyFromQueue",
    "outputs": [],
    "inputs": [{ "type": "address", "name": "_strategy" }],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 23067618
  },
  {
    "name": "debtOutstanding",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "debtOutstanding",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [{ "type": "address", "name": "_strategy" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "creditAvailable",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "creditAvailable",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [{ "type": "address", "name": "_strategy" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "availableDepositLimit",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "expectedReturn",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "expectedReturn",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [{ "type": "address", "name": "_strategy" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "report",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [
      { "type": "uint256", "name": "_gain" },
      { "type": "uint256", "name": "_loss" },
      { "type": "uint256", "name": "_debtPayment" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 920813
  },
  {
    "name": "sweep",
    "outputs": [],
    "inputs": [{ "type": "address", "name": "_token" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "sweep",
    "outputs": [],
    "inputs": [
      { "type": "address", "name": "_token" },
      { "type": "uint256", "name": "_value" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "name",
    "outputs": [{ "type": "string", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 9023
  },
  {
    "name": "symbol",
    "outputs": [{ "type": "string", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 8076
  },
  {
    "name": "decimals",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 2681
  },
  {
    "name": "balanceOf",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [{ "type": "address", "name": "arg0" }],
    "stateMutability": "view",
    "type": "function",
    "gas": 2926
  },
  {
    "name": "allowance",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [
      { "type": "address", "name": "arg0" },
      { "type": "address", "name": "arg1" }
    ],
    "stateMutability": "view",
    "type": "function",
    "gas": 3171
  },
  {
    "name": "totalSupply",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 2771
  },
  {
    "name": "token",
    "outputs": [{ "type": "address", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 2801
  },
  {
    "name": "governance",
    "outputs": [{ "type": "address", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 2831
  },
  {
    "name": "guardian",
    "outputs": [{ "type": "address", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 2861
  },
  {
    "name": "guestList",
    "outputs": [{ "type": "address", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 2891
  },
  {
    "name": "strategies",
    "outputs": [
      { "type": "uint256", "name": "performanceFee" },
      { "type": "uint256", "name": "activation" },
      { "type": "uint256", "name": "debtLimit" },
      { "type": "uint256", "name": "rateLimit" },
      { "type": "uint256", "name": "lastReport" },
      { "type": "uint256", "name": "totalDebt" },
      { "type": "uint256", "name": "totalGain" },
      { "type": "uint256", "name": "totalLoss" }
    ],
    "inputs": [{ "type": "address", "name": "arg0" }],
    "stateMutability": "view",
    "type": "function",
    "gas": 10262
  },
  {
    "name": "withdrawalQueue",
    "outputs": [{ "type": "address", "name": "" }],
    "inputs": [{ "type": "uint256", "name": "arg0" }],
    "stateMutability": "view",
    "type": "function",
    "gas": 3060
  },
  {
    "name": "emergencyShutdown",
    "outputs": [{ "type": "bool", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 2981
  },
  {
    "name": "depositLimit",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "debtLimit",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3041
  },
  {
    "name": "totalDebt",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3071
  },
  {
    "name": "lastReport",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3101
  },
  {
    "name": "rewards",
    "outputs": [{ "type": "address", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3131
  },
  {
    "name": "managementFee",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3161
  },
  {
    "name": "performanceFee",
    "outputs": [{ "type": "uint256", "name": "" }],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3191
  }
]