import React from 'react'
import PropTypes from 'prop-types'
import './HierarchyPicker.css'
import Icon from '../Icon'
import { connect } from 'react-redux'
import LayoutFomula from '../../drawing/layoutFormula'
function HierarchyPicker(props) {
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
        {
            name: 'No Hierarchy',
        }
    ]

    const allCoordenates = LayoutFomula(props.screensize, props.goals, props.edges)
    let cardSelected
    let hierarchyIcons
    if(props.hashSelections.length){
        //cardSelected = props.hashSelections.map(address => allCoordenates[address])
        cardSelected =  props.hashSelections.map(address => {
            let goalIconToDraw = {}
            if (allCoordenates[address]){
                goalIconToDraw.coordenates = allCoordenates[address]

                if( props.goals[address].hierarchy ){

                    hierarchies.forEach(h => {
                        if(h.name === props.goals[address].hierarchy) {
                            goalIconToDraw.icon = h.icon
                        }
                    })
                }
                return goalIconToDraw
            } 
        })
    }else{
        cardSelected = allCoordenates[props.hashSelections.goalAddress]
        const hierarchyDefault = hierarchies.filter( f => f.name === props.selectedHierarchy )
        hierarchyIcons = hierarchyDefault[0].icon
    }

    return (
        <div className='hierarchies_picker vertical_action_overlay'>
            {    
                cardSelected.length ? 
                  cardSelected.map((card, index) => (
                    <span 
                        key={index} 
                        style={{position: `fixed`, top: `${card.coordenates.y - 30}px`, left: `${card.coordenates.x - 28}px`}}>
                        <Icon name={card.icon} />
                    </span>
                  ))
                    :
                    <span style={{position: `fixed`, top: `${cardSelected.y - 30}px`, left: `${cardSelected.x - 28}px`}}>
                       {
                           <Icon name={hierarchyIcons} />
                       }
                    </span>
            }
            <div className="hierarchy_picker_header">
                <span className="hierarchies_picker_title">Hierarchy</span>
                <Icon className='vertical_action_close' name='x_a3a3a3.svg' size='small-close' onClick={() => props.onClose()} />
            </div>
            <div className="hierarchy_content_wrapper">
                {hierarchies.map((hierarchy,index) => (
                    <HierarchyOption
                        key={index}
                        name={hierarchy.name}
                        icon={hierarchy.icon}
                        description={hierarchy.description}
                        selected={hierarchy.name === props.selectedHierarchy}
                        onClick={ hierarchy => { props.hierarchyClicked( hierarchy ) }}
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
    hierarchyClicked: PropTypes.func.isRequired
}


function HierarchyOption({selected, onClick, name, icon, description}){
    return(
        <div className={`hierarchy_option ${ selected ? 'active' : '' }`} onClick={()=>{ onClick(name) }}>
            <div className="hierarchy_option_icon_container">
                {
                    icon && <img src={`img/${icon}`} />
                }
            </div>
            <div className="hierarchy_option_content">
                <span>{name}</span>
                {description &&  <span><small className="gray-text">{description}</small></span>}
            </div>
            <span>
                { selected && <img src="img/check-mark-line.svg" alt="check" width="50%"/> }
            </span>
        </div>
    )    
}

function mapStateToProps(state) {
  const goalAddress = { goalAddress: state.ui.goalForm.editAddress } 
  return {
    hashSelections: goalAddress.goalAddress ? goalAddress : state.ui.selection.selectedGoals ,
    screensize: state.ui.screensize.width,
    goals: state.goals,
    edges: state.edges,
  }
}

export default connect(mapStateToProps, () => ({}))(HierarchyPicker)