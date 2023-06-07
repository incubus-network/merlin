import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react'
import type { AssetId, ToAssetIdArgs } from '@gridironx/caip'
import { ethChainId, merlinAssetId, merlinAssetId } from '@gridironx/caip'
import { supportsETH } from '@shapeshiftoss/hdwallet-core'
import qs from 'qs'
import { useCallback, useMemo } from 'react'
import { useTranslate } from 'react-polyglot'
import { useHistory, useLocation } from 'react-router'
import { AssetMarketData } from 'components/AssetHeader/AssetMarketData'
import { SEO } from 'components/Layout/Seo'
import { WalletActions } from 'context/WalletProvider/actions'
import { useRouteAssetId } from 'hooks/useRouteAssetId/useRouteAssetId'
import { useWallet } from 'hooks/useWallet/useWallet'
import { bn, bnOrZero } from 'lib/bignumber/bignumber'
import { merlinAddresses } from 'lib/investor/investor-merlin'
import { trackOpportunityEvent } from 'lib/mixpanel/helpers'
import { getMixPanel } from 'lib/mixpanel/mixPanelSingleton'
import { MixPanelEvents } from 'lib/mixpanel/types'
import { useGetMerlinAprQuery } from 'state/apis/merlin/merlinApi'
import { useGetAssetDescriptionQuery } from 'state/slices/assetsSlice/assetsSlice'
import { DefiProvider } from 'state/slices/opportunitiesSlice/types'
import { toOpportunityId } from 'state/slices/opportunitiesSlice/utils'
import {
  selectAggregatedEarnUserStakingOpportunityByStakingId,
  selectAssetById,
  selectAssets,
  selectPortfolioCryptoPrecisionBalanceByFilter,
  selectPortfolioFiatBalanceByAssetId,
  selectSelectedLocale,
} from 'state/slices/selectors'
import { useAppSelector } from 'state/store'
import { breakpoints } from 'theme/theme'

import { AssetActions } from './components/AssetActions'
import { BondProtocolCta } from './components/BondProtocolCta'
import { DappBack } from './components/DappBack'
import { MerlinChart } from './components/MerlinChart'
import { MerlinTab } from './components/MerlinTab'
import { Governance } from './components/Governance'
import { Layout } from './components/Layout'
import { MainOpportunity } from './components/MainOpportunity'
import { OtherOpportunities } from './components/OtherOpportunities/OtherOpportunities'
import { Total } from './components/Total'
import type { TradeOpportunitiesBucket } from './components/TradeOpportunities'
import { TradeOpportunities } from './components/TradeOpportunities'
import { merlinTradeOpportunitiesBuckets, merlinTradeOpportunitiesBuckets } from './MerlinCommon'
import { useOtherOpportunities } from './hooks/useOtherOpportunities'

export enum MerlinPageRoutes {
  Merlin = '/merlin/merlin',
  Merlin = '/merlin/merlin',
}

const assetsRoutes: Record<AssetId, MerlinPageRoutes> = {
  [merlinAssetId]: MerlinPageRoutes.Merlin,
  [merlinAssetId]: MerlinPageRoutes.Merlin,
}

const assetsTradeOpportunitiesBuckets: Record<AssetId, TradeOpportunitiesBucket[]> = {
  [merlinAssetId]: merlinTradeOpportunitiesBuckets,
  [merlinAssetId]: merlinTradeOpportunitiesBuckets,
}

