import React from 'react'
import PropTypes from 'prop-types'
import './HierarchyPicker.css'
import PickerTemplate from '../PickerTemplate/PickerTemplate'
import { connect } from 'react-redux'

function HierarchyPicker({ selectedHierarchy, hierarchyClicked, onClose }) {
  const hierarchies = [
    {
      name: 'Leaf',
      icon: 'leaf.svg',
      description: 'small goal',
    },
    {
      name: 'Branch',
      icon: 'branch-with-leaf.png',
      description: 'sub-goal',
    },
    {
      name: 'Trunk',
      icon: 'trunk.png',
      description: 'high-level goal',
    },
    {
      name: 'Root',
      icon: 'root.png',
      description: 'primary goal',
    },
    {
      name: 'No Hierarchy',
    },
  ]

  return (
    <PickerTemplate
      className='hierarchies_picker'
      heading='Hierarchy'
      onClose={onClose}>
      <div className='hierarchy_content_wrapper'>
        {hierarchies.map((hierarchy, index) => (
          <HierarchyOption
            key={index}
            name={hierarchy.name}
            icon={hierarchy.icon}
            description={hierarchy.description}
            selected={hierarchy.name === selectedHierarchy}
            onClick={hierarchy => hierarchyClicked(hierarchy)}
          />
        ))}
        <p className='gray-text'>
          Not sure how to set the hierarchy for this card? Read more on our{' '}
          <a className='gray-text' href='#'>
            Guidebook.
          </a>
        </p>
      </div>
    </PickerTemplate>
  )
}

HierarchyPicker.propTypes = {
  selectedHierarchy: PropTypes.string.isRequired,
  hierarchyClicked: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

function HierarchyOption({ selected, onClick, name, icon, description }) {
  return (
    <div
      className={`hierarchy_option ${selected ? 'active' : ''}`}
      onClick={() => {
        onClick(name)
      }}>
      <div className='hierarchy_option_icon_container'>
        {icon && <img src={`img/${icon}`} />}
      </div>
      <div className='hierarchy_option_content'>
        <span>{name}</span>
        {description && (
          <span>
            <small className='gray-text'>{description}</small>
          </span>
        )}
      </div>
      <span>
        {selected && (
          <img src='img/check-mark-line.svg' alt='check' width='50%' />
        )}
      </span>
    </div>
  )
}

function mapStateToProps(state) {
  const goalAddress = { goalAddress: state.ui.goalForm.editAddress }
  return {
    hashSelections: goalAddress.goalAddress
      ? goalAddress
      : state.ui.selection.selectedGoals,
    screensize: state.ui.screensize.width,
    goals: state.goals,
    edges: state.edges,
    viewport: state.ui.viewport,
  }
}

export default connect(mapStateToProps, () => ({}))(HierarchyPicker)
