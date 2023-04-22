import { Post as PostEvent } from "../generated/OpenContent/OpenContent"
import { Post } from "../generated/schema"

export function handlePost(event: PostEvent): void {
  let entity = new Post(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.data[0]
  entity.description = event.params.data[1]
  entity.postThumbnailUrl = event.params.data[2]
  entity.authorName = event.params.data[3]
  entity.authorThumbnailUrl = event.params.data[4]
  entity.content = event.params.data[5]
  entity.date = event.params.data[6]
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
