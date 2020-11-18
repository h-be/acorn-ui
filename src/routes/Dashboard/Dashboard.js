import React, { useState, useEffect } from 'react'
import { cellIdToString } from 'connoropolous-hc-redux-middleware/build/main/lib/actionCreator'
import { CSSTransition } from 'react-transition-group'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import './Dashboard.css'
import Icon from '../../components/Icon/Icon'
import DashboardEmptyState from '../../components/DashboardEmptyState/DashboardEmptyState'

import CreateProjectModal from '../../components/CreateProjectModal/CreateProjectModal'
import JoinProjectModal from '../../components/JoinProjectModal/JoinProjectModal'
import InviteMembersModal from '../../components/InviteMembersModal/InviteMembersModal'
// import new modals here

import { PROJECTS_DNA_PATH } from '../../holochainConfig'
import { passphraseToUuid } from '../../secrets'
import { getAdminWs, getAgentPubKey } from '../../hcWebsockets'
import { fetchEntryPoints } from '../../projects/entry-points/actions'
import { fetchMembers } from '../../projects/members/actions'
import {
  createProjectMeta,
  fetchProjectMeta,
} from '../../projects/project-meta/actions'
import selectEntryPoints from '../../projects/entry-points/select'

import DashboardListProject from './DashboardListProject'
import { getProjectCellIdStrings } from '../../projectAppIds'
import { setProjectsCellIds } from '../../cells/actions'

function Dashboard({
  agentAddress,
  cells,
  projects,
  fetchEntryPoints,
  fetchMembers,
  fetchProjectMeta,
  createProject,
  joinProject,
}) {
  // cells is an array of cellId strings
  useEffect(() => {
    cells.forEach(cellId => {
      fetchProjectMeta(cellId)
      fetchMembers(cellId)
      fetchEntryPoints(cellId)
    })
  }, [JSON.stringify(cells)])

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
                key={project.cellId}
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

async function createProject(passphrase, projectMeta, dispatch) {
  // const random = Math.random()
  // const dnaId = `_acorn_projects_dna_${random}`
  // const cellId = `_acorn_projects_instance_${random}`
  const uuid = passphraseToUuid(passphrase)
  const app_id = uuid
  const adminWs = await getAdminWs()
  const agent_key = getAgentPubKey()
  if (!agent_key) {
    throw new Error(
      'Cannot create a new project because no AgentPubKey is known locally'
    )
  }
  // INSTALL
  const installedApp = await adminWs.installApp({
    agent_key,
    app_id,
    dnas: [
      {
        nick: uuid,
        path: PROJECTS_DNA_PATH,
        properties: { uuid },
      },
    ],
  })
  // ACTIVATE
  await adminWs.activateApp({ app_id })
  const cellIdString = cellIdToString(installedApp.cell_data[0][0])
  await dispatch(
    createProjectMeta.create({ cellIdString, payload: projectMeta })
  )
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEntryPoints: cellIdString => {
      return dispatch(fetchEntryPoints.create({ cellIdString, payload: null }))
    },
    fetchMembers: cellIdString => {
      return dispatch(fetchMembers.create({ cellIdString, payload: null }))
    },
    fetchProjectMeta: cellIdString => {
      return dispatch(fetchProjectMeta.create({ cellIdString, payload: null }))
    },
    createProject: async (agentAddress, project, passphrase) => {
      // matches the createProjectMeta fn and type signature
      const projectMeta = {
        ...project, // name and image
        passphrase,
        creator_address: agentAddress,
        created_at: Date.now(),
      }
      await createProject(passphrase, projectMeta, dispatch)
    },
    // joinProject: passphrase => {
    //   // joinProject
    //   // join a DNA
    //   // then try to get the project metadata
    //   // if that DOESN'T work, the attempt is INVALID
    //   // remove the instance again immediately
    //   // we can't remove the DNA itself, but that's fine
    //   return addDnaAndInstance(dispatch, passphrase).then(({ cellId }) => {
    //     const HIGH_TIMEOUT = 20000 // ms
    //     return dispatch(
    //       fetchProjectMeta(cellId).create({}, HIGH_TIMEOUT)
    //     ).catch(async e => {
    //       if (
    //         e &&
    //         e.Err &&
    //         e.Err.Internal &&
    //         e.Err.Internal === 'no project meta exists'
    //       ) {
    //         // remove the instance again immediately, let the resolver know we did this, by returning false
    //         await dispatch(removeProjectInstance.create(cellId))
    //         return false
    //       } else {
    //         dispatch(removeProjectInstance.create(cellId))
    //         // some unintended error
    //         throw e
    //       }
    //     })
    //   })
    // },
  }
}

function mapStateToProps(state) {
  return {
    agentAddress: state.agentAddress,
    cells: state.cells.projects,
    projects: Object.keys(state.projects.projectMeta).map(cellId => {
      const project = state.projects.projectMeta[cellId]
      const members = state.projects.members[cellId] || {}
      const memberProfiles = Object.keys(members).map(
        agentAddress => state.agents[agentAddress]
      )
      const entryPoints = selectEntryPoints(state, cellId)
      return {
        ...project,
        cellId,
        members: memberProfiles,
        entryPoints,
      }
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
