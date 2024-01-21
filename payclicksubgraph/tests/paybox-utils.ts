import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { AccountCreated } from "../generated/paybox/paybox"

export function createAccountCreatedEvent(
  caller: Address,
  _child: Address
): AccountCreated {
  let accountCreatedEvent = changetype<AccountCreated>(newMockEvent())

  accountCreatedEvent.parameters = new Array()

  accountCreatedEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  accountCreatedEvent.parameters.push(
    new ethereum.EventParam("_child", ethereum.Value.fromAddress(_child))
  )

  return accountCreatedEvent
}
