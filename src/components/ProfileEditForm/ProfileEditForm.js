import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import PropTypes from 'prop-types'
import './ProfileEditForm.css'
import Button from '../Button/Button'
import ValidatingFormInput from '../ValidatingFormInput/ValidatingFormInput'
import Avatar from '../Avatar/Avatar'
import Icon from '../Icon/Icon'

function ProfileEditForm({
  onSubmit,
  onClose,
  agentAddress,
  whoami,
  titleText,
  subText,
  submitText,
  canClose,
}) {
  const [firstName, setFirstName] = useState('')
  const [isValidFistName, setIsValidFistName] = useState(true)
  const [isValidLastName, setIsValidLastName] = useState(true)
  const [isValidUserName, setIsValidUserName] = useState(true)

  const [lastName, setLastName] = useState('')
  const [handle, setHandle] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const innerOnSubmit = e => {
    e.preventDefault()
    if (isValidUserName && isValidFistName && isValidLastName) {
      onSubmit({
        first_name: firstName,
        last_name: lastName,
        status: 'Online',
        avatar_url: avatarUrl,
        address: agentAddress,
        handle,
      })
    }
  }

  useEffect(() => {
    if (whoami) {
      setFirstName(whoami.first_name)
      setLastName(whoami.last_name)
      setHandle(whoami.handle)
      setAvatarUrl(whoami.avatar_url)
    }
  }, [whoami])
  const userNames = useSelector(state =>
    Object.values(state.agents).map(agent => agent.handle)
  )

  if (
    !/^[A-Za-z0-9_]+$/i.test(handle) ||
    (whoami && handle != whoami.handle && userNames.includes(handle))
  ) {
    if (isValidUserName) {
      setIsValidUserName(false)
    }
  } else {
    if (!isValidUserName) {
      setIsValidUserName(true)
    }
  }
  if (!/^[A-Z]+$/i.test(firstName)) {
    if (isValidFistName) {
      setIsValidFistName(false)
    }
  } else {
    if (!isValidFistName) {
      setIsValidFistName(true)
    }
  }
  if (!/^[A-Z]+$/i.test(lastName)) {
    if (isValidLastName) {
      setIsValidLastName(false)
    }
  } else {
    if (!isValidLastName) {
      setIsValidLastName(true)
    }
  }

  const usernameHelp =
    'Choose something easy for your teammates to use and recall. Avoid space and @.'
  const avatarShow = avatarUrl || 'img/avatar_placeholder.png'

  return (
    <div className='profile_edit_form'>
      {canClose && (
        <Icon
          onClick={onClose}
          name='x_a3a3a3.svg'
          size='small-close'
          className='grey'
        />
      )}
      <div className='profile_edit_form_title'>
        <h1>{titleText}</h1>
        <h4>{subText}</h4>
      </div>
      <form onSubmit={innerOnSubmit}>
        <div className='row'>
          <ValidatingFormInput
            value={firstName}
            onChange={setFirstName}
            errorText={isValidFistName ? undefined : 'first name is no valid'}
            label='First Name'
            placeholder='Harry'
          />
          <div style={{ flex: 0.1 }} />
          <ValidatingFormInput
            value={lastName}
            onChange={setLastName}
            errorText={isValidLastName ? undefined : 'last name is no valid'}
            label='Last Name'
            placeholder='Potter'
          />
        </div>
        <div className='row'>
          <ValidatingFormInput
            value={handle}
            onChange={setHandle}
            label='Username'
            helpText={usernameHelp}
            errorText={isValidUserName ? undefined : 'Username is not valid'}
            placeholder='harrypotter'
            withAtSymbol
          />
        </div>
        <div className='row'>
          <ValidatingFormInput
            value={avatarUrl}
            onChange={setAvatarUrl}
            label='Profile Picture'
            placeholder='Paste in your profile picture URL here'
          />
          <div className='profile_edit_form_avatar'>
            <Avatar avatar_url={avatarShow} large />
          </div>
        </div>
        <div className='row'>
          <ValidatingFormInput
            value={agentAddress}
            readOnly
            label='Your Public Key'
          />
        </div>
      </form>
      <Button onClick={innerOnSubmit} text={submitText} />
    </div>
  )
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
    avatar_url: PropTypes.string,
  }),
  titleText: PropTypes.string,
  subText: PropTypes.string,
  submitText: PropTypes.string,
  canClose: PropTypes.bool,
}

export default ProfileEditForm
