import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import PropTypes from 'prop-types'
import './ProfileEditForm.css'
import Button from '../Button/Button'
import ValidatingFormInput from '../ValidatingFormInput/ValidatingFormInput'
import Avatar from '../Avatar/Avatar'
import Icon from '../Icon/Icon'
import ButtonWithPendingState from '../ButtonWithPendingState/ButtonWithPendingState'

const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

function ProfileEditForm({
  pending,
  pendingText,
  onSubmit,
  agentAddress,
  whoami,
  titleText,
  subText,
  submitText,
}) {
  const [firstName, setFirstName] = useState('')
  const [isValidFirstName, setisValidFirstName] = useState(true)
  const [isValidLastName, setIsValidLastName] = useState(true)
  const [isValidUserName, setIsValidUserName] = useState(true)
  const [errorUsername, setErrorUsername] = useState('')
  const [isValidAvatarUrl, setIsValidAvatarUrl] = useState(true)

  const [lastName, setLastName] = useState('')
  const [handle, setHandle] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const innerOnSubmit = () => {
    if (isValidUserName && isValidFirstName && isValidLastName) {
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
  if (whoami && handle != whoami.handle && userNames.includes(handle)) {
    if (!/^[A-Z]+$/i.test(firstName)) {
      if (isValidFirstName) {
        setisValidFirstName(false)
      }
    } else {
      if (!isValidFirstName) {
        setisValidFirstName(true)
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

    if (isValidUserName) {
      setErrorUsername('Username is already in use.')

      setIsValidUserName(false)
    }
  } else if (!/^[A-Za-z0-9_]+$/i.test(handle)) {
    if (isValidUserName) {
      setErrorUsername('Username is not valid.')

      setIsValidUserName(false)
    }
  } else {
    if (!isValidUserName) {
      setErrorUsername('')

      setIsValidUserName(true)
    }
  }

  if (!urlRegex.test(avatarUrl)) {
    if (isValidAvatarUrl) {
      setIsValidAvatarUrl(false)
    }
  } else {
    if (!isValidAvatarUrl) {
      setIsValidAvatarUrl(true)
    }
  }

  const usernameHelp =
    'Choose something easy for your teammates to use and recall. Avoid space and @.'
  const avatarShow = avatarUrl || 'img/avatar_placeholder.png'

  const actionButton = (
    <ButtonWithPendingState
      pending={pending}
      pendingText={pendingText}
      actionText={submitText}
    />
  )

  return (
    <div className='profile_edit_form'>
      <div className='profile_edit_form_title'>
        <h1>{titleText}</h1>
        <h4>{subText}</h4>
      </div>
      <form onSubmit={innerOnSubmit}>
        <div className='row'>
          <ValidatingFormInput
            value={firstName}
            onChange={setFirstName}
            invalidInput={firstName.length > 0 && !isValidFirstName}
            validInput={firstName.length > 0 && isValidFirstName}
            errorText={
              firstName.length > 0 && !isValidFirstName
                ? 'First name is not valid.'
                : ''
            }
            label='First Name'
            placeholder='Harry'
          />
          <div style={{ flex: 0.1 }} />
          <ValidatingFormInput
            value={lastName}
            onChange={setLastName}
            invalidInput={lastName.length > 0 && !isValidLastName}
            validInput={lastName.length > 0 && isValidLastName}
            errorText={
              lastName.length > 0 && !isValidLastName
                ? 'Last name is not valid.'
                : ''
            }
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
            invalidInput={handle.length > 0 && !isValidUserName}
            validInput={handle.length > 0 && isValidUserName}
            errorText={
              handle.length > 0 && !isValidUserName ? errorUsername : ''
            }
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
            invalidInput={avatarUrl.length > 0 && !isValidAvatarUrl}
            validInput={avatarUrl.length > 0 && isValidAvatarUrl}
            errorText={
              avatarUrl.length > 0 && !isValidAvatarUrl
                ? 'Invalid url. Make sure the url address is complete and valid.'
                : ''
            }
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
      <Button onClick={() => !pending && innerOnSubmit()} text={actionButton} />
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
