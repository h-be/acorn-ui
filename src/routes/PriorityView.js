import React from 'react'
import {
  NavLink,
  useRouteMatch,
  Switch,
  Route
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './PriorityView.css'
import PriorityQuadrant from '../components/PriorityQuadrant/PriorityQuadrant'

function PriorityMenuItem({ title, slug }) {
  return <NavLink exact to={slug} className="priority-menu-item" activeClassName="active">
    {title}
  </NavLink>
}

function UrgencyImportanceQuadrants({ goalLists }) {
  return <div className="priority-quadrants-wrapper">
    <div className="priority-quadrands-content">
      <div className="priority-quadrants-row">
        <PriorityQuadrant title="urgent & important" titleClassname="urgent-important" goals={goalLists[0]} />
        <div className="priority-quadrants-vertical-divider"></div>
        <PriorityQuadrant title="less urgent & important" titleClassname="less-urgent-important" goals={goalLists[1]} />
      </div>
      <div className="priority-quadrants-horizontal-divider"></div>
      <div className="priority-quadrants-row">
        <PriorityQuadrant title="urgent & less important" titleClassname="urgent-less-important" goals={goalLists[2]} />
        <div className="priority-quadrants-vertical-divider"></div>
        <PriorityQuadrant title="less urgent & less important" titleClassname="less-urgent-less-important" goals={goalLists[3]} />
      </div>
    </div>
  </div>
}

function PriorityView({ goalTree, goalLists }) {

  const { url } = useRouteMatch()

  const priorityMenuItems = [
    ['Urgency x Importance', `${url}`], // default
    ['Impact x Effort', `${url}/impact-effort`],
    ['Urgency', `${url}/urgency`],
    ['Importance', `${url}/importance`],
    ['Impact', `${url}/impact`],
    ['Uncategorized', `${url}/uncategorized`]
  ]

  return <div className="priority-view-wrapper">
    <div className="indented-view-wrapper">
      indented tree view
      {goalTree.map((goal) => {
        return <p>{goal.content}</p>
      })}
    </div>
    <div className="priority-menu-wrapper">
      {priorityMenuItems.map(([menuTitle, menuSlug]) => {
        return <PriorityMenuItem key={menuSlug} title={menuTitle} slug={menuSlug} />
      })}
    </div>
    <Switch>
      <Route exact path={priorityMenuItems[0][1]} render={() => <UrgencyImportanceQuadrants goalLists={goalLists} />} />
    </Switch>
  </div>
}

PriorityView.propTypes = {

}
function mapDispatchToProps(dispatch) {
  return {}
}
function mapStateToProps(state) {
  const test = Object.values(state.goals)
  return {
    goalTree: Object.values(state.goals),
    goalLists: [test, test, test, test] // TODO: change this
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriorityView)
