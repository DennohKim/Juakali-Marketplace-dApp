import {
  ProductCreated as ProductCreatedEvent,
  ProductDeleted as ProductDeletedEvent,
  ProductSold as ProductSoldEvent
} from "../generated/juakaliMarketPlace/juakaliMarketPlace"
import {
  ProductCreated,
  ProductDeleted,
  ProductSold
} from "../generated/schema"

export function handleProductCreated(event: ProductCreatedEvent): void {
  let entity = new ProductCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.product_title = event.params.product_title
  entity.image_url = event.params.image_url
  entity.category = event.params.category
  entity.location = event.params.location
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProductDeleted(event: ProductDeletedEvent): void {
  let entity = new ProductDeleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.productId = event.params.productId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProductSold(event: ProductSoldEvent): void {
  let entity = new ProductSold(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.productId = event.params.productId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
