import { createHolochainZomeCallAsyncAction } from '@holochain/hc-redux-middleware'

import { DEVELOPMENT_INSTANCE_NAME, ZOME_NAME } from '../holochainConfig'

/* action creator functions */

const addCommentOfGoal = createHolochainZomeCallAsyncAction(
  DEVELOPMENT_INSTANCE_NAME,
  ZOME_NAME,
  'add_comment_of_goal'
)
const archiveCommentOfGoal = createHolochainZomeCallAsyncAction(
  DEVELOPMENT_INSTANCE_NAME,
  ZOME_NAME,
  'archive_comment_of_goal'
)
const fetchGoalComments = createHolochainZomeCallAsyncAction(
  DEVELOPMENT_INSTANCE_NAME,
  ZOME_NAME,
  'fetch_goal_comments'
)
const updateGoalComment = createHolochainZomeCallAsyncAction(
  DEVELOPMENT_INSTANCE_NAME,
  ZOME_NAME,
  'update_goal_comment'
)

export {
  addCommentOfGoal,
  fetchGoalComments,
  archiveCommentOfGoal,
  updateGoalComment,
}
