import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect, HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'

import { updateWhoami, updateStatus } from '../who-am-i/actions'

// import components here
import Header from '../components/Header/Header'
import ProfileEditForm from '../components/ProfileEditForm/ProfileEditForm'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import Footer from '../components/Footer/Footer'
import Modal from '../components/Modal/Modal'
import Preferences from '../components/Preferences/Preferences'

// import new routes here
import IntroScreen from '../components/IntroScreen/IntroScreen'
import CreateProfilePage from './CreateProfilePage/CreateProfilePage'
import Dashboard from './Dashboard/Dashboard'
import ProjectView from './ProjectView/ProjectView'
import selectEntryPoints from '../projects/entry-points/select'
import ErrorBoundaryScreen from '../components/ErrorScreen/ErrorScreen'

function App(props) {
  const {
    activeEntryPoints,
    projectName,
    agentAddress,
    whoami, // .entry and .address
    updateWhoami,
  } = props
  const [showProfileEditForm, setShowProfileEditForm] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)

  const onProfileSubmit = profile => {
    updateWhoami(profile, whoami.address)
    setShowProfileEditForm(false)
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
          <Route path='/' render={() => <Redirect to='/dashboard' />} />
        </Switch>
        {agentAddress && (
          <Header
            activeEntryPoints={activeEntryPoints}
            projectName={projectName}
            whoami={whoami}
            updateStatus={props.updateStatus}
            setShowProfileEditForm={setShowProfileEditForm}
            setShowPreferences={setShowPreferences}
          />
        )}
        {/* This will only show when 'active' prop is true */}
        {/* Modal for Profile Settings */}
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
        {/* Modal for Preferences */}
        <Modal
          white
          active={showPreferences}
          onClose={() => setShowPreferences(false)}>
          <Preferences />
        </Modal>
        {!agentAddress && <LoadingScreen />}
        {agentAddress && !whoami && <Redirect to='/intro' />}
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
    updateWhoami: (profile, address) => {
      return dispatch(updateWhoami.create({ profile, address }))
    },
    updateStatus: status => {
      return dispatch(updateStatus.create({ status }))
    },
  }
}

function mapStateToProps(state) {
  const {
    ui: { activeProject, activeEntryPoints },
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
    activeEntryPoints: activeEntryPointsObjects,
    projectName,
    whoami: state.whoami,
    agentAddress: state.agentAddress,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
