import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect, HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'

import { updateWhoami } from '../who-am-i/actions'
import { setNavigationPreference } from '../local-preferences/actions'

// import components here
import Header from '../components/Header/Header'
import ProfileEditForm from '../components/ProfileEditForm/ProfileEditForm'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import Footer from '../components/Footer/Footer'
import Modal from '../components/Modal/Modal'
import Preferences from '../components/Preferences/Preferences'
import UpdatePromptModal from '../components/UpdatePromptModal/UpdatePromptModal'

// import new routes here
import CreateProfilePage from './CreateProfilePage/CreateProfilePage'
import Dashboard from './Dashboard/Dashboard'
import ProjectView from './ProjectView/ProjectView'
import RunUpdate from './RunUpdate/RunUpdate'

import IntroScreen from '../components/IntroScreen/IntroScreen'
import selectEntryPoints from '../projects/entry-points/select'
import ErrorBoundaryScreen from '../components/ErrorScreen/ErrorScreen'

function App(props) {
  const {
    activeEntryPoints,
    projectName,
    agentAddress,
    whoami, // .entry and .address
    hasFetchedForWhoami,
    updateWhoami,
    navigationPreference,
    setNavigationPreference,
  } = props
  const [showProfileEditForm, setShowProfileEditForm] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [showUpdatePromptModal, setShowUpdatePromptModal] = useState(false)

  const onProfileSubmit = async profile => {
    await updateWhoami(profile, whoami.address)
    setShowProfileEditForm(false)
  }
  const updateStatus = async statusString => {
    await updateWhoami(
      {
        ...whoami.entry,
        status: statusString,
      },
      whoami.address
    )
  }

  const titleText = 'Profile Settings'
  const subText = ''
  const submitText = 'Save Changes'

  return (
    <ErrorBoundaryScreen>
      <Router>
        <Switch>
          {/* Add new routes in here */}
          <Route path='/intro' component={IntroScreen} />
          <Route path='/register' component={CreateProfilePage} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/project/:projectId' component={ProjectView} />
          <Route path='/run-update' component={RunUpdate} />
          <Route path='/' render={() => <Redirect to='/dashboard' />} />
        </Switch>
        {agentAddress && (
          <Header
            activeEntryPoints={activeEntryPoints}
            projectName={projectName}
            whoami={whoami}
            updateStatus={updateStatus}
            setShowProfileEditForm={setShowProfileEditForm}
            setShowPreferences={setShowPreferences}
          />
        )}
        {/* This will only show when 'active' prop is true */}
        {/* Profile Settings Modal */}
        <Modal
          white
          active={showProfileEditForm}
          onClose={() => setShowProfileEditForm(false)}>
          <ProfileEditForm
            onSubmit={onProfileSubmit}
            whoami={whoami ? whoami.entry : null}
            {...{ titleText, subText, submitText, agentAddress }}
          />
        </Modal>
        {/* Preferences Modal */}
        <Preferences
          navigation={navigationPreference}
          setNavigationPreference={setNavigationPreference}
          showPreferences={showPreferences}
          setShowPreferences={setShowPreferences}
        />
        {/* Update Prompt Modal */}
        <UpdatePromptModal
          showUpdatePromptModal={showUpdatePromptModal}
          setShowUpdatePromptModal={setShowUpdatePromptModal}
        />
        {/* Loading Screen if no user agent */}
        {!agentAddress && <LoadingScreen />}
        {agentAddress && hasFetchedForWhoami && !whoami && (
          <Redirect to='/intro' />
        )}
        {agentAddress && whoami && <Footer />}
      </Router>
    </ErrorBoundaryScreen>
  )
}

App.propTypes = {
  projectName: PropTypes.string,
  agentAddress: PropTypes.string,
  whoami: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    handle: PropTypes.string,
    avatar_url: PropTypes.string,
    address: PropTypes.string,
  }),
  updateWhoami: PropTypes.func,
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setNavigationPreference: preference => {
      return dispatch(setNavigationPreference(preference))
    },
  }
}

function mapStateToProps(state) {
  const {
    ui: {
      hasFetchedForWhoami,
      activeProject,
      activeEntryPoints,
      localPreferences: { navigation },
    },
    cells: { profiles: profilesCellIdString },
  } = state
  // defensive coding for loading phase
  const activeProjectMeta = state.projects.projectMeta[activeProject] || {}
  const projectName = activeProjectMeta.name || ''

  const allProjectEntryPoints = activeProject
    ? selectEntryPoints(state, activeProject)
    : []
  const activeEntryPointsObjects = activeEntryPoints
    .map(address => {
      return allProjectEntryPoints.find(
        entryPoint => entryPoint.address === address
      )
    })
    // cut out invalid ones
    .filter(e => e)

  return {
    profilesCellIdString,
    activeEntryPoints: activeEntryPointsObjects,
    projectName,
    whoami: state.whoami,
    hasFetchedForWhoami,
    agentAddress: state.agentAddress,
    navigationPreference: navigation,
  }
}

function mergeProps(stateProps, dispatchProps, _ownProps) {
  const { profilesCellIdString } = stateProps
  const { dispatch } = dispatchProps
  return {
    ...stateProps,
    ...dispatchProps,
    updateWhoami: (entry, address) => {
      return dispatch(
        updateWhoami.create({
          payload: { entry, address },
          cellIdString: profilesCellIdString,
        })
      )
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App)
