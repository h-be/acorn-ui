import React from 'react'
import './ProjectSecret.css'
import Icon from '../Icon/Icon'
import ValidatingFormInput from '../ValidatingFormInput/ValidatingFormInput'

export default function ProjectSecret({ passphrase }) {
  const copySecretToClipboard = () => {
    navigator.clipboard.writeText(passphrase)
  }

  return (
    <div className='project-secret-row'>
      <ValidatingFormInput
        value={passphrase}
        label='Project invitation secret'
        helpText='Share this secret phrase with people you want to invite to this project'
      />
      <div
        onClick={copySecretToClipboard}
        className='project-secret-copy-secret'>
        <Icon
          withTooltip
          size='small'
          tooltipText='copy'
          name='copy-line.svg'
        />
      </div>
    </div>
  )
}
