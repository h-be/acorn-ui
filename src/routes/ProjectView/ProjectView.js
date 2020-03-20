import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import MapView from './MapView/MapView'
import PriorityView from './PriorityView/PriorityView'

import { setActiveProject } from '../../active-project/actions'
import { fetchProjectMeta } from '../../projects/project-meta/actions'
import { fetchMembers } from '../../projects/members/actions'
import { fetchGoals } from '../../projects/goals/actions'
import { fetchEdges } from '../../projects/edges/actions'
import { fetchGoalMembers } from '../../projects/goal-members/actions'
import { fetchGoalComments } from '../../projects/goal-comments/actions'
import { fetchGoalVotes } from '../../projects/goal-votes/actions'

function ProjectViewInner({
  projectId,
  setActiveProject,
  fetchProjectMeta,
  fetchMembers,
  fetchGoals,
  fetchEdges,
  fetchGoalMembers,
  fetchGoalVotes,
  fetchGoalComments,
}) {
  useEffect(() => {
    // pushes this new projectId into the store/state
    setActiveProject(projectId)
    fetchProjectMeta()
    fetchMembers()
    fetchGoals()
    fetchEdges()
    fetchGoalMembers()
    fetchGoalVotes()
    fetchGoalComments()
  }, [projectId])

  return (
    <Switch>
      <Route path='/project/:projectId/map' component={MapView} />
      <Route path='/project/:projectId/priority' component={PriorityView} />
      <Route exact path='/project/:projectId' component={ProjectRedirect} />
    </Switch>
  )
}

function ProjectRedirect() {
  const { projectId } = useParams()
  return <Redirect to={`/project/${projectId}/map`} />
}

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  const { projectId } = ownProps
  return {
    setActiveProject: () => dispatch(setActiveProject(projectId)),
    fetchProjectMeta: () => dispatch(fetchProjectMeta(projectId).create({})),
    fetchMembers: () => dispatch(fetchMembers(projectId).create({})),
    fetchGoals: () => dispatch(fetchGoals(projectId).create({})),
    fetchEdges: () => dispatch(fetchEdges(projectId).create({})),
    fetchGoalMembers: () => dispatch(fetchGoalMembers(projectId).create({})),
    fetchGoalVotes: () => dispatch(fetchGoalVotes(projectId).create({})),
    fetchGoalComments: () => dispatch(fetchGoalComments(projectId).create({})),
  }
}

const ProjectView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectViewInner)

function ProjectViewWrapper() {
  const { projectId } = useParams()
  return <ProjectView projectId={projectId} />
}

export default ProjectViewWrapper
