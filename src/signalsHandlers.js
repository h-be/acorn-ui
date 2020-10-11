/*
IMPORTANT NOTE

for now, remotely triggered create actions, and update actions, are just dispatching
the same events types, because their payload signatures match,
and the reducers handle them the same way
*/

import { createEdge, archiveEdge } from './projects/edges/actions'
import { createGoal, archiveGoalFully } from './projects/goals/actions'
import { createGoalVote, archiveGoalVote } from './projects/goal-votes/actions'
import {
  createGoalMember,
  archiveGoalMember,
} from './projects/goal-members/actions'
import {
  createGoalComment,
  archiveGoalComment,
} from './projects/goal-comments/actions'
import { setMember } from './projects/members/actions'
import { setAgent } from './agents/actions'

// We directly use the 'success' type, since these actions
// have already succeeded on another machine, and we're just reflecting them locally
function createSignalAction(holochainAction, cellId, payload) {
  return {
    type: holochainAction.success().type,
    payload,
  }
}

export default store => signal => {
  console.log(signal)
  return

  const cellId = rawSignal.instance_id
  const signalContent = rawSignal.signal
  let signalArgs
  try {
    signalArgs = JSON.parse(signalContent.arguments)
  } catch (e) {
    console.log(e, signalContent)
    return
  }
  switch (signalContent.name) {
    case 'new_agent':
      const { agent } = signalArgs
      // this one is different than the rest on purpose
      // there's no "local action" equivalent
      store.dispatch(setAgent(agent))
      break
    case 'new_member':
      const { member } = signalArgs
      // this one is different than the rest on purpose
      // there's no "local action" equivalent
      store.dispatch(setMember(cellId, member))
      break
    case 'goal_maybe_with_edge':
      const { goal } = signalArgs
      store.dispatch(createSignalAction(createGoal, cellId, goal))
      break
    case 'goal_archived':
      const { archived } = signalArgs
      store.dispatch(createSignalAction(archiveGoalFully, cellId, archived))
      break
    // covers create and update cases
    case 'edge':
      const { edge } = signalArgs
      store.dispatch(createSignalAction(createEdge, cellId, edge))
      break
    case 'edge_archived':
      store.dispatch(
        createSignalAction(archiveEdge, cellId, signalArgs.address)
      )
      break
    case 'goal_comment':
      const { goalComment } = signalArgs
      store.dispatch(createSignalAction(createGoalComment, cellId, goalComment))
      break
    case 'goal_comment_archived':
      store.dispatch(
        createSignalAction(archiveGoalComment, cellId, signalArgs.address)
      )
      break
    case 'goal_member':
      const { goalMember } = signalArgs
      store.dispatch(createSignalAction(createGoalMember, cellId, goalMember))
      break
    case 'goal_member_archived':
      store.dispatch(
        createSignalAction(archiveGoalMember, cellId, signalArgs.address)
      )
      break
    case 'goal_vote':
      const { goalVote } = signalArgs
      store.dispatch(createSignalAction(createGoalVote, cellId, goalVote))
      break
    case 'goal_vote_archived':
      store.dispatch(
        createSignalAction(archiveGoalVote, cellId, signalArgs.address)
      )
      break
    default:
      console.log('unrecognised signal type received: ', signalContent.name)
  }
}
