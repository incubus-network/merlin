import { createContext } from 'react'

import type { MerlinDepositActions, MerlinDepositState } from './DepositCommon'

export interface IDepositContext {
  state: MerlinDepositState | null
  dispatch: React.Dispatch<MerlinDepositActions> | null
}

export const DepositContext = createContext<IDepositContext>({ state: null, dispatch: null })
