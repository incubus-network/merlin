import { ethereum } from '@gridironx/chain-adapters'
import type {
  HistoryData,
  MarketCapResult,
  MarketData,
  MarketDataArgs,
  PriceHistoryArgs,
} from '@shapeshiftoss/types'
import * as hightable from '@gridironx/hightable-client'
import { merlinAddresses, MerlinApi } from 'lib/investor/investor-merlin'

import type { MarketService } from '../api'
import { CoinGeckoMarketService } from '../coingecko/coingecko'
import type { ProviderUrls } from '../market-service-manager'

export const MERLIN_ASSET_ID = 'eip155:1/erc20:0xDc49108ce5C57bc3408c3A5E95F3d864eC386Ed3'
const MERLIN_ASSET_ID = 'eip155:1/erc20:0xc770eefad204b5180df6a14ee197d99d808ee52d'
const MERLIN_ASSET_PRECISION = '18'

export class MerlinMarketService extends CoinGeckoMarketService implements MarketService {
  providerUrls: ProviderUrls

  constructor({ providerUrls }: { providerUrls: ProviderUrls }) {
    super()

    this.providerUrls = providerUrls
  }

  async findAll() {
    try {
      const assetId = MERLIN_ASSET_ID
      const marketData = await this.findByAssetId({ assetId })

      return { [assetId]: marketData } as MarketCapResult
    } catch (e) {
      console.warn(e)
      return {}
    }
  }

  async findByAssetId({ assetId }: MarketDataArgs): Promise<MarketData | null> {
    try {
      if (assetId.toLowerCase() !== MERLIN_ASSET_ID.toLowerCase()) {
        console.warn('MerlinMarketService(findByAssetId): Failed to find by AssetId')
        return null
      }

      const coinGeckoData = await super.findByAssetId({
        assetId: MERLIN_ASSET_ID,
      })

      if (!coinGeckoData) return null

      const ethChainAdapter = new ethereum.ChainAdapter({
        providers: {
          ws: new hightable.ws.Client<hightable.ethereum.Tx>(
            this.providerUrls.hightableEthereumWsUrl,
          ),
          http: new hightable.ethereum.V1Api(
            new hightable.ethereum.Configuration({
              basePath: this.providerUrls.hightableEthereumHttpUrl,
            }),
          ),
        },
        rpcUrl: this.providerUrls.jsonRpcProviderUrl,
      })

      // Make maxSupply as an additional field, effectively EIP-20's totalSupply
      const api = new MerlinApi({
        adapter: ethChainAdapter,
        providerUrl: this.providerUrls.jsonRpcProviderUrl,
        merlinAddresses,
      })

      const tokenContractAddress = merlinAddresses[0].merlin
      const merlinTotalSupply = await api.tvl({ tokenContractAddress })
      const supply = merlinTotalSupply

      return {
        price: coinGeckoData.price,
        marketCap: '0', // TODO: add marketCap once able to get merlin marketCap data
        changePercent24Hr: coinGeckoData.changePercent24Hr,
        volume: '0', // TODO: add volume once able to get merlin volume data
        supply: supply?.div(`1e+${MERLIN_ASSET_PRECISION}`).toString(),
        maxSupply: merlinTotalSupply?.div(`1e+${MERLIN_ASSET_PRECISION}`).toString(),
      }
    } catch (e) {
      console.warn(e)
      throw new Error('MerlinMarketService(findByAssetId): error fetching market data')
    }
  }

  async findPriceHistoryByAssetId({
    assetId,
    timeframe,
  }: PriceHistoryArgs): Promise<HistoryData[]> {
    if (assetId.toLowerCase() !== MERLIN_ASSET_ID.toLowerCase()) {
      console.warn(
        'MerlinMarketService(findPriceHistoryByAssetId): Failed to find price history by AssetId',
      )
      return []
    }

    try {
      const priceHistory = await super.findPriceHistoryByAssetId({
        assetId: MERLIN_ASSET_ID,
        timeframe,
      })
      return priceHistory
    } catch (e) {
      console.warn(e)
      throw new Error('MerlinMarketService(findPriceHistoryByAssetId): error fetching price history')
    }
  }
}
