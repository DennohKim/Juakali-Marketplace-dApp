import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ProductCreated,
  ProductDeleted,
  ProductSold
} from "../generated/juakaliMarketPlace/juakaliMarketPlace"

export function createProductCreatedEvent(
  owner: Address,
  product_title: string,
  image_url: string,
  category: string,
  location: string,
  price: BigInt
): ProductCreated {
  let productCreatedEvent = changetype<ProductCreated>(newMockEvent())

  productCreatedEvent.parameters = new Array()

  productCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  productCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "product_title",
      ethereum.Value.fromString(product_title)
    )
  )
  productCreatedEvent.parameters.push(
    new ethereum.EventParam("image_url", ethereum.Value.fromString(image_url))
  )
  productCreatedEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )
  productCreatedEvent.parameters.push(
    new ethereum.EventParam("location", ethereum.Value.fromString(location))
  )
  productCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return productCreatedEvent
}

export function createProductDeletedEvent(productId: BigInt): ProductDeleted {
  let productDeletedEvent = changetype<ProductDeleted>(newMockEvent())

  productDeletedEvent.parameters = new Array()

  productDeletedEvent.parameters.push(
    new ethereum.EventParam(
      "productId",
      ethereum.Value.fromUnsignedBigInt(productId)
    )
  )

  return productDeletedEvent
}

export function createProductSoldEvent(productId: BigInt): ProductSold {
  let productSoldEvent = changetype<ProductSold>(newMockEvent())

  productSoldEvent.parameters = new Array()

  productSoldEvent.parameters.push(
    new ethereum.EventParam(
      "productId",
      ethereum.Value.fromUnsignedBigInt(productId)
    )
  )

  return productSoldEvent
}
