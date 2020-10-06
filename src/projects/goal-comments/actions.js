import { createZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { PROJECTS_ZOME_NAME } from '../../holochainConfig'

/* action creator functions */
const ADD_COMMENT_OF_GOAL = 'add_comment_of_goal'
const ARCHIVE_COMMENT_OF_GOAL = 'archive_comment_of_goal'
const FETCH_GOAL_COMMENTS = 'fetch_goal_comments'
const UPDATE_GOAL_COMMENT = 'update_goal_comment'

const addCommentOfGoal = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    ADD_COMMENT_OF_GOAL
  )

const archiveCommentOfGoal = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    ARCHIVE_COMMENT_OF_GOAL
  )

const fetchGoalComments = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    FETCH_GOAL_COMMENTS
  )

const updateGoalComment = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    UPDATE_GOAL_COMMENT
  )

export {
  ADD_COMMENT_OF_GOAL,
  ARCHIVE_COMMENT_OF_GOAL,
  FETCH_GOAL_COMMENTS,
  UPDATE_GOAL_COMMENT,
  addCommentOfGoal,
  fetchGoalComments,
  archiveCommentOfGoal,
  updateGoalComment,
}
