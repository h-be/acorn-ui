import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateProjectMeta } from '../../projects/project-meta/actions'

import './ProjectSettingsModal.css'

import ValidatingFormInput from '../ValidatingFormInput/ValidatingFormInput'
import Modal from '../Modal/Modal'
import {
  ProjectModalButton,
  ProjectModalContent,
  ProjectModalContentSpacer,
  ProjectModalHeading,
  ProjectModalSubHeading,
} from '../ProjectModal/ProjectModal'
import ProjectSecret from '../ProjectSecret/ProjectSecret'
import ButtonWithPendingState from '../ButtonWithPendingState/ButtonWithPendingState'

// since this is a big wordset, dynamically import it
// instead of including in the main bundle
async function generatePassphrase () {
  const { default: randomWord } = await import('diceware-word')
  return `${randomWord()} ${randomWord()} ${randomWord()} ${randomWord()} ${randomWord()}`
}

function EditProjectForm ({
  updatingProject,
  onSubmit,
  projectName,
  setProjectName,
  projectCoverUrl,
  setProjectCoverUrl,
}) {
  const [
    shouldInvalidateProjectName,
    setShouldInvalidateProjectName,
  ] = useState(false)
  const [isValidProjectName, setisValidProjectName] = useState(true)
  const [errorProjectName, setErrorProjectName] = useState('')

  const [isValidProjectCoverUrl, setisValidProjectCoverUrl] = useState(true)
  const [errorProjectCoverUrl, setErrorProjectCoverUrl] = useState('')

  const changeProjectName = name => {
    setShouldInvalidateProjectName(true)
    setProjectName(name)
  }
  const validateProjectName = () => {
    if (projectName.length > 0) {
      setisValidProjectName(true)
      setErrorProjectName('')
    } else if (shouldInvalidateProjectName) {
      setisValidProjectName(false)
      setErrorProjectName('Project name is required')
    }
  }
  useEffect(() => {
    validateProjectName()
  }, [projectName, shouldInvalidateProjectName])

  useEffect(() => {
    // if (projectCoverUrl.length > 0) {
    //   setisValidProjectCoverUrl(true)
    // } else {
    //   setisValidProjectCoverUrl(false)
    //   setErrorProjectCoverUrl('Project name is not... ?')
    // }
  }, [projectCoverUrl])

  const subheading = `Change this project's name or image`

  // validate before firing event
  const submit = () => {
    // set this to trigger the invalid field to show
    setShouldInvalidateProjectName(true)
    if (projectName.length > 0 && !updatingProject) {
      onSubmit()
    }
  }

  return (
    <div className='edit-project-form'>
      <ProjectModalHeading title='Edit project' />
      <ProjectModalSubHeading title={subheading} />
      <ProjectModalContentSpacer>
        <ProjectModalContent>
          {/* project name */}
          <ValidatingFormInput
            value={projectName}
            onChange={changeProjectName}
            invalidInput={!isValidProjectName}
            validInput={projectName.length > 0 && isValidProjectName}
            errorText={errorProjectName}
            label='Project Name'
            placeholder='The best project ever'
          />
          {/* project cover image */}
          <div className='edit-project-image-row'>
            <ValidatingFormInput
              value={projectCoverUrl}
              onChange={setProjectCoverUrl}
              label='Project Cover Image'
              placeholder='Paste in your project image URL here'
              invalidInput={
                projectCoverUrl.length > 0 && !isValidProjectCoverUrl
              }
              validInput={projectCoverUrl.length > 0 && isValidProjectCoverUrl}
              errorText={errorProjectCoverUrl}
            />
            <div
              className='edit-project-image'
              style={{ backgroundImage: `url(${projectCoverUrl})` }}
            />
          </div>
        </ProjectModalContent>
      </ProjectModalContentSpacer>
      <ProjectModalButton text='Update' onClick={submit} />
    </div>
  )
}

// function projectUpdatedModal ({ onDone, projectUpdated, projectSecret }) {
//   return (
//     <div
//       className={`project-created-modal ${
//         projectUpdated ? 'project-created' : ''
//       }`}>
//       <ProjectModalHeading title='New project created!' />
//       <ProjectModalContent>
//         <ProjectModalContentSpacer>
//           <ProjectSecret passphrase={projectSecret} />
//         </ProjectModalContentSpacer>
//       </ProjectModalContent>
//       <ProjectModalButton text='Done' onClick={onDone} />
//     </div>
//   )
// }

function ProjectSettingsModal ({
  showModal,
  onClose,
  updateProjectMeta,
  projectAddress,
  creatorAddress,
  createdAt,
  passphrase,
  cellIdString,
  projectNameProp,
  projectCoverUrlProp,
}) {
  const [updatingProject, setUpdatingProject] = useState(false)

  const onSubmit = async () => {
    setUpdatingProject(true)
    await updateProjectMeta(
      {
        name: projectName,
        image: projectCoverUrl,
        creator_address: creatorAddress,
        created_at: createdAt,
        passphrase: passphrase,
      },
      projectAddress,
      cellIdString
    )
    setUpdatingProject(false)
    onClose()
  }

  const [projectName, setProjectName] = useState(projectNameProp)
  const [projectCoverUrl, setProjectCoverUrl] = useState(projectCoverUrlProp)

  return (
    <Modal
      white
      active={showModal}
      onClose={onClose}
      className='edit-project-modal-wrapper'>
      <EditProjectForm
        onSubmit={onSubmit}
        updatingProject={updatingProject}
        projectName={projectName}
        setProjectName={setProjectName}
        projectCoverUrl={projectCoverUrl}
        setProjectCoverUrl={setProjectCoverUrl}
      />
    </Modal>
  )
}

function mapStateToProps (state) {
  // props for the component

  return {}
}

function mapDispatchToProps (dispatch) {
  // props for the component
  return {
    updateProjectMeta: (entry, address, cellIdString) => {
      return dispatch(
        updateProjectMeta.create({
          payload: { entry, address },
          cellIdString: cellIdString,
        })
      )
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSettingsModal)
