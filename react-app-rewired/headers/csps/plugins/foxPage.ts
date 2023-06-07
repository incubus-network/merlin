import type { Csp } from '../../types'

export const csp: Csp = {
  'connect-src': [
    // https://github.com/incubus-network/web/blob/c85fbdd27c360fc09cd8a2aaabec493f9c4e8b78/src/state/apis/merlin/merlinApi.ts#L21
    process.env.REACT_APP_TOKEMAK_STATS_URL!,
    // https://github.com/incubus-network/web/blob/965e5f3365e62f02f4cff3d0f78a020e0bf6b376/src/plugins/merlinPage/hooks/getGovernanceData.ts#L47
    process.env.REACT_APP_BOARDROOM_API_BASE_URL!,
  ],
}
