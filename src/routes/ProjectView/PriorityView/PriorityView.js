import React from 'react'
import {
  NavLink,
  useLocation,
  useParams,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'

import IndentedTreeView from '../../../components/IndentedTreeView/IndentedTreeView'

import './PriorityView.css'
import PriorityQuadrant from '../../../components/PriorityQuadrant/PriorityQuadrant'

function Quadrants({
  projectId,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  whoami,
}) {
  return (
    <div className='priority-quadrants-wrapper'>
      <div className='priority-quadrants-content'>
        <div className='priority-quadrants-row'>
          <PriorityQuadrant
            projectId={projectId}
            title={topLeft.title}
            titleClassname='top-left'
            goals={topLeft.goals}
            whoami={whoami}
          />
          <div className='priority-quadrants-vertical-divider'></div>
          <PriorityQuadrant
            projectId={projectId}
            title={topRight.title}
            titleClassname='top-right'
            goals={topRight.goals}
            whoami={whoami}
          />
        </div>
        <div className='priority-quadrants-horizontal-divider'></div>
        <div className='priority-quadrants-row'>
          <PriorityQuadrant
            projectId={projectId}
            title={bottomLeft.title}
            titleClassname='bottom-left'
            goals={bottomLeft.goals}
            whoami={whoami}
          />
          <div className='priority-quadrants-vertical-divider'></div>
          <PriorityQuadrant
            projectId={projectId}
            title={bottomRight.title}
            titleClassname='bottom-right'
            goals={bottomRight.goals}
            whoami={whoami}
          />
        </div>
      </div>
    </div>
  )
}

function getSubsetOfGoalsBasedOnContext(goalTrees, contextGoalAddress) {
  if (!contextGoalAddress) {
    return goalTrees
  }

  // use recursion to find the goal down in the tree
  function checkForGoalInChildren(goal) {
    const foundInChildren = goal.children.find(
      g => g.address === contextGoalAddress
    )
    if (foundInChildren) {
      return foundInChildren
    } else {
      // use .find to early exit when
      // it finds one that matches
      const foundInChildrensChildren = goal.children.find(g => {
        return checkForGoalInChildren(g)
      })
      if (foundInChildrensChildren) {
        return checkForGoalInChildren(foundInChildrensChildren)
      } else {
        return null
      }
    }
  }
  const goal = checkForGoalInChildren({ children: goalTrees })
  if (goal) {
    return goal.children
  } else {
    return goalTrees
  }
}

function UrgencyImportanceQuadrants({ projectId, goalTrees, goalVotes }) {
  const location = useLocation()
  const contextGoalAddress = new URLSearchParams(location.search).get(
    'contextGoal'
  )
  const goals = getSubsetOfGoalsBasedOnContext(goalTrees, contextGoalAddress)
  const goalLists = getSortedAveragesGoalLists(
    goals,
    goalVotes,
    'urgency',
    'importance'
  )

  const topLeft = {
    title: 'more urgent & more important',
    goals: goalLists[0],
  }
  const topRight = {
    title: 'more urgent & less important',
    goals: goalLists[1],
  }
  const bottomLeft = {
    title: 'less urgent & more important',
    goals: goalLists[2],
  }
  const bottomRight = {
    title: 'less urgent & less important',
    goals: goalLists[3],
  }
  return (
    <Quadrants {...{ projectId, topLeft, topRight, bottomLeft, bottomRight }} />
  )
}

function ImpactEffortQuadrants({ projectId, goalTrees, goalVotes }) {
  const location = useLocation()
  const contextGoalAddress = new URLSearchParams(location.search).get(
    'contextGoal'
  )
  const goals = getSubsetOfGoalsBasedOnContext(goalTrees, contextGoalAddress)
  const goalLists = getSortedAveragesGoalLists(
    goals,
    goalVotes,
    'impact',
    'effort'
  )

  const topLeft = {
    title: 'more impact & less effort',
    goals: goalLists[0],
  }
  const topRight = {
    title: 'less impact & less effort',
    goals: goalLists[1],
  }
  const bottomLeft = {
    title: 'more impact & more effort',
    goals: goalLists[2],
  }
  const bottomRight = {
    title: 'less impact & more effort',
    goals: goalLists[3],
  }
  return (
    <Quadrants {...{ projectId, topLeft, topRight, bottomLeft, bottomRight }} />
  )
}

function Uncategorized({ projectId, goalTrees, goalVotes }) {
  const location = useLocation()
  const contextGoalAddress = new URLSearchParams(location.search).get(
    'contextGoal'
  )
  const goals = getSubsetOfGoalsBasedOnContext(goalTrees, contextGoalAddress)
  const goalList = goals.filter(goal => {
    // if there are no Votes, this Goal is "uncategorized"
    return !goalVotes.find(gv => gv.goal_address === goal.address)
  })
  return (
    <div className='priority-wrapper-full-height'>
      <PriorityQuadrant
        projectId={projectId}
        title='uncategorized'
        titleClassname='bottom-left'
        goals={goalList}
      />
    </div>
  )
}

function PriorityMenuItem({ exact, title, slug, projectId }) {
  return (
    <NavLink
      exact={exact}
      to={slug.replace(':projectId', projectId)}
      className='priority-menu-item'
      activeClassName='active'>
      {title}
    </NavLink>
  )
}

function PriorityView({ projectId, goalTrees, goalVotes }) {
  const priorityMenuItems = [
    ['Urgency x Importance', `/project/:projectId/priority/urgency-importance`],
    ['Impact x Effort', '/project/:projectId/priority/impact-effort'],
    // ['Urgency', '/project/:projectId/priority/urgency'],
    // ['Importance', '/project/:projectId/priority/importance'],
    // ['Impact', '/project/:projectId/priority/impact'],
    // ['Effort', '/project/:projectId/priority/effort'],
    ['Uncategorized', '/project/:projectId/priority/uncategorized'],
  ]

  return (
    <div className='priority-view-wrapper'>
      <IndentedTreeView goalTrees={goalTrees} />
      <div className='priority-menu-wrapper'>
        {priorityMenuItems.map(([menuTitle, menuSlugs], index) => {
          return (
            <PriorityMenuItem
              key={index}
              exact={index === 0}
              title={menuTitle}
              slug={menuSlugs}
              projectId={projectId}
            />
          )
        })}
      </div>
      <Switch>
        {/* impact - effort */}
        <Route path={priorityMenuItems[1][1]}>
          <ImpactEffortQuadrants
            projectId={projectId}
            goalTrees={goalTrees}
            goalVotes={goalVotes}
          />
        </Route>
        {/* uncategorized */}
        {/* TODO: change 2 back to 6 when the other modes come online */}
        <Route path={priorityMenuItems[2][1]}>
          <Uncategorized
            projectId={projectId}
            goalTrees={goalTrees}
            goalVotes={goalVotes}
          />
        </Route>
        {/* urgency - importance */}
        <Route path={priorityMenuItems[0][1]}>
          <UrgencyImportanceQuadrants
            projectId={projectId}
            goalTrees={goalTrees}
            goalVotes={goalVotes}
          />
        </Route>
        <Route
          exact
          path='/project/:projectId/priority'
          component={PriorityRedirect}
        />
      </Switch>
    </div>
  )
}

function PriorityRedirect() {
  const { projectId } = useParams()
  return <Redirect to={`/project/${projectId}/priority/urgency-importance`} />
}

function getSortedAveragesGoalLists(
  allGoals,
  goalVotes,
  voteKeyOne,
  voteKeyTwo
) {
  const NO_VOTES = 'no_votes'
  // first calculate averages
  const goalsWithPriorityAverages = allGoals
    .map(goal => {
      const votes = goalVotes.filter(gv => gv.goal_address === goal.address)
      let averageValues = NO_VOTES
      let averageAverage
      if (votes.length > 0) {
        averageValues = [0, 0, 0, 0]
        votes.forEach(element => {
          averageValues[0] += element[voteKeyOne] * 100
          averageValues[1] += element[voteKeyTwo] * 100
          // special case for "effort", since higher is "worse"
          // invert its score out of 100
          if (voteKeyTwo === 'effort') {
            averageValues[1] = 100 - averageValues[1]
          }
        })
        averageValues[0] /= votes.length
        averageValues[1] /= votes.length
        averageAverage = (averageValues[0] + averageValues[1]) / 2
      }
      return {
        ...goal,
        averageValues,
        averageAverage,
      }
    })
    .filter(goal => goal.averageValues !== NO_VOTES)

  function sortByAverageAverage(a, b) {
    return a.averageAverage < b.averageAverage ? 1 : -1
  }

  return [
    // top left
    goalsWithPriorityAverages
      .filter(goal => {
        return goal.averageValues[0] > 50 && goal.averageValues[1] > 50
      })
      .sort(sortByAverageAverage),
    // top right
    goalsWithPriorityAverages
      .filter(goal => {
        return goal.averageValues[0] <= 50 && goal.averageValues[1] > 50
      })
      .sort(sortByAverageAverage),
    // bottom left
    goalsWithPriorityAverages
      .filter(goal => {
        return goal.averageValues[0] > 50 && goal.averageValues[1] <= 50
      })
      .sort(sortByAverageAverage),
    // bottom right
    goalsWithPriorityAverages
      .filter(goal => {
        return goal.averageValues[0] <= 50 && goal.averageValues[1] <= 50
      })
      .sort(sortByAverageAverage),
  ]
}

function mapDispatchToProps(dispatch) {
  return {}
}

function mapStateToProps(state) {
  const projectId = state.ui.activeProject
  const goalMembers = state.projects.goalMembers[projectId] || {}
  const goalVotes = state.projects.goalVotes[projectId] || {}
  const goals = state.projects.goals[projectId] || {}
  const edges = state.projects.edges[projectId] || {}

  // modify so that all goals have their related goal members
  // modify so that all goals have their related goal members
  const allGoals = Object.values(goals).map(goal => {
    const members = Object.values(goalMembers)
      .filter(gm => gm.goal_address === goal.address)
      .map(gm => state.agents[gm.agent_address])
    return {
      ...goal,
      members,
    }
  })

  // CONSTRUCT TREES FOR THE INDENTED NAV TREE VIEW
  const edgesAsArray = Object.values(edges)
  const allGoalAddresses = allGoals.map(goal => goal.address)
  // find the Goal objects without parent Goals
  // since they will sit at the top level
  const noParentsAddresses = allGoalAddresses.filter(goalAddress => {
    return !edgesAsArray.find(edge => edge.child_address === goalAddress)
  })
  // recursively calls itself
  // so that it constructs the full sub-tree for each root Goal
  function getGoal(goalAddress) {
    return {
      ...goals[goalAddress],
      children: edgesAsArray
        // find the edges indicating the children of this goal
        .filter(edge => edge.parent_address === goalAddress)
        // actually nest the children Goals, recurse
        .map(edge => getGoal(edge.child_address)),
    }
  }
  // start with the root Goals, and recurse down to their children
  const goalTrees = noParentsAddresses.map(getGoal)

  return {
    projectId,
    goalTrees,
    goalVotes: Object.values(goalVotes),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriorityView)
