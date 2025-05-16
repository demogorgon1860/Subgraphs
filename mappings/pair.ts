
import { Swap as SwapEvent } from "../generated/templates/Pair/Pair"
import { Swap } from "../generated/schema"
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"

export function handleSwap(event: SwapEvent): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let swap = new Swap(id)

  swap.pair = event.address.toHex()
  swap.sender = event.params.sender
  swap.to = event.params.to
  swap.amount0In = event.params.amount0In.toBigDecimal()
  swap.amount1In = event.params.amount1In.toBigDecimal()
  swap.amount0Out = event.params.amount0Out.toBigDecimal()
  swap.amount1Out = event.params.amount1Out.toBigDecimal()
  swap.amountUSD = BigDecimal.zero()
  swap.timestamp = event.block.timestamp

  swap.save()
}
