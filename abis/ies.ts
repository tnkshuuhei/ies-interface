const address: `0x${string}` = "0xCE409480a92444df96b3B83B6441b08ba7c27ec1";
const abi = [
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address", name: "_treasury", type: "address" },
      { internalType: "address", name: "_gonernor", type: "address" },
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "address", name: "_eas", type: "address" },
      { internalType: "address", name: "_schemaRegistry", type: "address" },
      { internalType: "address", name: "_hats", type: "address" },
      { internalType: "string", name: "_imageURL", type: "string" },
      { internalType: "address", name: "_splitsToken", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "ALREADY_INITIALIZED", type: "error" },
  { inputs: [], name: "AccessControlBadConfirmation", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bytes32", name: "neededRole", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  { inputs: [], name: "DATA_MISMATCH", type: "error" },
  { inputs: [], name: "EMPTY_ROLE_IMAGE_URL", type: "error" },
  { inputs: [], name: "EMPTY_ROLE_METADATA", type: "error" },
  { inputs: [], name: "EMPTY_ROLE_WEARERS", type: "error" },
  { inputs: [], name: "EVALUATION_CONTRACT_MISMATCH", type: "error" },
  { inputs: [], name: "EVALUATION_INIT_FAILED", type: "error" },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  { inputs: [], name: "INSUFFICIENT_FUNDS", type: "error" },
  { inputs: [], name: "INVALID_ADMIN", type: "error" },
  { inputs: [], name: "INVALID_INPUT", type: "error" },
  { inputs: [], name: "INVALID_PROJECT_OWNER", type: "error" },
  { inputs: [], name: "INVALID_PROJECT_REGISTRATION", type: "error" },
  { inputs: [], name: "INVALID_REPORT_CREATION", type: "error" },
  { inputs: [], name: "INVALID_ROLE_DATA", type: "error" },
  { inputs: [], name: "NON_ZERO_VALUE", type: "error" },
  { inputs: [], name: "NOT_GOVERNOR", type: "error" },
  { inputs: [], name: "NOT_IMPLEMENTED", type: "error" },
  { inputs: [], name: "NO_CONTRIBUTORS", type: "error" },
  { inputs: [], name: "POOL_ID_MISMATCH", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "poolId", type: "uint256" }],
    name: "POOL_NOT_INITIALIZED",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  { inputs: [], name: "UNAUTHORIZED", type: "error" },
  { inputs: [], name: "ZERO_ADDRESS", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: true,
        internalType: "address",
        name: "evaluation",
        type: "address",
      },
    ],
    name: "EvaluationCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "projectHatId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "reportHatId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "proposer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "reportMetadata",
        type: "string",
      },
    ],
    name: "ImpactReportCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "treasury",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "governor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "schemaUID",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "topHatId",
        type: "uint256",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "minDeposit",
        type: "uint256",
      },
    ],
    name: "MinimumDepositChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PoolFunded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "id", type: "bytes32" },
      {
        indexed: false,
        internalType: "uint256",
        name: "hatId",
        type: "uint256",
      },
      { indexed: false, internalType: "string", name: "name", type: "string" },
      {
        indexed: false,
        internalType: "string",
        name: "metadata",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "imageURL",
        type: "string",
      },
    ],
    name: "ProfileCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "projectHatid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reportHatId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "roleHatId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "wearers",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "string",
        name: "metadata",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "imageURL",
        type: "string",
      },
    ],
    name: "RoleCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "treasury",
        type: "address",
      },
    ],
    name: "TreasuryUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_DEPOSIT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "profileId", type: "bytes32" },
      { internalType: "address[]", name: "contributors", type: "address[]" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "string", name: "metadataUID", type: "string" },
      { internalType: "address", name: "proposer", type: "address" },
      { internalType: "string[]", name: "links", type: "string[]" },
    ],
    name: "attest",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_minDeposit", type: "uint256" }],
    name: "changeMinDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_hatId", type: "uint256" },
      { internalType: "address[]", name: "_contributors", type: "address[]" },
      { internalType: "string", name: "_title", type: "string" },
      { internalType: "string", name: "_description", type: "string" },
      { internalType: "string", name: "_imageURL", type: "string" },
      { internalType: "string", name: "_reportMetadata", type: "string" },
      { internalType: "string[]", name: "_links", type: "string[]" },
      { internalType: "address", name: "_proposer", type: "address" },
      { internalType: "bytes[]", name: "_roleData", type: "bytes[]" },
    ],
    name: "createReport",
    outputs: [
      { internalType: "uint256", name: "reportHatsId", type: "uint256" },
      { internalType: "uint256", name: "poolId", type: "uint256" },
      { internalType: "uint256", name: "proposalId", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "eas",
    outputs: [{ internalType: "contract IEAS", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "evaluationAddrByHatId",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "evaluationCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "evaluations",
    outputs: [
      { internalType: "bytes32", name: "profileId", type: "bytes32" },
      { internalType: "uint256", name: "projectHatId", type: "uint256" },
      { internalType: "address", name: "evaluation", type: "address" },
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "string", name: "metadata", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "governor",
    outputs: [
      { internalType: "contract IGovernor", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hats",
    outputs: [{ internalType: "contract IHats", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "address", name: "from", type: "address" },
      { internalType: "uint256[]", name: "ids", type: "uint256[]" },
      { internalType: "uint256[]", name: "values", type: "uint256[]" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "onERC1155BatchReceived",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "address", name: "from", type: "address" },
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "onERC1155Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "profilesById",
    outputs: [
      { internalType: "bytes32", name: "id", type: "bytes32" },
      { internalType: "uint256", name: "hatId", type: "uint256" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "metadata", type: "string" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "string", name: "imageURL", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "projectReportCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_imageURL", type: "string" },
      { internalType: "string", name: "_metadata", type: "string" },
      { internalType: "address", name: "_owner", type: "address" },
    ],
    name: "registerProject",
    outputs: [
      { internalType: "bytes32", name: "profileId", type: "bytes32" },
      { internalType: "uint256", name: "hatId", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "callerConfirmation", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "resolver",
    outputs: [
      { internalType: "contract AttesterResolver", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "schemaUID",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "splitsToken",
    outputs: [{ internalType: "contract IERC1155", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "topHatId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "treasury",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "_treasury", type: "address" },
    ],
    name: "updateTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "voteToken",
    outputs: [
      { internalType: "contract VotingIESToken", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const ies = {
  address: address,
  abi: abi,
};
