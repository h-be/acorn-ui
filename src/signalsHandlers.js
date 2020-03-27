/*
IMPORTANT NOTE

for now, remotely triggered create actions, and update actions, are just dispatching
the same events types, because their payload signatures match,
and the reducers handle them the same way
*/

import { createGoal, archiveGoal } from './projects/goals/actions'
import { addVoteOfGoal, archiveVoteOfGoal } from './projects/goal-votes/actions'
import {
  addMemberOfGoal,
  archiveMemberOfGoal,
} from './projects/goal-members/actions'
import {
  addCommentOfGoal,
  archiveCommentOfGoal,
} from './projects/goal-comments/actions'
import { setMember } from './projects/members/actions'
import { setAgent } from './agents/actions'

// We directly use the 'success' type, since these actions
// have already succeeded on another machine, and we're just reflecting them locally
function createSignalAction(holochainAction, instanceId, payload) {
  return {
    type: holochainAction(instanceId).success().type,
    payload,
  }
}

export default function(store, onSignal) {
  onSignal(rawSignal => {
    if (rawSignal.type !== 'InstanceSignal') {
      // swallow InstanceStats signals
      // rawSignal.type === 'InstanceStats'
      return
    }

    const instanceId = rawSignal.instance_id
    const signalContent = rawSignal.signal
    let signalArgs = JSON.parse(signalContent.arguments)
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
        store.dispatch(setMember(instanceId, member))
        break
      case 'goal_maybe_with_edge':
        const { goal } = signalArgs
        store.dispatch(createSignalAction(createGoal, instanceId, goal))
        break
      case 'goal_archived':
        const { archived } = signalArgs
        store.dispatch(createSignalAction(archiveGoal, instanceId, archived))
        break
      case 'goal_comment':
        const { goalComment } = signalArgs
        store.dispatch(
          createSignalAction(addCommentOfGoal, instanceId, goalComment)
        )
        break
      case 'goal_comment_archived':
        store.dispatch(
          createSignalAction(
            archiveCommentOfGoal,
            instanceId,
            signalArgs.address
          )
        )
        break
      case 'goal_member':
        const { goalMember } = signalArgs
        store.dispatch(
          createSignalAction(addMemberOfGoal, instanceId, goalMember)
        )
        break
      case 'goal_member_archived':
        store.dispatch(
          createSignalAction(
            archiveMemberOfGoal,
            instanceId,
            signalArgs.address
          )
        )
        break
      case 'goal_vote':
        const { goalVote } = signalArgs
        store.dispatch(createSignalAction(addVoteOfGoal, instanceId, goalVote))
        break
      case 'goal_vote_archived':
        store.dispatch(
          createSignalAction(archiveVoteOfGoal, instanceId, signalArgs.address)
        )
        break
      default:
        console.log('unrecognised signal type received: ', signalContent.name)
    }
  })
}
