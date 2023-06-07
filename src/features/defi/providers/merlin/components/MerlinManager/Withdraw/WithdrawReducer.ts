import { KnownChainIds, WithdrawType } from '@shapeshiftoss/types'
import { bn } from 'lib/bignumber/bignumber'
import { DefiType } from 'state/slices/opportunitiesSlice/types'

import type { MerlinWithdrawActions, MerlinWithdrawState } from './WithdrawCommon'
import { MerlinWithdrawActionType } from './WithdrawCommon'

export const initialState: MerlinWithdrawState = {
  txid: null,
  merlinOpportunity: {
    contractAddress: '',
    stakingToken: '',
    provider: '',
    chain: KnownChainIds.EthereumMainnet,
    type: DefiType.Staking,
    expired: false,
    version: '',
    rewardToken: '',
    tvl: bn(0),
    apy: '',
  },
  loading: false,
  approve: {},
  withdraw: {
    fiatAmount: '',
    cryptoAmount: '',
    slippage: '',
    txStatus: 'pending',
    usedGasFeeCryptoBaseUnit: '',
    withdrawType: WithdrawType.DELAYED,
  },
  merlinFeePercentage: '',
}

export const reducer = (state: MerlinWithdrawState, action: MerlinWithdrawActions) => {
  switch (action.type) {
    case MerlinWithdrawActionType.SET_OPPORTUNITY:
      return { ...state, merlinOpportunity: { ...state.merlinOpportunity, ...action.payload } }
    case MerlinWithdrawActionType.SET_APPROVE:
      return { ...state, approve: action.payload }
    case MerlinWithdrawActionType.SET_WITHDRAW:
      return { ...state, withdraw: { ...state.withdraw, ...action.payload } }
    case MerlinWithdrawActionType.SET_LOADING:
      return { ...state, loading: action.payload }
    case MerlinWithdrawActionType.SET_TXID:
      return { ...state, txid: action.payload }
    case MerlinWithdrawActionType.SET_MERLIN_FEE:
      return { ...state, merlinFeePercentage: action.payload }
    default:
      return state
  }
}
