import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect, HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'

import { updateWhoami, updateStatus } from '../who-am-i/actions'
import Header from '../components/Header/Header'
import ProfileEditForm from '../components/ProfileEditForm/ProfileEditForm'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import Footer from '../components/Footer/Footer'
import Modal from '../components/Modal/Modal'

// import new routes here
import IntroScreen from '../components/IntroScreen/IntroScreen'
import CreateProfilePage from './CreateProfilePage/CreateProfilePage'
import Dashboard from './Dashboard/Dashboard'
import MapView from './MapView'
import PriorityView from './PriorityView'

function App(props) {
  const {
    agentAddress,
    whoami, // .entry and .address
    updateWhoami,
  } = props
  const [showProfileEditForm, setShowProfileEditForm] = useState(false)

  const onProfileSubmit = profile => {
    updateWhoami(profile, whoami.address)
    setShowProfileEditForm(false)
  }
  const titleText = 'Profile Settings'
  const subText = ''
  const submitText = 'Save Changes'

  return (
    <Router>
      <Switch>
        {/* Add new routes in here */}
        <Route path='/intro' component={IntroScreen} />
        <Route path='/register' component={CreateProfilePage} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/board/map' component={MapView} />
        <Route path='/board/priority' component={PriorityView} />
        <Route path='/' render={() => <Redirect to='/dashboard' />} />
      </Switch>
      {agentAddress && (
        <Header
          whoami={whoami}
          updateStatus={props.updateStatus}
          setShowProfileEditForm={setShowProfileEditForm}
        />
      )}
      {/* This will only show when 'active' prop is true */}
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
      {!agentAddress && <LoadingScreen />}
      {agentAddress && !whoami && <Redirect to='/intro' />}
      {agentAddress && whoami && <Footer />}
    </Router>
  )
}

App.propTypes = {
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
  return {
    whoami: state.whoami,
    agentAddress: state.agentAddress,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
