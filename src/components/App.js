
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './App.css'

import { updateWhoami } from '../who-am-i/actions'
import { openExpandedView, closeExpandedView } from '../expanded-view/actions'
import GoalForm from './GoalForm'
import MultiEditBar from './MultiEditBar'
import HoverOverlay from './HoverOverlay'
import Header from './Header/Header'
import CreateProfilePage from './CreateProfilePage/CreateProfilePage'
import ProfileEditForm from './ProfileEditForm/ProfileEditForm'
import LoadingScreen from './LoadingScreen/LoadingScreen'
import ExpandedViewMode from './ExpandedViewMode/ExpandedViewMode'

function App(props) {
  const {
    agentAddress,
    hasSelection,
    hasHover,
    goalFormIsOpen,
    translate,
    scale,
    whoami, // .entry and .address
    updateWhoami,
    showExpandedViewMode,
    openExpandedView,
    closeExpandedView
  } = props
  const transform = {
    transform: `matrix(${scale}, 0, 0, ${scale}, ${translate.x}, ${translate.y})`
  }
  const [showProfileEditForm, setShowProfileEditForm] = useState(false)

  const onProfileSubmit = (profile) => {
    updateWhoami(profile, whoami.address)
    setShowProfileEditForm(false)
  }
  const titleText = 'Profile Settings'
  const subText = ''
  const submitText = 'Save Changes'
  const canClose = true

  return (<>
    {agentAddress && <Header whoami={whoami} setShowProfileEditForm={setShowProfileEditForm} />}

    {showProfileEditForm &&
      <div className="profile_edit_wrapper">
        <ProfileEditForm
          onSubmit={onProfileSubmit}
          onClose={() => setShowProfileEditForm(false)}
          whoami={whoami ? whoami.entry : null}
          {...{ canClose, titleText, subText, submitText, agentAddress }} />
      </div>}

    {hasSelection && <MultiEditBar />}
    <div className="transform-container" style={transform}>
      {goalFormIsOpen && <GoalForm />}
      {hasHover && <HoverOverlay onExpandClick={openExpandedView} />}
    </div>

    {showExpandedViewMode && <ExpandedViewMode onClose={closeExpandedView} />}

    {agentAddress && !whoami && <CreateProfilePage />}
    {!agentAddress && <LoadingScreen />}
  </>)
}

App.propTypes = {
  hasSelection: PropTypes.bool.isRequired, // whether or not there are Goals selected
  hasHover: PropTypes.bool, // whether or not a Goal is hovered over
  goalFormIsOpen: PropTypes.bool.isRequired,
  translate: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  scale: PropTypes.number.isRequired,
  whoami: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    handle: PropTypes.string,
    avatar_url: PropTypes.string,
    address: PropTypes.string
  }),
  createWhoami: PropTypes.func,
  updateWhoami: PropTypes.func,
  showExpandedViewMode: PropTypes.bool.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    updateWhoami: (profile, address) => {
      return dispatch(updateWhoami.create({ profile, address }))
    },
    openExpandedView: (address) => {
      return dispatch(openExpandedView(address))
    },
    closeExpandedView: () => {
      return dispatch(closeExpandedView())
    }
  }
}

function mapStateToProps(state) {
  return {
    // map from an array type (the selectedGoals) to a simple boolean type
    hasSelection: state.ui.selection.selectedGoals.length > 0,
    hasHover: state.ui.hover.hoveredGoal && state.ui.hover.hoveredGoal !== state.ui.goalForm.editAddress,
    goalFormIsOpen: state.ui.goalForm.isOpen,
    translate: state.ui.viewport.translate,
    scale: state.ui.viewport.scale,
    whoami: state.whoami,
    agentAddress: state.agentAddress,
    showExpandedViewMode: state.ui.expandedView.isOpen
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)