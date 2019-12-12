import React from 'react'
import PropTypes from 'prop-types'
import './HierarchyPicker.css'
import PickerTemplate from '../PickerTemplate/PickerTemplate'
import Icon from '../Icon/Icon'

export default function HierarchyPicker({
  selectedHierarchy,
  hierarchyClicked,
  onClose,
}) {
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
      icon: 'question-mark.svg',
    },
  ]

  return (
    <PickerTemplate
      className='hierarchy_picker'
      heading='hierarchy'
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
        <p className='hierarchy_wrapper_footer'>
          Not sure how to set the hierarchy for this card? Read more on our{' '}
          <a href='#'>
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
    <li
      className={`hierarchy_option_item ${selected ? 'active' : ''}`}
      onClick={() => {
        onClick(name)
      }}>
      <div className='hierarchy_option_container'>
        <div className='hierarchy_option_icon'>
          {icon && <Icon name={icon} className='light-grey' size='medium' />}
        </div>
        <div className='hierarchy_option_content'>
          <span className='hierarchy_option_name'>{name}</span>
          {description && (
            <span>
              <div className='hierarchy_description'>{description}</div>
            </span>
          )}
        </div>
        {!selected && (
          <Icon
            name='radio_button.svg'
            size='small'
            className='light-grey radio_button not-hoverable'
          />
        )}
        {selected && (
          <Icon
            name='radio_button_checked.svg'
            size='small'
            className='radio_button'
            className='purple radio_button'
          />
        )}
      </div>
    </li>
  )
}
