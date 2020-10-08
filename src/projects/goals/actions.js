import { createZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { PROJECTS_ZOME_NAME } from '../../holochainConfig'
import { createCrudActionCreators } from '../../crudRedux'

const CREATE_GOAL_WITH_EDGE = 'create_goal_with_edge'

const createGoalWithEdge = createZomeCallAsyncAction(
  PROJECTS_ZOME_NAME,
  CREATE_GOAL_WITH_EDGE
)

const [
  createGoal,
  fetchGoals,
  updateGoal,
  archiveGoal,
] = createCrudActionCreators(PROJECTS_ZOME_NAME, 'goal')

export {
  createGoal,
  createGoalWithEdge,
  fetchGoals,
  updateGoal,
  archiveGoal,
}