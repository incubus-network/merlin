import type { ChainId } from '@gridironx/caip'
import { CHAIN_NAMESPACE, fromChainId } from '@gridironx/caip'
import type { CosmosSdkChainId, EvmChainId, UtxoChainId } from '@gridironx/chain-adapters'

export const isUtxoSwap = (chainId: ChainId): chainId is UtxoChainId => {
  const { chainNamespace } = fromChainId(chainId)
  return chainNamespace === CHAIN_NAMESPACE.Utxo
}

export const isEvmSwap = (chainId: ChainId): chainId is EvmChainId => {
  const { chainNamespace } = fromChainId(chainId)
  return chainNamespace === CHAIN_NAMESPACE.Evm
}

export const isCosmosSdkSwap = (chainId: ChainId): chainId is CosmosSdkChainId => {
  const { chainNamespace } = fromChainId(chainId)
  return chainNamespace === CHAIN_NAMESPACE.CosmosSdk
}
