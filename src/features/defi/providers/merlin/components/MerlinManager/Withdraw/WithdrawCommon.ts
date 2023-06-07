import type { ChainId } from '@gridironx/caip'
import type { WithdrawType } from '@shapeshiftoss/types'
import type { WithdrawValues } from 'features/defi/components/Withdraw/Withdraw'
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

type MerlinWithdrawValues = WithdrawValues &
  EstimatedGas & {
    txStatus: string
    usedGasFeeCryptoBaseUnit: string
    withdrawType: WithdrawType
  }

export type MerlinWithdrawState = {
  merlinOpportunity: SupportedMerlinOpportunity
  approve: EstimatedGas
  withdraw: MerlinWithdrawValues
  loading: boolean
  txid: string | null
  merlinFeePercentage: string
}
export enum MerlinWithdrawActionType {
  SET_OPPORTUNITY = 'SET_OPPORTUNITY',
  SET_WITHDRAW = 'SET_WITHDRAW',
  SET_APPROVE = 'SET_APPROVE',
  SET_LOADING = 'SET_LOADING',
  SET_TXID = 'SET_TXID',
  SET_TX_STATUS = 'SET_TX_STATUS',
  SET_MERLIN_FEE = 'SET_MERLIN_FEE',
}

type SetVaultAction = {
  type: MerlinWithdrawActionType.SET_OPPORTUNITY
  payload: SupportedMerlinOpportunity | null
}

type SetApprove = {
  type: MerlinWithdrawActionType.SET_APPROVE
  payload: EstimatedGas
}

type SetWithdraw = {
  type: MerlinWithdrawActionType.SET_WITHDRAW
  payload: Partial<MerlinWithdrawValues>
}

type SetLoading = {
  type: MerlinWithdrawActionType.SET_LOADING
  payload: boolean
}

type SetTxid = {
  type: MerlinWithdrawActionType.SET_TXID
  payload: string
}

type SetMerlinFee = {
  type: MerlinWithdrawActionType.SET_MERLIN_FEE
  payload: string
}

export type MerlinWithdrawActions =
  | SetVaultAction
  | SetApprove
  | SetWithdraw
  | SetLoading
  | SetTxid
  | SetMerlinFee
