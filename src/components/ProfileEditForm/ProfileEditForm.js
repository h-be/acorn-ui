import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './ProfileEditForm.css'
import Button from '../Button/Button'
import ValidatingFormInput from '../ValidatingFormInput/ValidatingFormInput'
import Avatar from '../Avatar/Avatar'
import Icon from '../Icon'

function ProfileEditForm({ onSubmit, onClose, agentAddress, whoami, titleText, subText, submitText, canClose }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [handle, setHandle] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const innerOnSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      first_name: firstName,
      last_name: lastName,
      avatar_url: avatarUrl,
      address: agentAddress,
      handle
    })
  }

  useEffect(() => {
    if (whoami) {
      setFirstName(whoami.first_name)
      setLastName(whoami.last_name)
      setHandle(whoami.handle)
      setAvatarUrl(whoami.avatar_url)
    }
  }, [whoami])

  const usernameHelp = "Choose something easy for your teammates to use and recall. Avoid space and @."

  return <div className="profile_edit_form">
    {canClose && <Icon onClick={onClose} name="x.svg" size="small" className="close_icon" />}
    <h1>{titleText}</h1>
    <h2>{subText}</h2>
    <form onSubmit={innerOnSubmit}>
      <div className="row">
        <ValidatingFormInput value={firstName} onChange={setFirstName} label="First Name" placeholder="Harry" />
        <div style={{ flex: .1 }} />
        <ValidatingFormInput value={lastName} onChange={setLastName} label="Last Name" placeholder="Potter" />
      </div>
      <div className="row halfSize">
        <ValidatingFormInput value={handle} onChange={setHandle} label="Username" helpText={usernameHelp} placeholder="harrypotter" withAtSymbol />
      </div>
      <div className="row">
        <ValidatingFormInput value={avatarUrl} onChange={setAvatarUrl} label="Profile Picture" placeholder="Paste in your profile picture URL here" />
        <div className="profile_edit_form_avatar">
          <Avatar avatar_url={avatarUrl} large />
        </div>
      </div>
      <div className="row">
        <ValidatingFormInput value={agentAddress} readOnly label="Your Public Key" />
      </div>
    </form>
    <Button onClick={innerOnSubmit} text={submitText} />
  </div>
}

ProfileEditForm.propTypes = {
  agentAddress: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  whoami: PropTypes.shape({
    address: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    handle: PropTypes.string,
    avatar_url: PropTypes.string
  }),
  titleText: PropTypes.string,
  subText: PropTypes.string,
  submitText: PropTypes.string,
  canClose: PropTypes.bool
}

export default ProfileEditForm