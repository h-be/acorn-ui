import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createWhoami } from '../../who-am-i/actions'
import ProfileEditForm from '../ProfileEditForm/ProfileEditForm'
import './CreateProfilePage.css'

function CreateProfilePage({ agentAddress, createWhoami }) {
  const titleText = 'First, let\'s set up your profile on Acorn.'
  const subText = 'You\'ll be able to edit them later in your Profile Settings.'
  const submitText = 'Ready to Start'
  const canClose = false

  return <div className="create_profile_page">
    <div className="profile_create_wrapper">
      <ProfileEditForm
        onSubmit={createWhoami}
        whoami={null}
        {...{ canClose, titleText, subText, submitText, agentAddress }} />
    </div>
    <div className="create_profile_splash_image" />
  </div>
}


function mapDispatchToProps(dispatch) {
  return {
    createWhoami: (profile) => {
      return dispatch(createWhoami.create({ profile }))
    }
  }
}

function mapStateToProps(state) {
  return {
    agentAddress: state.agentAddress
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfilePage)