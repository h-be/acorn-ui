/*
IMPORTANT NOTE

for now, remotely triggered create actions, and update actions, are just dispatching
the same events types, because their payload signatures match,
and the reducers handle them the same way
*/

import * as edgeActions from './projects/edges/actions'
import * as goalActions from './projects/goals/actions'
import * as goalVoteActions from './projects/goal-votes/actions'
import * as goalMemberActions from './projects/goal-members/actions'
import * as goalCommentActions from './projects/goal-comments/actions'
import * as entryPointActions from './projects/entry-points/actions'
import { setMember } from './projects/members/actions'
import { setAgent } from './agents/actions'
import { cellIdToString } from 'connoropolous-hc-redux-middleware'

// We directly use the 'success' type, since these actions
// have already succeeded on another machine, and we're just reflecting them locally
function createSignalAction(holochainAction, cellId, payload) {
  return {
    type: holochainAction.success().type,
    payload,
    meta: {
      cellIdString: cellIdToString(cellId),
    },
  }
}

// all possible values of `payload.action` off a signal
const ActionType = {
  Create: 'create',
  Update: 'update',
  Delete: 'delete',
}

// all possible values of `payload.entry_type` off a signal
const SignalType = {
  // Profiles Zome
  Agent: 'agent',
  // Projects Zome
  Edge: 'edge',
  EntryPoint: 'entry_point',
  Goal: 'goal',
  // custom signal type for a goal_with_edge
  // this is because it's important to the UI to receive both
  // the new goal, and the edge, at the same moment
  GoalWithEdge: 'goal_with_edge',
  // custom signal type for goal_fully_archived
  // this is because it's important to the UI to receive
  // both the archived goal, and everything connected to it that
  // has archived at the same time
  ArchiveGoalFully: 'archive_goal_fully',
  GoalComment: 'goal_comment',
  GoalMember: 'goal_member',
  GoalVote: 'goal_vote',
  Member: 'member',
  ProjectMeta: 'project_meta',
}

const crudActionSets = {
  Edge: edgeActions,
  Goal: goalActions,
  GoalVote: goalVoteActions,
  GoalMember: goalMemberActions,
  GoalComment: goalCommentActions,
  EntryPoint: entryPointActions,
}
const crudTypes = {
  edge: 'Edge',
  goal: 'Goal',
  goal_vote: 'GoalVote',
  goal_member: 'GoalMember',
  goal_comment: 'GoalComment',
  entry_point: 'EntryPoint',
}

// entryTypeName = CamelCase
const pickCrudAction = (entryTypeName, actionType) => {
  // these all follow a pattern, on account of the fact that they used
  // createCrudActionCreators to set themselves up
  let actionPrefix
  switch (actionType) {
    case ActionType.Create:
      actionPrefix = 'create'
      break
    case ActionType.Update:
      actionPrefix = 'update'
      break
    case ActionType.Delete:
      actionPrefix = 'archive'
      break
    default:
      throw new Error('unknown actionType')
  }
  const actionSet = crudActionSets[entryTypeName]
  // such as `createGoalComment`
  const actionName = `${actionPrefix}${entryTypeName}`
  return actionSet[actionName]
}

export default store => signal => {
  console.log(signal)
  const { cellId, payload } = signal.data

  // switch to CamelCasing if defined
  const crudType = crudTypes[payload.entry_type]
  if (crudType) {
    const action = pickCrudAction(crudType, payload.action)
    store.dispatch(createSignalAction(action, cellId, payload.data))
    // we captured the action for this signal, so early exit
    return
  }

  // otherwise use non-crud actions
  switch (payload.entry_type) {
    // profiles zome
    case SignalType.Agent:
      // this one is different than the rest on purpose
      // there's no "local action" equivalent
      store.dispatch(setAgent(payload.data))
      break
    // projects zome
    case SignalType.Member:
      // this one is different than the rest on purpose
      // there's no "local action" equivalent
      store.dispatch(setMember(cellIdToString(cellId), payload.data))
      break
    case SignalType.GoalWithEdge:
      store.dispatch(
        createSignalAction(goalActions.createGoalWithEdge, cellId, payload.data)
      )
      break
    case SignalType.ArchiveGoalFully:
      store.dispatch(
        createSignalAction(goalActions.archiveGoalFully, cellId, payload.data)
      )
      break
    default:
      console.log('unrecognised entry_type received: ', payload.entry_type)
  }
}
