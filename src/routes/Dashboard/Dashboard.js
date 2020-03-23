import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import './Dashboard.css'
import Icon from '../../components/Icon/Icon'

import './DashboardListProject.css'

import { passphraseToUuid } from '../../secrets'
import Avatar from '../../components/Avatar/Avatar'
import CreateProjectModal from '../../components/CreateProjectModal/CreateProjectModal'
import JoinProjectModal from '../../components/JoinProjectModal/JoinProjectModal'
import InviteMembersModal from '../../components/InviteMembersModal/InviteMembersModal'
// import new modals here

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

function DashboardListProject({ project, setShowInviteMembersModal }) {
  const [showEntryPoints, setShowEntryPoints] = useState(false)
  return (
    <div className='dashboard-list-project-wrapper'>
      <div className='dashboard-list-project'>
        <NavLink
          to={`/project/${project.instanceId}`}
          className='dashboard-list-project-image'>
          <div
            className='dashboard-list-project-image-bg'
            style={{ backgroundImage: `url(${project.image})` }}
          />
        </NavLink>
        <div className='dashboard-list-project-content'>
          <NavLink
            to={`/project/${project.instanceId}`}
            className='dashboard-list-project-name'>
            {project.name}
          </NavLink>
          <div className='dashboard-list-project-member-count'>
            {project.members.length} member
            {project.members.length > 1 ? 's' : ''}
          </div>
        </div>

        <div className='dashboard-list-project-members'>
          <div className='dashboard-list-project-member-list'>
            {project.members.map(member => (
              <Avatar
                key={member.address}
                first_name={member.first_name}
                last_name={member.last_name}
                avatar_url={member.avatar_url}
                small
              />
            ))}
          </div>
          <div
            className='dashboard-invite-members-button'
            onClick={() => setShowInviteMembersModal(project.passphrase)}>
            <Icon name='plus.svg' size='very-small' />
            Invite members
          </div>
        </div>
      </div>
      <div className='dashboard-list-project-entry-points'>
        {/* only allow expanding entry points list if there are some */}
        {project.entryPoints.length > 0 && (
          <div
            className='dashboard-list-project-entry-point-button'
            onClick={() => setShowEntryPoints(!showEntryPoints)}>
            {/*<img className='entry-point-button-image' src='img/door-open.png' />*/}
            {project.entryPoints.length} entry point
            {project.members.length === 1 ? '' : 's'}
            <Icon
              name='line-angle-down.svg'
              size='very-small'
              className={`grey ${showEntryPoints ? 'active' : ''}`}
            />
          </div>
        )}
        {showEntryPoints && (
          <div className='dashboard-list-project-entry-point-expanded'>
            {project.entryPoints.map(entryPoint => {
              return (
                <div className='entry-point-item'>
                  <div className='entry-point-icon'></div>
                  <div clasName='entry-point-name'>
                    We have released Acorn 4.0.0
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function Dashboard({
  agentAddress,
  instances,
  projects,
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
      // TODO: also fetch entry points
    })
  }, [JSON.stringify(instances)])

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

  return (
    <>
      <div className='dashboard-background'>
        <div className='dashboard-left-menu'>
          <div className='dashboard-left-menu-item'>
            <Icon name='folder.svg' size='very-small' className='grey' />
            My projects
          </div>
          <div className='dashboard-left-menu-item'>
            <Icon name='setting.svg' size='very-small' className='grey' />
            Settings
          </div>
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
            <div className='my-projects-header-sorting'>Sort by</div>
          </div>
          <div className='my-projects-content'>
            {projects.map(project => (
              <DashboardListProject
                project={project}
                setShowInviteMembersModal={setShowInviteMembersModal}
              />
            ))}
            {!hasProjects && (
              <div className='dashboard-empty-state'>
                <div className='dashboard-empty-state-image'></div>
                <div className='dashboard-empty-state-heading'>
                  Let's get started!
                </div>
                <div className='dashboard-empty-state-description'>
                  You currently have no projects. Start by
                  <a
                    className='description-link'
                    onClick={() => setShowCreateModal(true)}>
                    {' '}
                    creating a new project{' '}
                  </a>
                  or{' '}
                  <a
                    className='description-link'
                    onClick={() => setShowJoinModal(true)}>
                    {' '}
                    joining an existing one
                  </a>
                  .
                </div>
              </div>
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

function addDnaAndIntance(dispatch, passphrase) {
  const random = Math.random()
  const dnaId = `_acorn_projects_dna_${random}`
  const instanceId = `_acorn_projects_instance_${random}`
  const uuid = passphraseToUuid(passphrase)
  return dispatch(createProjectDna.create(dnaId, uuid))
    .then(() => dispatch(createProjectInstance.create(instanceId, dnaId)))
    .then(() => dispatch(startInstance.create(instanceId)))
    .then(() =>
      dispatch(addInstanceToInterface.create(instanceId)).catch(error => {
        // addInstanceToInterface will trigger a refresh of the websocket connection, as it shuts down and restarts
        // swallow the error if it is the to-be-expected timeout from this call
        return error.startsWith('Timeout occurred during ws call.')
          ? Promise.resolve()
          : Promise.reject(new Error(error))
      })
    )
    .then(() => ({
      dnaId,
      instanceId,
      uuid,
    }))
}

function mapDispatchToProps(dispatch) {
  return {
    // TODO: add fetch entry points here too
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
      return {
        ...project,
        // TODO: better placeholder
        image: project.image || 'https://via.placeholder.com/68',
        instanceId: instanceId,
        members: memberProfiles,
        // TODO: real entry points
        entryPoints: ['e'],
      }
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
