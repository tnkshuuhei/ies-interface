import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { EvaluationCreated } from "../generated/schema"
import { EvaluationCreated as EvaluationCreatedEvent } from "../generated/IES/IES"
import { handleEvaluationCreated } from "../src/ies"
import { createEvaluationCreatedEvent } from "./ies-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let evaluation = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newEvaluationCreatedEvent = createEvaluationCreatedEvent(id, evaluation)
    handleEvaluationCreated(newEvaluationCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("EvaluationCreated created and stored", () => {
    assert.entityCount("EvaluationCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "EvaluationCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "evaluation",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
