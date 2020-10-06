import { createZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { PROJECTS_ZOME_NAME } from '../../holochainConfig'

/* action creator functions */
const HISTORY_OF_GOAL = 'history_of_goal'

const fetchGoalHistory = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    HISTORY_OF_GOAL
  )

export { HISTORY_OF_GOAL, fetchGoalHistory }
