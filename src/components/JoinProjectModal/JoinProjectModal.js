import React, { useState, useEffect } from 'react'
import './JoinProjectModal.css'

import Icon from '../Icon/Icon'

import ValidatingFormInput from '../ValidatingFormInput/ValidatingFormInput'
import Modal from '../Modal/Modal'
import {
  ProjectModalButton,
  ProjectModalContent,
  ProjectModalContentSpacer,
  ProjectModalHeading,
  ProjectModalSubHeading,
} from '../ProjectModal/ProjectModal'

export default function JoinProjectModal({
  showModal,
  onClose,
  onJoinProject,
}) {
  const reset = () => {
    setProjectSecret('')
    setValidatingSecret(false)
  }
  const onValidate = () => {
    // chain this with a .then
    setValidatingSecret(true)
  }
  const onDone = () => {
    onClose()
  }

  const [projectSecret, setProjectSecret] = useState('')

  const [validatingSecret, setValidatingSecret] = useState(false)

  const validateButtonContent = validatingSecret ? (
    <div className='validating-button'>
      <Icon
        name='acorn-logo-stroked.svg'
        className='white not-hoverable very-small'
      />
      <div>Validating...</div>
    </div>
  ) : (
    'Validate'
  )

  return (
    <Modal
      white
      active={showModal}
      onClose={onClose}
      className='join-project-modal-wrapper'>
      <ProjectModalHeading title='Join an existing project' />
      <ProjectModalContent>
        <ProjectModalContentSpacer>
          <ValidatingFormInput
            value={projectSecret}
            onChange={setProjectSecret}
            label='Project invitation secret'
            helpText='Paste in the secret phrase the project host has shared with you.'
          />
        </ProjectModalContentSpacer>
      </ProjectModalContent>
      <ProjectModalButton text={validateButtonContent} onClick={onValidate} />
    </Modal>
  )
}
