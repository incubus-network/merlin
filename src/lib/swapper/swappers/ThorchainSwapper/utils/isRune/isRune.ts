import type { AssetId } from '@gridironx/caip'
import { thorchainAssetId } from '@gridironx/caip'

export const isRune = (assetId: AssetId) => assetId === thorchainAssetId
