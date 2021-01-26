import React, { useState } from 'react'
import './UpdatePromptModal.css'

import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import Modal, { ModalContent } from '../Modal/Modal'

export default function UpdatePromptModal ({ show, onClose }) {
  const updateDetails = (
    <div className='update-details-wrapper'>
      <div className='update-details-title'>About this update</div>
      <div className='update-details-content'>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </li>
        <li>fixed some bugs</li>
        <li>RSM refactoring</li>
      </div>
    </div>
  )

  return (
    <>
      <Modal white active={show} onClose={onClose}>
        <ModalContent
          heading='A new version of Acorn is released  🎉'
          content='You are required to update to the new version to access your collaborative projects. You can keep continue using your personal projects without the update.'
          secondaryContent={updateDetails}
          primaryButton='Update now'
          altButton="I'll update later"
          altButtonAction={onClose}
        />
      </Modal>
    </>
  )
}
