import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import './Dashboard.css'
import Icon from '../../components/Icon/Icon'
import DashboardEmptyState from '../../components/DashboardEmptyState/DashboardEmptyState'

import { passphraseToUuid } from '../../secrets'

import CreateProjectModal from '../../components/CreateProjectModal/CreateProjectModal'
import JoinProjectModal from '../../components/JoinProjectModal/JoinProjectModal'
import InviteMembersModal from '../../components/InviteMembersModal/InviteMembersModal'
// import new modals here

import { fetchEntryPoints } from '../../projects/entry-points/actions'
import { fetchMembers } from '../../projects/members/actions'
import {
  createProjectMeta,
  fetchProjectMeta,
} from '../../projects/project-meta/actions'
import {
  createProjectDna,
  createProjectInstance,
  removeProjectInstance,
  addInstanceToInterface,
  startInstance,
  fetchProjectsInstances,
} from '../../projects/conductor-admin/actions'
import selectEntryPoints from '../../projects/entry-points/select'

import DashboardListProject from './DashboardListProject'

function Dashboard({
  agentAddress,
  instances,
  projects,
  fetchEntryPoints,
  fetchMembers,
  fetchProjectMeta,
  createProject,
  joinProject,
}) {
  // instances is an array of instanceId strings
  useEffect(() => {
    instances.forEach(instanceId => {
      fetchProjectMeta(instanceId)
      fetchMembers(instanceId)
      fetchEntryPoints(instanceId)
    })
  }, [JSON.stringify(instances)])

  // created_at, name
  const [selectedSort, setSelectedSort] = useState('created_at')
  const [showSortPicker, setShowSortPicker] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  // call set for this one with the actual passphrase to render inside
  const [showInviteMembersModal, setShowInviteMembersModal] = useState(null)
  // add new modal state managers here

  const onCreateProject = (project, passphrase) => {
    createProject(agentAddress, project, passphrase)
  }

  const onJoinProject = passphrase => joinProject(passphrase)

  const hasProjects = projects.length > 0 // write 'false' if want to see Empty State

  const setSortBy = sortBy => () => {
    setSelectedSort(sortBy)
    setShowSortPicker(false)
  }

  let sortedProjects
  if (selectedSort === 'created_at') {
    // sort most recent first, oldest last
    sortedProjects = projects.sort((a, b) => b.created_at - a.created_at)
  } else if (selectedSort === 'name') {
    // sort alphabetically ascending
    sortedProjects = projects.sort((a, b) => {
      return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    })
  }

  return (
    <>
      <div className='dashboard-background'>
        <div className='dashboard-left-menu'>
          <NavLink to='/dashboard' className='dashboard-left-menu-item'>
            <Icon name='folder.svg' size='very-small' className='grey' />
            My projects
          </NavLink>
          <NavLink
            to='/settings'
            className='dashboard-left-menu-item feature-in-development'>
            <Icon name='setting.svg' size='very-small' className='grey' />
            Settings
          </NavLink>
        </div>
        <div className='dashboard-my-projects'>
          <div className='my-projects-heading'>My projects</div>
          {/* dashboard header */}
          <div className='my-projects-header'>
            <div className='my-projects-header-buttons'>
              <div
                className='my-projects-button create-project-button'
                onClick={() => setShowCreateModal(true)}>
                Create a project
              </div>
              <div
                className='my-projects-button'
                onClick={() => setShowJoinModal(true)}>
                Join a project
              </div>
            </div>
            <div className='my-projects-sorting'>
              <div>Sort by</div>
              <div
                className='my-projects-sorting-selected'
                onClick={() => setShowSortPicker(!showSortPicker)}>
                {selectedSort === 'created_at' && 'Last Created'}
                {selectedSort === 'name' && 'Name'}
                <Icon
                  name='line-angle-down.svg'
                  size='very-small'
                  className={`grey ${showSortPicker ? 'active' : ''}`}
                />
              </div>
              <CSSTransition
                in={showSortPicker}
                timeout={100}
                unmountOnExit
                classNames='my-projects-sorting-select'>
                <ul className='my-projects-sorting-select'>
                  <li onClick={setSortBy('created_at')}>Last Created</li>
                  <li onClick={setSortBy('name')}>Name</li>
                </ul>
              </CSSTransition>
            </div>
          </div>
          <div className='my-projects-content'>
            {sortedProjects.map(project => (
              <DashboardListProject
                project={project}
                setShowInviteMembersModal={setShowInviteMembersModal}
              />
            ))}
            {!hasProjects && (
              <DashboardEmptyState
                onJoinClick={() => setShowJoinModal(true)}
                onCreateClick={() => setShowCreateModal(true)}
              />
            )}
          </div>
        </div>
      </div>
      <CreateProjectModal
        onCreateProject={onCreateProject}
        showModal={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
      <JoinProjectModal
        onJoinProject={onJoinProject}
        showModal={showJoinModal}
        onClose={() => setShowJoinModal(false)}
      />
      <InviteMembersModal
        passphrase={showInviteMembersModal}
        showModal={showInviteMembersModal}
        onClose={() => setShowInviteMembersModal(false)}
      />
      {/* add new modals here */}
    </>
  )
}

function timeoutOrReject(error) {
  // admin/instance/add and admin/interface/add_instance will trigger a refresh of the websocket connection, as it shuts down and restarts
  // swallow the error if it is the to-be-expected timeout from this call
  return error.startsWith('Timeout occurred during ws call.')
    ? Promise.resolve()
    : Promise.reject(new Error(error))
}

function addDnaAndIntance(dispatch, passphrase) {
  const random = Math.random()
  const dnaId = `_acorn_projects_dna_${random}`
  const instanceId = `_acorn_projects_instance_${random}`
  const uuid = passphraseToUuid(passphrase)

  return dispatch(createProjectDna.create(dnaId, uuid))
    .then(() =>
      dispatch(createProjectInstance.create(instanceId, dnaId)).catch(
        timeoutOrReject
      )
    )
    .then(() => dispatch(startInstance.create(instanceId)))
    .then(() =>
      dispatch(addInstanceToInterface.create(instanceId)).catch(timeoutOrReject)
    )
    .then(() => ({
      dnaId,
      instanceId,
      uuid,
    }))
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEntryPoints: instanceId => {
      return dispatch(fetchEntryPoints(instanceId).create({}))
    },
    fetchMembers: instanceId => {
      return dispatch(fetchMembers(instanceId).create({}))
    },
    fetchProjectMeta: instanceId => {
      return dispatch(fetchProjectMeta(instanceId).create({}))
    },
    createProject: (agentAddress, project, passphrase) => {
      // matches the createProjectMeta fn and type signature
      const projectMeta = {
        projectmeta: {
          ...project, // name and image
          passphrase,
          creator_address: agentAddress,
          created_at: Date.now(),
        },
      }
      return (
        addDnaAndIntance(dispatch, passphrase)
          .then(({ instanceId }) =>
            dispatch(createProjectMeta(instanceId).create(projectMeta))
          )
          // this will cause the eventual refetch of Project Members and Entry Points,
          // due to useEffect within Dashboard
          .then(() => dispatch(fetchProjectsInstances.create({})))
      )
      // .catch
    },
    joinProject: passphrase => {
      // joinProject
      // join a DNA
      // then try to get the project metadata
      // if that DOESN'T work, the attempt is INVALID
      // remove the instance again immediately
      // we can't remove the DNA itself, but that's fine
      return addDnaAndIntance(dispatch, passphrase).then(({ instanceId }) => {
        return dispatch(fetchProjectMeta(instanceId).create({})).catch(
          async e => {
            if (
              e &&
              e.Err &&
              e.Err.Internal &&
              e.Err.Internal === 'no project meta exists'
            ) {
              // remove the instance again immediately, let the resolver know we did this, by returning false
              await dispatch(removeProjectInstance.create(instanceId))
              return false
            } else {
              // some unintended error
              throw e
            }
          }
        )
      })
    },
  }
}

function mapStateToProps(state) {
  return {
    agentAddress: state.agentAddress,
    instances: Object.keys(state.projects.instances),
    projects: Object.keys(state.projects.projectMeta).map(instanceId => {
      const project = state.projects.projectMeta[instanceId]
      const members = state.projects.members[instanceId] || {}
      const memberProfiles = Object.keys(members).map(
        agentAddress => state.agents[agentAddress]
      )
      const entryPoints = selectEntryPoints(state, instanceId)
      return {
        ...project,
        image: project.image,
        instanceId: instanceId,
        members: memberProfiles,
        entryPoints,
      }
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
