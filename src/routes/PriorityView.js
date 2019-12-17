import React from 'react'
import { NavLink, useRouteMatch, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import IndentedTreeView from '../components/IndentedTreeView/IndentedTreeView'

import './PriorityView.css'
import PriorityQuadrant from '../components/PriorityQuadrant/PriorityQuadrant'

function PriorityMenuItem({ title, slug }) {
  return (
    <NavLink
      exact
      to={slug}
      className='priority-menu-item'
      activeClassName='active'>
      {title}
    </NavLink>
  )
}

function Quadrants({ topLeft, topRight, bottomLeft, bottomRight }) {
  return (
    <div className='priority-quadrants-wrapper'>
      <div className='priority-quadrands-content'>
        <div className='priority-quadrants-row'>
          <PriorityQuadrant
            title={topLeft.title}
            titleClassname='top-left'
            goals={topLeft.goals}
          />
          <div className='priority-quadrants-vertical-divider'></div>
          <PriorityQuadrant
            title={topRight.title}
            titleClassname='top-right'
            goals={topRight.goals}
          />
        </div>
        <div className='priority-quadrants-horizontal-divider'></div>
        <div className='priority-quadrants-row'>
          <PriorityQuadrant
            title={bottomLeft.title}
            titleClassname='bottom-left'
            goals={bottomLeft.goals}
          />
          <div className='priority-quadrants-vertical-divider'></div>
          <PriorityQuadrant
            title={bottomRight.title}
            titleClassname='bottom-right'
            goals={bottomRight.goals}
          />
        </div>
      </div>
    </div>
  )
}

function UrgencyImportanceQuadrants({ goalLists }) {
  const topLeft = {
    title: 'urgent & important',
    goals: goalLists[0],
  }
  const topRight = {
    title: 'less urgent & important',
    goals: goalLists[1],
  }
  const bottomLeft = {
    title: 'urgent & less important',
    goals: goalLists[2],
  }
  const bottomRight = {
    title: 'less urgent & less important',
    goals: goalLists[3],
  }
  return <Quadrants {...{ topLeft, topRight, bottomLeft, bottomRight }} />
}

function ImpactEffortQuadrants({ goalLists }) {
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
  return <Quadrants {...{ topLeft, topRight, bottomLeft, bottomRight }} />
}

function PriorityView({ goalTrees, allGoals, goalVotes }) {
  const { url } = useRouteMatch()

  const priorityMenuItems = [
    ['Urgency x Importance', `${url}`], // default
    ['Impact x Effort', `${url}/impact-effort`],
    ['Urgency', `${url}/urgency`],
    ['Importance', `${url}/importance`],
    ['Impact', `${url}/impact`],
    ['Effort', `${url}/effort`],
    ['Uncategorized', `${url}/uncategorized`],
  ]

  let goalLists = []

  // urgency x importance
  if (useRouteMatch({ path: priorityMenuItems[0][1], exact: true })) {
    goalLists = getSortedAveragesGoalLists(
      allGoals,
      goalVotes,
      'urgency',
      'importance'
    )
  }
  // urgency x importance
  else if (useRouteMatch({ path: priorityMenuItems[1][1], exact: true })) {
    goalLists = getSortedAveragesGoalLists(
      allGoals,
      goalVotes,
      'impact',
      'effort'
    )
  }
  // uncategorized
  else if (useRouteMatch({ path: priorityMenuItems[6][1], exact: true })) {
    goalLists = allGoals.filter(goal => {
      // if there are no Votes, this Goal is "uncategorized"
      return !goalVotes.find(gv => gv.goal_address === goal.address)
    })
  }

  return (
    <div className='priority-view-wrapper'>
      <IndentedTreeView goalTrees={goalTrees} />
      <div className='priority-menu-wrapper'>
        {priorityMenuItems.map(([menuTitle, menuSlug]) => {
          return (
            <PriorityMenuItem
              key={menuSlug}
              title={menuTitle}
              slug={menuSlug}
            />
          )
        })}
      </div>
      <Switch>
        <Route exact path={priorityMenuItems[0][1]}>
          <UrgencyImportanceQuadrants goalLists={goalLists} />
        </Route>
        <Route exact path={priorityMenuItems[1][1]}>
          <ImpactEffortQuadrants goalLists={goalLists} />
        </Route>
        <Route exact path={priorityMenuItems[6][1]}>
          <PriorityQuadrant
            title='uncategorized'
            titleClassname='bottom-left'
            goals={goalLists}
          />
        </Route>
      </Switch>
    </div>
  )
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
  const allGoals = Object.values(state.goals)

  // CONSTRUCT TREES FOR THE INDENTED NAV TREE VIEW
  const edges = Object.values(state.edges)
  const allGoalAddresses = allGoals.map(goal => goal.address)
  // find the Goal objects without parent Goals
  // since they will sit at the top level
  const noParentsAddresses = allGoalAddresses.filter(goalAddress => {
    return !edges.find(edge => edge.child_address === goalAddress)
  })
  // recursively calls itself
  // so that it constructs the full sub-tree for each root Goal
  function getGoal(goalAddress) {
    return {
      ...state.goals[goalAddress],
      children: edges
        // find the edges indicating the children of this goal
        .filter(edge => edge.parent_address === goalAddress)
        // actually nest the children Goals, recurse
        .map(edge => getGoal(edge.child_address)),
    }
  }
  // start with the root Goals, and recurse down to their children
  const goalTrees = noParentsAddresses.map(getGoal)

  return {
    goalTrees,
    allGoals,
    goalVotes: Object.values(state.goalVotes),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriorityView)
