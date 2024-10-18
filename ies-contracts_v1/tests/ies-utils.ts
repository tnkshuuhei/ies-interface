import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
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
  TreasuryUpdated
} from "../generated/IES/IES"

export function createEvaluationCreatedEvent(
  id: BigInt,
  evaluation: Address
): EvaluationCreated {
  let evaluationCreatedEvent = changetype<EvaluationCreated>(newMockEvent())

  evaluationCreatedEvent.parameters = new Array()

  evaluationCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  evaluationCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "evaluation",
      ethereum.Value.fromAddress(evaluation)
    )
  )

  return evaluationCreatedEvent
}

export function createImpactReportCreatedEvent(
  projectHatId: BigInt,
  reportHatId: BigInt,
  proposalId: BigInt
): ImpactReportCreated {
  let impactReportCreatedEvent = changetype<ImpactReportCreated>(newMockEvent())

  impactReportCreatedEvent.parameters = new Array()

  impactReportCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "projectHatId",
      ethereum.Value.fromUnsignedBigInt(projectHatId)
    )
  )
  impactReportCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "reportHatId",
      ethereum.Value.fromUnsignedBigInt(reportHatId)
    )
  )
  impactReportCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )

  return impactReportCreatedEvent
}

export function createInitializedEvent(
  owner: Address,
  treasury: Address,
  governor: Address,
  token: Address,
  schemaUID: Bytes,
  topHatId: BigInt
): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam("treasury", ethereum.Value.fromAddress(treasury))
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam("governor", ethereum.Value.fromAddress(governor))
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "schemaUID",
      ethereum.Value.fromFixedBytes(schemaUID)
    )
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "topHatId",
      ethereum.Value.fromUnsignedBigInt(topHatId)
    )
  )

  return initializedEvent
}

export function createMinimumDepositChangedEvent(
  minDeposit: BigInt
): MinimumDepositChanged {
  let minimumDepositChangedEvent = changetype<MinimumDepositChanged>(
    newMockEvent()
  )

  minimumDepositChangedEvent.parameters = new Array()

  minimumDepositChangedEvent.parameters.push(
    new ethereum.EventParam(
      "minDeposit",
      ethereum.Value.fromUnsignedBigInt(minDeposit)
    )
  )

  return minimumDepositChangedEvent
}

export function createPoolFundedEvent(id: BigInt, amount: BigInt): PoolFunded {
  let poolFundedEvent = changetype<PoolFunded>(newMockEvent())

  poolFundedEvent.parameters = new Array()

  poolFundedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  poolFundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return poolFundedEvent
}

export function createProfileCreatedEvent(
  id: Bytes,
  hatId: BigInt,
  name: string,
  metadata: string,
  owner: Address
): ProfileCreated {
  let profileCreatedEvent = changetype<ProfileCreated>(newMockEvent())

  profileCreatedEvent.parameters = new Array()

  profileCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )
  profileCreatedEvent.parameters.push(
    new ethereum.EventParam("hatId", ethereum.Value.fromUnsignedBigInt(hatId))
  )
  profileCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  profileCreatedEvent.parameters.push(
    new ethereum.EventParam("metadata", ethereum.Value.fromString(metadata))
  )
  profileCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return profileCreatedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleCreatedEvent(
  projectHatid: BigInt,
  reportHatId: BigInt,
  roleHatId: BigInt,
  wearers: Array<Address>,
  metadata: string,
  imageURL: string
): RoleCreated {
  let roleCreatedEvent = changetype<RoleCreated>(newMockEvent())

  roleCreatedEvent.parameters = new Array()

  roleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "projectHatid",
      ethereum.Value.fromUnsignedBigInt(projectHatid)
    )
  )
  roleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "reportHatId",
      ethereum.Value.fromUnsignedBigInt(reportHatId)
    )
  )
  roleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "roleHatId",
      ethereum.Value.fromUnsignedBigInt(roleHatId)
    )
  )
  roleCreatedEvent.parameters.push(
    new ethereum.EventParam("wearers", ethereum.Value.fromAddressArray(wearers))
  )
  roleCreatedEvent.parameters.push(
    new ethereum.EventParam("metadata", ethereum.Value.fromString(metadata))
  )
  roleCreatedEvent.parameters.push(
    new ethereum.EventParam("imageURL", ethereum.Value.fromString(imageURL))
  )

  return roleCreatedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createTreasuryUpdatedEvent(treasury: Address): TreasuryUpdated {
  let treasuryUpdatedEvent = changetype<TreasuryUpdated>(newMockEvent())

  treasuryUpdatedEvent.parameters = new Array()

  treasuryUpdatedEvent.parameters.push(
    new ethereum.EventParam("treasury", ethereum.Value.fromAddress(treasury))
  )

  return treasuryUpdatedEvent
}
