import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { Post } from "../generated/OpenContent/OpenContent"

export function createPostEvent(data: Array<string>, owner: Address): Post {
  let postEvent = changetype<Post>(newMockEvent())

  postEvent.parameters = new Array()

  postEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromStringArray(data))
  )
  postEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return postEvent
}
