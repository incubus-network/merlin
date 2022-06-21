import { ChainId } from '@shapeshiftoss/caip'
import { bitcoin, ChainAdapter } from '@shapeshiftoss/chain-adapters'
import { KnownChainIds } from '@shapeshiftoss/types'
import * as unchained from '@shapeshiftoss/unchained-client'
import { getConfig } from 'config'
import { Plugins } from 'plugins'

export function register(): Plugins {
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
                const http = new unchained.bitcoin.V1Api(
                  new unchained.bitcoin.Configuration({
                    basePath: getConfig().REACT_APP_UNCHAINED_BITCOIN_HTTP_URL,
                  }),
                )

                const ws = new unchained.ws.Client<unchained.bitcoin.BitcoinTx>(
                  getConfig().REACT_APP_UNCHAINED_BITCOIN_WS_URL,
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