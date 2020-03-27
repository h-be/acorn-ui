/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { createHolochainZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { PROJECTS_ZOME_NAME } from '../../holochainConfig'

/* action creator functions */
const ADD_VOTE_OF_GOAL = 'add_vote_of_goal'
const ARCHIVE_VOTE_OF_GOAL = 'archive_vote_of_goal'
const FETCH_GOAL_VOTES = 'fetch_goal_votes'
const UPDATE_GOAL_VOTE = 'update_goal_vote'

const addVoteOfGoal = instanceId =>
  createHolochainZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    ADD_VOTE_OF_GOAL
  )

const archiveVoteOfGoal = instanceId =>
  createHolochainZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    ARCHIVE_VOTE_OF_GOAL
  )

const fetchGoalVotes = instanceId =>
  createHolochainZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    FETCH_GOAL_VOTES
  )

const updateGoalVote = instanceId =>
  createHolochainZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    UPDATE_GOAL_VOTE
  )

export {
  ADD_VOTE_OF_GOAL,
  ARCHIVE_VOTE_OF_GOAL,
  FETCH_GOAL_VOTES,
  UPDATE_GOAL_VOTE,
  addVoteOfGoal,
  fetchGoalVotes,
  archiveVoteOfGoal,
  updateGoalVote,
}
