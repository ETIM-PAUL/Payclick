import { AccountCreated as AccountCreatedEvent } from "../generated/paybox/paybox"
import { payboxdashboard as PayboxDashboardEvent } from "../generated/templates/payboxDashboard/payboxdashboard"
import { AccountCreated } from "../generated/schema"
import {payboxDashboard} from "../generated/templates"


export function handleAccountCreated(event: AccountCreatedEvent): void {
  let entity = new AccountCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.caller = event.params.caller
  entity._factory = event.params._factory

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}


export function handleTokenDeposit(event: PayboxDashboardEvent): void {
  payboxDashboard.create(event._address)
}

