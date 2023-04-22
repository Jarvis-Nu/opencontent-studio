import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { Post } from "../generated/schema"
import { Post as PostEvent } from "../generated/OpenContent/OpenContent"
import { handlePost } from "../src/open-content"
import { createPostEvent } from "./open-content-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let data = ["Example string value"]
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let newPostEvent = createPostEvent(data, owner)
    handlePost(newPostEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Post created and stored", () => {
    assert.entityCount("Post", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Post",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "data",
      "[Example string value]"
    )
    assert.fieldEquals(
      "Post",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
