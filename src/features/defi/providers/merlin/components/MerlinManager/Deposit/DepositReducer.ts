import { KnownChainIds } from '@shapeshiftoss/types'
import { bn } from 'lib/bignumber/bignumber'
import { DefiType } from 'state/slices/opportunitiesSlice/types'

import type { MerlinDepositActions, MerlinDepositState } from './DepositCommon'
import { MerlinDepositActionType } from './DepositCommon'

export const initialState: MerlinDepositState = {
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
  pricePerShare: '',
  deposit: {
    fiatAmount: '',
    cryptoAmount: '',
    slippage: '',
    txStatus: 'pending',
    usedGasFeeCryptoBaseUnit: '',
  },
  isExactAllowance: false,
}

export const reducer = (state: MerlinDepositState, action: MerlinDepositActions) => {
  switch (action.type) {
    case MerlinDepositActionType.SET_OPPORTUNITY:
      return { ...state, merlinOpportunity: { ...state.merlinOpportunity, ...action.payload } }
    case MerlinDepositActionType.SET_APPROVE:
      return { ...state, approve: action.payload }
    case MerlinDepositActionType.SET_DEPOSIT:
      return { ...state, deposit: { ...state.deposit, ...action.payload } }
    case MerlinDepositActionType.SET_LOADING:
      return { ...state, loading: action.payload }
    case MerlinDepositActionType.SET_TXID:
      return { ...state, txid: action.payload }
    case MerlinDepositActionType.SET_IS_EXACT_ALLOWANCE:
      return { ...state, isExactAllowance: action.payload }
    default:
      return state
  }
}
