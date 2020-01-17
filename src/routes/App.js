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

import CreateProfilePage from './CreateProfilePage/CreateProfilePage'
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
  const canClose = true

  return (
    <Router>
      <Switch>
        <Route path='/board/map' component={MapView} />
        <Route path='/board/priority' component={PriorityView} />
        <Route path='/register' component={CreateProfilePage} />
        <Route path='/' render={() => <Redirect to='/board/map' />} />
      </Switch>
      {agentAddress && (
        <Header
          whoami={whoami}
          updateStatus={props.updateStatus}
          setShowProfileEditForm={setShowProfileEditForm}
        />
      )}
      {showProfileEditForm && (
        <div className='profile_edit_wrapper'>
          <ProfileEditForm
            onSubmit={onProfileSubmit}
            onClose={() => setShowProfileEditForm(false)}
            whoami={whoami ? whoami.entry : null}
            {...{ canClose, titleText, subText, submitText, agentAddress }}
          />
        </div>
      )}
      {!agentAddress && <LoadingScreen />}
      {agentAddress && !whoami && <Redirect to='/register' />}
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
