import type { ChainId, ChainReference } from '@gridironx/caip'
import { CHAIN_NAMESPACE, toChainId } from '@gridironx/caip'

export const lifiChainIdToChainId = (lifiChainId: number): ChainId => {
  return toChainId({
    chainNamespace: CHAIN_NAMESPACE.Evm,
    chainReference: lifiChainId.toString() as ChainReference,
  })
}
