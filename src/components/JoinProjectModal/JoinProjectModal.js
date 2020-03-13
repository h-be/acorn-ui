import React, { useState, useEffect } from 'react'
import './JoinProjectModal.css'

import ValidatingFormInput from '../ValidatingFormInput/ValidatingFormInput'
import Modal from '../Modal/Modal'
import {
  ProjectModalButton,
  ProjectModalContent,
  ProjectModalContentSpacer,
  ProjectModalHeading,
  ProjectModalSubHeading,
} from '../ProjectModal/ProjectModal'

export default function CreateProjectModal({
  showModal,
  onClose,
  onJoinProject,
}) {
  const reset = () => {
    setProjectSecret('')
  }
  const onSubmit = () => {
    // chain this with a .then
    onJoinProject(projectSecret)
    reset()
  }
  const onDone = () => {
    onClose()
  }

  const [projectSecret, setProjectSecret] = useState('')

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
      <ProjectModalButton text='Done' onClick={onDone} />
    </Modal>
  )
}
