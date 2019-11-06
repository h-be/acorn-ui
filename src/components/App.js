import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import UpperRightMenu from './UpperRightMenu/UpperRightMenu'
import ProfileEditForm from './ProfileEditForm/ProfileEditForm'
import GoalForm from './GoalForm'
import Help from './Help'
import MultiEditBar from './MultiEditBar'
import HoverOverlay from './HoverOverlay'

function App(props) {
  const { hasSelection, hasHover, goalFormIsOpen, translate, scale, whoami, showProfileEditForm } = props
  const transform = {
    transform: `matrix(${scale}, 0, 0, ${scale}, ${translate.x}, ${translate.y})`
  }

  const onProfileSubmit = () => {
    console.log('onProfileSubmit')
  }
  const titleText = 'First, let\'s set up your profile on Acorn.'
  const subText = 'You\'ll be able to edit them later in your Profile Settings.'
  const submitText = 'ready to start'
  const canClose = false

  return (
    <div>
      {whoami && <UpperRightMenu whoami={whoami} onProfileSettingsClick={() => {}} />}
      {showProfileEditForm && <ProfileEditForm onSubmit={onProfileSubmit} whoami={whoami} {...{canClose, titleText, subText, submitText }} />}
      <Help />
      {hasSelection && <MultiEditBar />}
      <div style={transform}>
        {goalFormIsOpen && <GoalForm />}
        {hasHover && <HoverOverlay />}
      </div>
    </div>
  )
}

App.propTypes = {
  hasSelection: PropTypes.bool.isRequired, // whether or not there are Goals selected
  hasHover: PropTypes.bool.isRequired, // whether or not a Goal is hovered over
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
  showProfileEditForm: PropTypes.bool
}

function mapStateToProps(state) {
  return {
    // map from an array type (the selectedGoals) to a simple boolean type
    hasSelection: state.ui.selection.selectedGoals.length > 0,
    hasHover: state.ui.hover.hoveredGoal && state.ui.hover.hoveredGoal !== state.ui.goalForm.editAddress,
    goalFormIsOpen: state.ui.goalForm.isOpen,
    translate: state.ui.viewport.translate,
    scale: state.ui.viewport.scale,
    whoami: state.whoami ? state.whoami.entry : {},
    showProfileEditForm: true // TODO
  }
}

export default connect(mapStateToProps)(App)