export const MerlinPage = () => {
  const {
    state: { wallet },
    dispatch,
  } = useWallet()
  const translate = useTranslate()
  const history = useHistory()
  const location = useLocation()
  const mixpanel = getMixPanel()

  const activeAssetId = useRouteAssetId()
  const allAssets = useAppSelector(selectAssets)
  // TODO(gomes): Use useRouteAssetId and selectAssetById programmatically
  const assetMerlin = useAppSelector(state => selectAssetById(state, merlinAssetId))
  const assetMerlin = useAppSelector(state => selectAssetById(state, merlinAssetId))
  if (!assetMerlin) throw new Error(`Asset not found for AssetId ${merlinAssetId}`)
  if (!assetMerlin) throw new Error(`Asset not found for AssetId ${merlinAssetId}`)

  const otherOpportunities = useOtherOpportunities(activeAssetId)

  const assets = useMemo(() => [assetMerlin, assetMerlin], [assetMerlin, assetMerlin])

  const selectedAssetIndex = useMemo(
    () => assets.findIndex(asset => asset?.assetId === activeAssetId),
    [activeAssetId, assets],
  )

  const selectedAsset = assets[selectedAssetIndex]

  const merlinFilter = useMemo(() => ({ assetId: merlinAssetId }), [])
  const merlinFilter = useMemo(() => ({ assetId: merlinAssetId }), [])
  const fiatBalanceMerlin =
    useAppSelector(s => selectPortfolioFiatBalanceByAssetId(s, merlinFilter)) ?? '0'
  const fiatBalanceMerlin =
    useAppSelector(s => selectPortfolioFiatBalanceByAssetId(s, merlinFilter)) ?? '0'
  const cryptoHumanBalanceMerlin =
    useAppSelector(s => selectPortfolioCryptoPrecisionBalanceByFilter(s, merlinFilter)) ?? '0'
  const cryptoHumanBalanceMerlin =
    useAppSelector(s => selectPortfolioCryptoPrecisionBalanceByFilter(s, merlinFilter)) ?? '0'

  const fiatBalances = useMemo(
    () => [fiatBalanceMerlin, fiatBalanceMerlin],
    [fiatBalanceMerlin, fiatBalanceMerlin],
  )

  const cryptoHumanBalances = useMemo(
    () => [cryptoHumanBalanceMerlin, cryptoHumanBalanceMerlin],
    [cryptoHumanBalanceMerlin, cryptoHumanBalanceMerlin],
  )

  const { data: merlinAprData, isLoading: isMerlinAprLoading } = useGetMerlinAprQuery()

  const totalFiatBalance = bnOrZero(fiatBalanceMerlin).plus(bnOrZero(fiatBalanceMerlin)).toString()

  const [isLargerThanMd] = useMediaQuery(`(min-width: ${breakpoints['md']})`, { ssr: false })
  const mobileTabBg = useColorModeValue('gray.100', 'gray.750')
  const description =
    selectedAsset.assetId === merlinAssetId
      ? translate('plugins.merlinPage.merlinDescription') // MERLIN has a custom description, other assets can use the asset-service one
      : selectedAsset.description

  const selectedLocale = useAppSelector(selectSelectedLocale)
  // TODO(gomes): Export a similar RTK select() query, consumed to determine wallet + staking balance loaded
  const getAssetDescriptionQuery = useGetAssetDescriptionQuery({
    assetId: selectedAsset.assetId,
    selectedLocale,
  })
  const isAssetDescriptionLoaded = !getAssetDescriptionQuery.isLoading

  const toAssetIdParts: ToAssetIdArgs = {
    assetNamespace: 'erc20',
    assetReference: merlinAddresses[0].staking,
    chainId: ethChainId,
  }

  const opportunityId = toOpportunityId(toAssetIdParts)
  const opportunityDataFilter = useMemo(() => {
    return {
      stakingId: opportunityId,
    }
  }, [opportunityId])

  const merlinEarnOpportunityData = useAppSelector(state =>
    opportunityDataFilter
      ? selectAggregatedEarnUserStakingOpportunityByStakingId(state, opportunityDataFilter)
      : undefined,
  )

  const handleTabClick = useCallback(
    (assetId: AssetId, assetName: string) => {
      if (assetId === activeAssetId) {
        return
      }
      mixpanel?.track(MixPanelEvents.Click, { element: `${assetName} toggle` })
      history.push(assetsRoutes[assetId])
    },
    [activeAssetId, history, mixpanel],
  )

  const handleOpportunityClick = useCallback(() => {
    if (!merlinEarnOpportunityData) return
    if (!wallet || !supportsETH(wallet)) {
      dispatch({ type: WalletActions.SET_WALLET_MODAL, payload: true })
      return
    }

    trackOpportunityEvent(
      MixPanelEvents.ClickOpportunity,
      {
        opportunity: merlinEarnOpportunityData,
        element: 'Merlin Page Row',
      },
      allAssets,
    )

    history.push({
      pathname: location.pathname,
      search: qs.stringify({
        provider: DefiProvider.ShapeShift,
        chainId: assetMerlin.chainId,
        assetNamespace: 'erc20',
        contractAddress: merlinAddresses[0].merlin,
        assetReference: merlinAddresses[0].staking,
        rewardId: merlinAddresses[0].merlin,
        modal: 'overview',
      }),
      state: { background: location },
    })
  }, [allAssets, assetMerlin.chainId, dispatch, merlinEarnOpportunityData, history, location, wallet])

  if (!isAssetDescriptionLoaded || !activeAssetId) return null
  if (wallet && supportsETH(wallet) && !merlinEarnOpportunityData) return null

  return (
    <Layout
      title={translate('plugins.merlinPage.merlinToken', {
        assetSymbol: selectedAsset.symbol,
      })}
      description={description ?? ''}
      icon={selectedAsset.icon}
    >
      <SEO
        title={translate('plugins.merlinPage.merlinToken', {
          assetSymbol: selectedAsset.symbol,
        })}
      />
      <Tabs variant='unstyled' index={selectedAssetIndex}>
        <TabList>
          <SimpleGrid
            gridTemplateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
            gridGap={4}
            mb={4}
            width='full'
          >
            <Total fiatAmount={totalFiatBalance} icons={[assetMerlin.icon, assetMerlin.icon]} />
            {isLargerThanMd &&
              assets.map((asset, index) => (
                <MerlinTab
                  key={asset.assetId}
                  assetSymbol={asset.symbol}
                  assetIcon={asset.icon}
                  cryptoAmount={cryptoHumanBalances[index]}
                  fiatAmount={fiatBalances[index]}
                  onClick={() => handleTabClick(asset.assetId, asset.name)}
                />
              ))}
            {!isLargerThanMd && (
              <Box mb={4}>
                <Menu matchWidth>
                  <Box mx={{ base: 4, md: 0 }}>
                    <MenuButton
                      borderWidth='2px'
                      borderColor='primary'
                      height='auto'
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      bg={mobileTabBg}
                      width='full'
                    >
                      {selectedAsset && (
                        <MerlinTab
                          assetSymbol={selectedAsset.symbol}
                          assetIcon={selectedAsset.icon}
                          cryptoAmount={cryptoHumanBalances[selectedAssetIndex]}
                          fiatAmount={fiatBalances[selectedAssetIndex]}
                        />
                      )}
                    </MenuButton>
                  </Box>
                  <MenuList zIndex={3}>
                    {assets.map((asset, index) => (
                      <MenuItem
                        key={asset.assetId}
                        onClick={() => handleTabClick(asset.assetId, asset.name)}
                      >
                        <MerlinTab
                          assetSymbol={asset.symbol}
                          assetIcon={asset.icon}
                          cryptoAmount={cryptoHumanBalances[index]}
                          fiatAmount={fiatBalances[index]}
                          as={Box}
                        />
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
            )}
          </SimpleGrid>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <Stack
              alignItems='flex-start'
              spacing={4}
              mx='auto'
              direction={{ base: 'column', xl: 'row' }}
            >
              <Stack spacing={4} flex='1 1 0%' width='full'>
                <MainOpportunity
                  assetId={selectedAsset.assetId}
                  apy={merlinAprData?.merlinApr ?? ''}
                  tvl={bnOrZero(merlinEarnOpportunityData?.tvl).toString()}
                  isLoaded={Boolean(merlinEarnOpportunityData && !isMerlinAprLoading)}
                  balance={bnOrZero(merlinEarnOpportunityData?.cryptoAmountBaseUnit)
                    .div(bn(10).pow(assetMerlin.precision))
                    .toFixed()}
                  onClick={handleOpportunityClick}
                />

                <OtherOpportunities
                  title={`plugins.merlinPage.otherOpportunitiesTitle.${selectedAsset.symbol}`}
                  description={`plugins.merlinPage.otherOpportunitiesDescription.${selectedAsset.symbol}`}
                  opportunities={otherOpportunities}
                />
                <Governance />
              </Stack>
              <Stack flex='1 1 0%' width='full' maxWidth={{ base: 'full', lg: 'sm' }} spacing={4}>
                <AssetActions assetId={merlinAssetId} />
                <BondProtocolCta />
                <DappBack />
                <TradeOpportunities opportunities={assetsTradeOpportunitiesBuckets[merlinAssetId]} />
                <AssetMarketData assetId={selectedAsset.assetId} />
                <MerlinChart assetId={merlinAssetId} />
              </Stack>
            </Stack>
          </TabPanel>
          <TabPanel p={0}>
            <Stack
              alignItems='flex-start'
              spacing={4}
              mx='auto'
              direction={{ base: 'column', xl: 'row' }}
            >
              <Stack spacing={4} flex='1 1 0%' width='full'>
                <OtherOpportunities
                  title={`plugins.merlinPage.otherOpportunitiesTitle.${selectedAsset.symbol}`}
                  description={`plugins.merlinPage.otherOpportunitiesDescription.${selectedAsset.symbol}`}
                  opportunities={otherOpportunities}
                />
              </Stack>
              <Stack flex='1 1 0%' width='full' maxWidth={{ base: 'full', lg: 'sm' }} spacing={4}>
                <AssetActions assetId={merlinAssetId} />
                <DappBack />
                <TradeOpportunities opportunities={assetsTradeOpportunitiesBuckets[merlinAssetId]} />
                <AssetMarketData assetId={selectedAsset.assetId} />
                <MerlinChart assetId={merlinAssetId} />
              </Stack>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  )
}
