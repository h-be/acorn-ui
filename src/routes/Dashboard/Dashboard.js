import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import './Dashboard.css'
import Icon from '../../components/Icon/Icon'

import './DashboardListProject.css'

import Avatar from '../../components/Avatar/Avatar'
import CreateProjectModal from '../../components/CreateProjectModal/CreateProjectModal'
import JoinProjectModal from '../../components/JoinProjectModal/JoinProjectModal'
import InviteMembersModal from '../../components/InviteMembersModal/InviteMembersModal'
// import new modals here

import {
  createProjectDna,
  createProjectInstance,
  fetchProjectsDnas,
  fetchProjectsInstances,
  joinProject,
} from '../../projects/actions'

function DashboardListProject({ project, setShowInviteMembersModal }) {
  const [showEntryPoints, setShowEntryPoints] = useState(false)
  return (
    <div className='dashboard-list-project-wrapper'>
      <div className='dashboard-list-project'>
        <NavLink to={`/board/map`} className='dashboard-list-project-image'>
          <img src={project.image} />
        </NavLink>
        <div className='dashboard-list-project-content'>
          <NavLink to={`/board/map`} className='dashboard-list-project-name'>
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
                first_name={member.first_name}
                last_name={member.last_name}
                avatar_url={member.avatar_url}
                small
              />
            ))}
          </div>
          <div
            className='dashboard-invite-members-button'
            onClick={() => setShowInviteMembersModal(true)}
            I>
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

function Dashboard({ projects, createProject, joinProject }) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showInviteMembersModal, setShowInviteMembersModal] = useState(false)
  // add new modal state managers here

  const onCreateProject = project => {
    createProject(project)
  }

  const onJoinProject = projectSecret => {}

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
        showModal={showInviteMembersModal}
        onClose={() => setShowInviteMembersModal(false)}
      />
      {/* add new modals here */}
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    createProject: project => {
      // .then and add the metadata
      const someNewDnaId = '1234newid' + Math.random()
      return dispatch(createProjectDna.create(someNewDnaId))
        .then(() => {
          return dispatch(
            // TODO: don't use project.name here, generate something fresh
            createProjectInstance.create(project.name, someNewDnaId)
          )
        })
        .then(() => {
          dispatch(fetchProjectsDnas.create({}))
          dispatch(fetchProjectsInstances.create({}))
        })
    },
    joinProject: secret => {
      // joinProject
      // return dispatch(closeExpandedView())
    },
  }
}

function mapStateToProps(state) {
  return {
    projects: Object.keys(state.projects.instances).map(instanceId => ({
      address: 'abcd',
      name: instanceId,
      members: [{ first_name: 'Harry', last_name: 'Potter' }],
      entryPoints: ['e'],
      image: 'https://via.placeholder.com/68',
    })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
