import { isNft } from '@gridironx/caip'
import type {
  FindAllMarketArgs,
  HistoryData,
  MarketCapResult,
  MarketData,
  MarketDataArgs,
  PriceHistoryArgs,
} from '@shapeshiftoss/types'

// import { Yearn } from '@yfi/sdk'
import type { MarketService } from './api'
import { CoinCapMarketService } from './coincap/coincap'
import { CoinGeckoMarketService } from './coingecko/coingecko'
import { MerlinMarketService } from './merlin/merlin'
import { IdleMarketService } from './idle/idle'
import { OsmosisMarketService } from './osmosis/osmosis'
// import { YearnTokenMarketCapService } from './yearn/yearn-tokens'
// import { YearnVaultMarketCapService } from './yearn/yearn-vaults'

export type ProviderUrls = {
  jsonRpcProviderUrl: string
  hightableEthereumHttpUrl: string
  hightableEthereumWsUrl: string
  osmosisMarketDataUrl: string
  osmosisPoolMetadataUrl: string
}

export type MarketServiceManagerArgs = {
  yearnChainReference: 1 | 250 | 1337 | 42161 // from @yfi/sdk
  providerUrls: ProviderUrls
}

export class MarketServiceManager {
  marketProviders: MarketService[]

  constructor(args: MarketServiceManagerArgs) {
    const { providerUrls } = args

    // TODO(0xdef1cafe): after chain agnosticism, we need to dependency inject a chainReference here
    // YearnVaultMarketCapService deps
    // const network = yearnChainReference ?? 1 // 1 for mainnet
    // const provider = new JsonRpcProvider(providerUrls.jsonRpcProviderUrl)
    // const yearnSdk = new Yearn(network, { provider })

    this.marketProviders = [
      // Order of this MarketProviders array constitutes the order of providers we will be checking first.
      // More reliable providers should be listed first.
      new CoinGeckoMarketService(),
      new CoinCapMarketService(),
      // Yearn is currently borked upstream
      // new YearnVaultMarketCapService({ yearnSdk }),
      // new YearnTokenMarketCapService({ yearnSdk }),
      new IdleMarketService({ providerUrls }),
      new OsmosisMarketService(providerUrls),
      new MerlinMarketService({ providerUrls }),
    ]
  }

  async findAll(args: FindAllMarketArgs): Promise<MarketCapResult> {
    let result: MarketCapResult | null = null
    // Go through market providers listed above and look for market data for all assets.
    // Once data is found, exit the loop and return result. If no data is found for any
    // provider, throw an error.
    for (let i = 0; i < this.marketProviders.length && !result; i++) {
      try {
        result = await this.marketProviders[i].findAll(args)
      } catch (e) {
        console.warn(e, '')
      }
    }
    if (!result) throw new Error('Cannot find market service provider for market data.')
    return result
  }

  async findByAssetId({ assetId }: MarketDataArgs) {
    if (isNft(assetId)) {
      return {
        price: '0',
        marketCap: '0',
        volume: '0',
        changePercent24Hr: 0,
      }
    }

    let result: MarketData | null = null
    // Loop through market providers and look for asset market data. Once found, exit loop.
    for (let i = 0; i < this.marketProviders.length && !result; i++) {
      try {
        result = await this.marketProviders[i].findByAssetId({ assetId })
      } catch (e) {
        // Swallow error, not every asset will be with every provider.
      }
    }
    if (!result) return null
    return result
  }

  async findPriceHistoryByAssetId({
    assetId,
    timeframe,
  }: PriceHistoryArgs): Promise<HistoryData[]> {
    if (isNft(assetId)) return []

    let result: HistoryData[] | null = null
    // Loop through market providers and look for asset price history data. Once found, exit loop.
    for (let i = 0; i < this.marketProviders.length && !result?.length; i++) {
      try {
        result = await this.marketProviders[i].findPriceHistoryByAssetId({ assetId, timeframe })
      } catch (e) {
        // Swallow error, not every asset will be with every provider.
      }
    }
    if (!result) return []
    return result
  }
}
