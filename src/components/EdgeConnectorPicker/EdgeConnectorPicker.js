import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

import './EdgeConnectorPicker.css'

import PickerTemplate from '../PickerTemplate/PickerTemplate'
import { Select, Option, useSelect } from '../Select/Select'
import { calculateValidChildren } from '../EdgeConnectors/EdgeConnectors'
import { createEdge } from '../../projects/edges/actions'

import Button from '../Button/Button'
import { connect } from 'react-redux'

function EdgeConnectorPicker({
  onClose,
  selectedGoals,
  edges,
  activeProject,
  saveConnections,
}) {
  const isOpen = true

  // single select
  const [parentAddress, toggleParent, resetParent] = useSelect()
  // multi select
  const [childrenAddresses, toggleChild, resetChildren] = useSelect(true)

  useEffect(() => {
    resetChildren()
  }, [parentAddress])

  const validChildrenAddresses = calculateValidChildren(
    parentAddress,
    edges,
    selectedGoals.map(g => g.address)
  )

  const save = async () => {
    if (!parentAddress || !childrenAddresses.length) return
    try {
      await saveConnections(parentAddress, childrenAddresses, activeProject)
      onClose()
    } catch (e) {}
  }

  return (
    <CSSTransition
      in={isOpen}
      timeout={100}
      unmountOnExit
      classNames='edge-connector-picker-wrapper'>
      <PickerTemplate
        className='edge-connector-picker'
        heading='connect'
        onClose={onClose}>
        <div className='edge-connector-content'>
          {/* Parent */}
          <div className='edge-connector-dropdown-wrapper'>
            <label htmlFor='parent'>Parent</label>

            <Select
              toggleSelectOption={toggleParent}
              toggleLabel={
                parentAddress &&
                selectedGoals.find(s => s.address === parentAddress)
                  ? selectedGoals.find(s => s.address === parentAddress).content
                  : 'Pick one'
              }>
              {selectedGoals.map(selectedGoal => (
                <Option
                  key={selectedGoal.address}
                  value={selectedGoal.address}
                  label={selectedGoal.content}
                  selected={parentAddress === selectedGoal.address}
                />
              ))}
            </Select>
          </div>
          {/* Children */}
          <div className='edge-connector-dropdown-wrapper'>
            <label htmlFor='children'>Children</label>

            <Select
              multiple
              toggleSelectOption={toggleChild}
              toggleLabel={`${childrenAddresses.length} card${
                childrenAddresses.length === 1 ? '' : 's'
              }`}>
              {selectedGoals
                .filter(g => validChildrenAddresses.includes(g.address))
                .map(selectedGoal => (
                  <Option
                    key={selectedGoal.address}
                    value={selectedGoal.address}
                    label={selectedGoal.content}
                    selected={childrenAddresses.includes(selectedGoal.address)}
                  />
                ))}
            </Select>
          </div>
          <div className='edge-connector-buttons'>
            <Button text='Preview' size='small' className='green' stroke />
            <Button
              onClick={save}
              text='Save Changes'
              size='small'
              className='purple'
            />
          </div>
        </div>
      </PickerTemplate>
    </CSSTransition>
  )
}

function mapStateToProps(state) {
  const selectedGoals = state.ui.selection.selectedGoals.map(address => {
    return state.projects.goals[state.ui.activeProject][address]
  })

  const edges = Object.values(state.projects.edges[state.ui.activeProject])

  return {
    selectedGoals,
    edges,
    activeProject: state.ui.activeProject,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveConnections: (parentAddress, childrenAddresses, activeProject) => {
      // loop over childrenAddresses
      // use createEdge each time
      return Promise.all(
        childrenAddresses.map(childAddress =>
          dispatch(
            createEdge(activeProject).create({
              edge: {
                child_address: childAddress,
                parent_address: parentAddress,
              },
            })
          )
        )
      )
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EdgeConnectorPicker)
