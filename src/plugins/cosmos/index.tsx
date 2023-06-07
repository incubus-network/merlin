import type { ChainId } from '@gridironx/caip'
import type { ChainAdapter } from '@gridironx/chain-adapters'
import { cosmos } from '@gridironx/chain-adapters'
import { KnownChainIds } from '@shapeshiftoss/types'
import * as hightable from '@gridironx/hightable-client'
import { getConfig } from 'config'
import { type Plugins } from 'plugins/types'
import { AssetIcon } from 'components/AssetIcon'

// eslint-disable-next-line import/no-default-export
export default function register(): Plugins {
  return [
    [
      'cosmos:cosmoshub-4',
      {
        name: 'plugins.cosmos.navBar',
        icon: <AssetIcon src='https://assets.coincap.io/assets/icons/atom@2x.png' />,
        providers: {
          chainAdapters: [
            [
              KnownChainIds.CosmosMainnet,
              () => {
                const http = new hightable.cosmos.V1Api(
                  new hightable.cosmos.Configuration({
                    basePath: getConfig().REACT_APP_HIGHTABLE_COSMOS_HTTP_URL,
                  }),
                )

                const ws = new hightable.ws.Client<hightable.cosmossdk.Tx>(
                  getConfig().REACT_APP_HIGHTABLE_COSMOS_WS_URL,
                )

                return new cosmos.ChainAdapter({
                  providers: { http, ws },
                  coinName: 'Cosmos',
                }) as unknown as ChainAdapter<ChainId> // FIXME: this is silly
              },
            ],
          ],
        },
      },
    ],
  ]
}
