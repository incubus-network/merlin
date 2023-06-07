import type { ChainId } from '@gridironx/caip'
import type { ChainAdapter } from '@gridironx/chain-adapters'
import type { Route } from 'Routes/helpers'
import type { FeatureFlags } from 'state/slices/preferencesSlice/preferencesSlice'

export type Plugins = [chainId: string, chain: Plugin][]

export interface Plugin {
  name: string
  icon?: JSX.Element
  featureFlag?: (keyof FeatureFlags)[]
  onLoad?: () => void
  providers?: {
    chainAdapters?: [ChainId, () => ChainAdapter<ChainId>][]
  }
  routes?: Route[]
}
