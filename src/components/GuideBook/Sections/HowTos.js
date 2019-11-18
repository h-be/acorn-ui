import React from 'react'
import { NavItemsGroup } from '../NavItems/NavItems'
import Icon from '../../Icon'

export default function HowTos(props){

  const navItems = [
    {
      title: 'Cards',
      submenu: [
          { title: 'Create a Card', url: 'create_card', tab: "How To's"},
          { title: 'Add a child card to an existing card', url: 'add_child_card', tab: "How To's"},
          { title: 'Change card title', url: 'change_card_title', tab: "How To's"},
          { title: 'Associate members with a card', url: 'associate_members_with_card', tab: "How To's" },
          { title: 'Change card status', url: 'change_card_status', tab: "How To's" },
          { title: 'Select multiple cards', url: 'select_multiple_cards',tab: "How To's" },
          { title: 'Deselect cards', url: 'deselect_cards',tab: "How To's" },
          { title: 'Archive', url: 'archive',tab: "How To's" },
      ]
    },
    {
      title: 'Navigation',
      submenu: []
    }
  ]

  switch(props.sectionSelected){
    case 'create_card': 
      return <CreateCard goBack={props.goBack} />
    default:
      return(
        <NavItemsGroup
          items={navItems}
          selectSection={props.selectSection} 
        />   
      )
  }
}

const CreateCard = props => (
  <div className="guidebook-section">
    <div className="guidebook-section-control">
    <Icon name='back_717171.svg' size='small' onClick={props.goBack} />
    </div>
    <div className="guidebook-section-content">
      <div className="guidebook-section-title">Create a Card</div>
      <ol>
        <li> hold G on keyboard left click on any empty space on the canvas</li>
        <li> type in a title for the card</li>
        <li> press Enter</li>
      </ol>

    </div>
  </div>
)