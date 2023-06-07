import type { ChainId } from '@gridironx/caip'
import type { ChainAdapter } from '@gridironx/chain-adapters'
import { thorchain } from '@gridironx/chain-adapters'
import { KnownChainIds } from '@shapeshiftoss/types'
import * as hightable from '@gridironx/hightable-client'
import { getConfig } from 'config'
import { type Plugins } from 'plugins/types'

// eslint-disable-next-line import/no-default-export
export default function register(): Plugins {
  return [
    [
      'thorchainChainAdapter',
      {
        name: 'thorchainChainAdapter',
        providers: {
          chainAdapters: [
            [
              KnownChainIds.ThorchainMainnet,
              () => {
                const http = new hightable.thorchain.V1Api(
                  new hightable.thorchain.Configuration({
                    basePath: getConfig().REACT_APP_HIGHTABLE_THORCHAIN_HTTP_URL,
                  }),
                )

                const ws = new hightable.ws.Client<hightable.cosmossdk.Tx>(
                  getConfig().REACT_APP_HIGHTABLE_THORCHAIN_WS_URL,
                )

                return new thorchain.ChainAdapter({
                  providers: { http, ws },
                  coinName: 'Thorchain',
                }) as unknown as ChainAdapter<ChainId> // FIXME: this is silly
              },
            ],
          ],
        },
      },
    ],
  ]
}
