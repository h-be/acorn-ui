import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './ProfileEditForm.css'
import Button from '../Button/Button'
import ValidatingFormInput from '../ValidatingFormInput/ValidatingFormInput'
import Avatar from '../Avatar/Avatar'

function ProfileEditForm({ onSubmit, whoami, titleText, subText, submitText, canClose }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [handle, setHandle] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const innerOnSubmit = (e) => {
    e.preventDefault()
    onSubmit()
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
    {canClose && <div>canClose</div>}
    <h1>{titleText}</h1>
    <h2>{subText}</h2>
    <form onSubmit={innerOnSubmit}>
      <div className="row">
        <ValidatingFormInput value={firstName} onChange={setFirstName} label="First Name" placeholder="Harry" />
        <div style={{ flex: .1 }} />
        <ValidatingFormInput value={lastName} onChange={setLastName} label="Last Name" placeholder="Potter" />
      </div>
      <div className="row halfSize">
        <ValidatingFormInput value={handle} onChange={setHandle} label="Username" helpText={usernameHelp} placeholder="harrypotter" />
      </div>
      <div className="row">
        <ValidatingFormInput value={avatarUrl} onChange={setAvatarUrl} label="Profile Picture" placeholder="Paste in your profile picture URL here" />
        <div className="profile_edit_form_avatar">
          <Avatar avatar_url={avatarUrl} medium />
        </div>
      </div>
      <div className="row">
        <ValidatingFormInput value={"HcSciGpYDHTaa5dmw583AO7Jy9kHz9K3gu6MtTsB8Nwbfe3y3hD8rOb9aj5B8za" || whoami.address} readOnly label="Your Public Key" />
      </div>
    </form>
    <Button onClick={innerOnSubmit} text={submitText} />
  </div>
}

ProfileEditForm.propTypes = {
  onSubmit: PropTypes.func,
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