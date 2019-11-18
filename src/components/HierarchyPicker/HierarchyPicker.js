import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './HierarchyPicker.css'
import Icon from '../Icon'

export default function HierarchyPicker({ selectedStatus, statusClicked, onClose }) {

    const hierarchies = [
        {
            name: 'Leaf',
            icon: 'leaf.svg',
            description: 'small goal'
        },
        {
            name: 'Branch',
            icon: 'branch-with-leaf.png',
            description: 'sub-goal'
        },
        {
            name: 'Trunk',
            icon: 'trunk.png',
            description: 'high-level goal'
        },
        {
            name: 'Root',
            icon: 'root.png',
            description: 'primary goal'
        },
    ]


    const [hierarchySelected, setHierarchySelected ] = useState(null)
    return (
      <div className='hierarchies_picker vertical_action_overlay'>
          <span className="hiararchy-card-icon">
              {
                  hierarchySelected && 
                  <Icon name={hierarchySelected} />
              }
          </span>
          <div className="hierarchy_picker_header">
              <span className="hierarchies_picker_title">Hierarchy</span>
              <Icon className='vertical_action_close' name='x_a3a3a3.svg' size='small-close' onClick={() => onClose()} />
          </div>
          <div className="hierarchy_content_wrapper">
            {hierarchies.map((hierarchy,index) => (
                <HierarchyOption
                    key={index}
                    name={hierarchy.name}
                    icon={hierarchy.icon}
                    description={hierarchy.description}
                    onClick={ hierarchy => { setHierarchySelected( hierarchy ) }}
                />
            ))}
    
            <p className="gray-text">
                Not sure how to set the hierarchy for this card? Read more on our <a className="gray-text" href="#">Guidebook.</a>
            </p>
          </div>
      </div>
    )
}

HierarchyPicker.propTypes = {
    selectedHierarchy: PropTypes.string.isRequired,
    hierarchyClicked: PropTypes.func.isRequired
}


function HierarchyOption({selected, onClick, name, icon, description}){

    return(
        <div className="hierarchy_option" onClick={()=>{ onClick(icon) }}>
            <div className="hierarchy_option_icon_container">
                {
                    icon && <img src={`img/${icon}`} />
                }
            </div>
            <div className="hierarchy_option_content">
                <span>{name}</span>
                <span><small className="gray-text">{description}</small></span>
            </div>
        </div>
    )    
}