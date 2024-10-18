import { Bytes } from "@graphprotocol/graph-ts";

import {
  EvaluationCreated as EvaluationCreatedEvent,
  ImpactReportCreated as ImpactReportCreatedEvent,
  Initialized as InitializedEvent,
  MinimumDepositChanged as MinimumDepositChangedEvent,
  PoolFunded as PoolFundedEvent,
  ProfileCreated as ProfileCreatedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleCreated as RoleCreatedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  TreasuryUpdated as TreasuryUpdatedEvent,
} from "../generated/IES/IES";
import {
  EvaluationCreated,
  ImpactReportCreated,
  Initialized,
  MinimumDepositChanged,
  PoolFunded,
  ProfileCreated,
  RoleAdminChanged,
  RoleCreated,
  RoleGranted,
  RoleRevoked,
  TreasuryUpdated,
} from "../generated/schema";

export function handleEvaluationCreated(event: EvaluationCreatedEvent): void {
  let entity = new EvaluationCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.IES_id = event.params.id;
  entity.evaluation = event.params.evaluation;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleImpactReportCreated(
  event: ImpactReportCreatedEvent
): void {
  let entity = new ImpactReportCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.projectHatId = event.params.projectHatId;
  entity.reportHatId = event.params.reportHatId;
  entity.proposalId = event.params.proposalId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.treasury = event.params.treasury;
  entity.governor = event.params.governor;
  entity.token = event.params.token;
  entity.schemaUID = event.params.schemaUID;
  entity.topHatId = event.params.topHatId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMinimumDepositChanged(
  event: MinimumDepositChangedEvent
): void {
  let entity = new MinimumDepositChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.minDeposit = event.params.minDeposit;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePoolFunded(event: PoolFundedEvent): void {
  let entity = new PoolFunded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.IES_id = event.params.id;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleProfileCreated(event: ProfileCreatedEvent): void {
  let entity = new ProfileCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.IES_id = event.params.id;
  entity.hatId = event.params.hatId;
  entity.name = event.params.name;
  entity.metadata = event.params.metadata;
  entity.owner = event.params.owner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.previousAdminRole = event.params.previousAdminRole;
  entity.newAdminRole = event.params.newAdminRole;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleCreated(event: RoleCreatedEvent): void {
  // let entity = new RoleCreated(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // );
  // entity.projectHatid = event.params.projectHatid;
  // entity.reportHatId = event.params.reportHatId;
  // entity.roleHatId = event.params.roleHatId;
  // entity.wearers = event.params.wearers;
  // entity.metadata = event.params.metadata;
  // entity.imageURL = event.params.imageURL;
  // entity.blockNumber = event.block.number;
  // entity.blockTimestamp = event.block.timestamp;
  // entity.transactionHash = event.transaction.hash;
  // entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTreasuryUpdated(event: TreasuryUpdatedEvent): void {
  let entity = new TreasuryUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.treasury = event.params.treasury;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
