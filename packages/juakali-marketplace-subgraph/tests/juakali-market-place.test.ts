import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ProductCreated } from "../generated/schema"
import { ProductCreated as ProductCreatedEvent } from "../generated/juakaliMarketPlace/juakaliMarketPlace"
import { handleProductCreated } from "../src/juakali-market-place"
import { createProductCreatedEvent } from "./juakali-market-place-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let product_title = "Example string value"
    let image_url = "Example string value"
    let category = "Example string value"
    let location = "Example string value"
    let price = BigInt.fromI32(234)
    let newProductCreatedEvent = createProductCreatedEvent(
      owner,
      product_title,
      image_url,
      category,
      location,
      price
    )
    handleProductCreated(newProductCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ProductCreated created and stored", () => {
    assert.entityCount("ProductCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ProductCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ProductCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "product_title",
      "Example string value"
    )
    assert.fieldEquals(
      "ProductCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "image_url",
      "Example string value"
    )
    assert.fieldEquals(
      "ProductCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "category",
      "Example string value"
    )
    assert.fieldEquals(
      "ProductCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "location",
      "Example string value"
    )
    assert.fieldEquals(
      "ProductCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
