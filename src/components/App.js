
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ProfileEditForm from './ProfileEditForm/ProfileEditForm'
import GoalForm from './GoalForm'
import MultiEditBar from './MultiEditBar'
import HoverOverlay from './HoverOverlay'
import { createWhoami, updateWhoami } from '../who-am-i/actions'
import Header from './Header/Header'
import Options from './Zoom/Options'

function App(props) {
  const {
    agentAddress,
    hasSelection,
    hasHover,
    goalFormIsOpen,
    translate,
    scale,
    whoami, // .entry and .address
    showProfileCreateForm,
    createWhoami,
    updateWhoami
  } = props
  const transform = {
    transform: `matrix(${scale}, 0, 0, ${scale}, ${translate.x}, ${translate.y})`
  }
  const [showProfileEditForm, setShowProfileEditForm] = useState(false)

  const onProfileSubmit = (info) => {
    showProfileEditForm ? updateWhoami(info, whoami.address) : createWhoami(info)
    setShowProfileEditForm(false)
  }
  const titleText = showProfileEditForm ? 'Profile Settings' : 'First, let\'s set up your profile on Acorn.'
  const subText = showProfileEditForm ? '' : 'You\'ll be able to edit them later in your Profile Settings.'
  const submitText = showProfileEditForm ? 'Save Changes' : 'Ready to Start'
  const canClose = showProfileEditForm

  return (
    <div>
      <div className="fixed">{whoami && <Header whoami={whoami} setShowProfileEditForm={setShowProfileEditForm} />}</div>
      
      {(showProfileCreateForm || showProfileEditForm) &&
        <ProfileEditForm
          onSubmit={onProfileSubmit}
          onClose={() => setShowProfileEditForm(false)}
          whoami={whoami ? whoami.entry : null}
          {...{canClose, titleText, subText, submitText, agentAddress }} />}
       
      {hasSelection && <MultiEditBar />}
      <div className="transform-container" style={transform}>
        {goalFormIsOpen && <GoalForm />}
        {hasHover && <HoverOverlay />}
        <Options/>
      </div>
    </div>
  )
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
  showProfileEditForm: PropTypes.bool,
  createWhoami: PropTypes.func,
  updateWhoami: PropTypes.func
}

function mapDispatchToProps(dispatch) {
  return {
    createWhoami: (whoami) => {
      return dispatch(createWhoami.create({ profile: whoami }))
    },
    updateWhoami: (whoami, address) => {
      return dispatch(updateWhoami.create({ profile: whoami, address }))
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
    showProfileCreateForm: !state.whoami,
    agentAddress: state.agentAddress
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)