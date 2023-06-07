import type { EvmBaseAdapter } from '@gridironx/chain-adapters'
import { KnownChainIds } from '@shapeshiftoss/types'
import { getConfig } from 'config'
import { getChainAdapterManager } from 'context/PluginProvider/chainAdapterSingleton'
import { merlinAddresses, MerlinApi } from 'lib/investor/investor-merlin'

// don't export me, access me through the getter
let _merlinApi: MerlinApi | undefined = undefined

// we need to be able to access this outside react
export const getMerlinApi = (): MerlinApi => {
  // Infura requests are origin restricted upstream to *.incubus.network
  // Using our own node locally allows MERLIN development, though the balances aren't guaranteed to be accurate
  // since our archival node isn't fully synced yet
  const isLocalhost = window.location.hostname === 'localhost'
  const RPC_PROVIDER_ENV = isLocalhost
    ? 'REACT_APP_ETHEREUM_NODE_URL'
    : 'REACT_APP_ETHEREUM_INFURA_URL'

  if (_merlinApi) return _merlinApi

  const merlinApi = new MerlinApi({
    adapter: getChainAdapterManager().get(
      KnownChainIds.EthereumMainnet,
    ) as unknown as EvmBaseAdapter<KnownChainIds.EthereumMainnet>,
    providerUrl: getConfig()[RPC_PROVIDER_ENV],
    merlinAddresses,
  })

  _merlinApi = merlinApi

  return _merlinApi
}
