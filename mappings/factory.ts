import { BigInt, BigDecimal } from "@graphprotocol/graph-ts"
import { PairCreated } from "../generated/Factory/Factory"
import { Pair } from "../generated/templates"
import { Token, Pair as PairEntity } from "../generated/schema"
import { Pair as PairTemplate } from "../generated/templates"

export function handlePairCreated(event: PairCreated): void {
  let id = event.params.pair.toHex()
  let pair = new PairEntity(id)
  pair.token0 = event.params.token0.toHex()
  pair.token1 = event.params.token1.toHex()
  pair.txCount = BigInt.fromI32(0)
  pair.reserve0 = BigDecimal.fromString("0")
  pair.reserve1 = BigDecimal.fromString("0")
  pair.reserveUSD = BigDecimal.fromString("0")
  pair.totalSupply = BigDecimal.fromString("0")
  pair.volumeUSD = BigDecimal.fromString("0")
  pair.save()

  PairTemplate.create(event.params.pair)
}
