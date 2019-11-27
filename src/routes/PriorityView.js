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

function UrgencyImportanceQuadrants() {
  return <div className="priority-quadrants">
    <div className="priority-quadrants-row">
      <PriorityQuadrant title="urgent & important" titleClassname="urgent-important" />
      <div className="priority-quadrants-divider"></div>
      <PriorityQuadrant title="less urgent & important" titleClassname="less-urgent-important" />
    </div>
    <div className="priority-quadrants-row">
      <PriorityQuadrant title="urgent & less important" titleClassname="urgent-less-important" />
      <div className="priority-quadrants-divider"></div>
      <PriorityQuadrant title="less urgent & less important" titleClassname="less-urgent-less-important" />
    </div>
  </div>
}

function PriorityView({ goalTree }) {

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
      <Route exact path={priorityMenuItems[0][1]} component={UrgencyImportanceQuadrants} />
    </Switch>
  </div>
}

PriorityView.propTypes = {

}
function mapDispatchToProps(dispatch) {
  return {}
}
function mapStateToProps(state) {
  return {
    goalTree: Object.values(state.goals)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriorityView)
