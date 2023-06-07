import type { ChainId } from '@gridironx/caip'
import type { DepositValues } from 'features/defi/components/Deposit/Deposit'
import type { BigNumber } from 'lib/bignumber/bignumber'
import type { DefiType } from 'state/slices/opportunitiesSlice/types'

type SupportedMerlinOpportunity = {
  type: DefiType
  provider: string
  version: string
  contractAddress: string
  rewardToken: string
  stakingToken: string
  chain: ChainId
  tvl: BigNumber
  apy: string
  expired: boolean
}

type EstimatedGas = {
  estimatedGasCryptoBaseUnit?: string
}

type MerlinDepositValues = DepositValues &
  EstimatedGas & {
    txStatus: string
    usedGasFeeCryptoBaseUnit: string
  }

export type MerlinDepositState = {
  merlinOpportunity: SupportedMerlinOpportunity
  approve: EstimatedGas
  deposit: MerlinDepositValues
  loading: boolean
  pricePerShare: string
  txid: string | null
  isExactAllowance: boolean
}

export enum MerlinDepositActionType {
  SET_OPPORTUNITY = 'SET_OPPORTUNITY',
  SET_APPROVE = 'SET_APPROVE',
  SET_DEPOSIT = 'SET_DEPOSIT',
  SET_LOADING = 'SET_LOADING',
  SET_TXID = 'SET_TXID',
  SET_IS_EXACT_ALLOWANCE = 'SET_IS_EXACT_ALLOWANCE',
}

type SetMerlinOpportunitiesAction = {
  type: MerlinDepositActionType.SET_OPPORTUNITY
  payload: SupportedMerlinOpportunity | null
}

type SetApprove = {
  type: MerlinDepositActionType.SET_APPROVE
  payload: EstimatedGas
}

type SetDeposit = {
  type: MerlinDepositActionType.SET_DEPOSIT
  payload: Partial<MerlinDepositValues>
}

type SetLoading = {
  type: MerlinDepositActionType.SET_LOADING
  payload: boolean
}

type SetTxid = {
  type: MerlinDepositActionType.SET_TXID
  payload: string
}

type SetIsExactAllowance = {
  type: MerlinDepositActionType.SET_IS_EXACT_ALLOWANCE
  payload: boolean
}

export type MerlinDepositActions =
  | SetMerlinOpportunitiesAction
  | SetApprove
  | SetDeposit
  | SetLoading
  | SetTxid
  | SetIsExactAllowance
