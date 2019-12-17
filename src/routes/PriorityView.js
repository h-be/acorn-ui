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

function UrgencyImportanceQuadrants({ goalLists }) {
  return (
    <div className='priority-quadrants-wrapper'>
      <div className='priority-quadrands-content'>
        <div className='priority-quadrants-row'>
          <PriorityQuadrant
            title='urgent & important'
            titleClassname='urgent-important'
            goals={goalLists[0]}
          />
          <div className='priority-quadrants-vertical-divider'></div>
          <PriorityQuadrant
            title='less urgent & important'
            titleClassname='less-urgent-important'
            goals={goalLists[1]}
          />
        </div>
        <div className='priority-quadrants-horizontal-divider'></div>
        <div className='priority-quadrants-row'>
          <PriorityQuadrant
            title='urgent & less important'
            titleClassname='urgent-less-important'
            goals={goalLists[2]}
          />
          <div className='priority-quadrants-vertical-divider'></div>
          <PriorityQuadrant
            title='less urgent & less important'
            titleClassname='less-urgent-less-important'
            goals={goalLists[3]}
          />
        </div>
      </div>
    </div>
  )
}

function PriorityView({ goalTrees, goalLists }) {
  const { url } = useRouteMatch()

  const priorityMenuItems = [
    ['Urgency x Importance', `${url}`], // default
    ['Impact x Effort', `${url}/impact-effort`],
    ['Urgency', `${url}/urgency`],
    ['Importance', `${url}/importance`],
    ['Impact', `${url}/impact`],
    ['Uncategorized', `${url}/uncategorized`],
  ]

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
        <Route
          exact
          path={priorityMenuItems[0][1]}
          render={() => <UrgencyImportanceQuadrants goalLists={goalLists} />}
        />
      </Switch>
    </div>
  )
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
    goalLists: [allGoals, allGoals, allGoals, allGoals], // TODO: change this
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriorityView)
