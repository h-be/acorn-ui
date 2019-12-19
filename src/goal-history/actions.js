import { createHolochainZomeCallAsyncAction } from '@holochain/hc-redux-middleware'

import { DEVELOPMENT_INSTANCE_NAME, ZOME_NAME } from '../holochainConfig'

/* action creator functions */

const fetchGoalHistory = createHolochainZomeCallAsyncAction(
  DEVELOPMENT_INSTANCE_NAME,
  ZOME_NAME,
  'history_of_goal'
)

export { fetchGoalHistory }
