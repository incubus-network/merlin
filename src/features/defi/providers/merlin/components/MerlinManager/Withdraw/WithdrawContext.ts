import { createContext } from 'react'

import type { MerlinWithdrawActions, MerlinWithdrawState } from './WithdrawCommon'

interface IWithdrawContext {
  state: MerlinWithdrawState | null
  dispatch: React.Dispatch<MerlinWithdrawActions> | null
}

export const WithdrawContext = createContext<IWithdrawContext>({ state: null, dispatch: null })
