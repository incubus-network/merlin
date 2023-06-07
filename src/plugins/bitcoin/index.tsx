import type { ChainId } from '@gridironx/caip'
import type { ChainAdapter } from '@gridironx/chain-adapters'
import { bitcoin } from '@gridironx/chain-adapters'
import { KnownChainIds } from '@shapeshiftoss/types'
import * as hightable from '@gridironx/hightable-client'
import { getConfig } from 'config'
import { type Plugins } from 'plugins/types'

// eslint-disable-next-line import/no-default-export
export default function register(): Plugins {
  return [
    [
      'bitcoinChainAdapter',
      {
        name: 'bitcoinChainAdapter',
        providers: {
          chainAdapters: [
            [
              KnownChainIds.BitcoinMainnet,
              () => {
                const http = new hightable.bitcoin.V1Api(
                  new hightable.bitcoin.Configuration({
                    basePath: getConfig().REACT_APP_HIGHTABLE_BITCOIN_HTTP_URL,
                  }),
                )

                const ws = new hightable.ws.Client<hightable.bitcoin.Tx>(
                  getConfig().REACT_APP_HIGHTABLE_BITCOIN_WS_URL,
                )

                return new bitcoin.ChainAdapter({
                  providers: { http, ws },
                  coinName: 'Bitcoin',
                }) as unknown as ChainAdapter<ChainId> // FIXME: this is silly
              },
            ],
          ],
        },
      },
    ],
  ]
}
