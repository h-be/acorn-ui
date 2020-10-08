import { PROJECTS_ZOME_NAME } from '../../holochainConfig'
import { createCrudActionCreators } from '../../crudRedux'

const [
  createGoal,
  fetchGoals,
  updateGoal,
  archiveGoal,
] = createCrudActionCreators(PROJECTS_ZOME_NAME, 'goal')

export {
  createGoal,
  fetchGoals,
  updateGoal,
  archiveGoal,
}