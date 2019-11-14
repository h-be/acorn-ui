import React from 'react'
import { NavItemsGroup } from '../NavItems/NavItems'

export default function GettingStarted(props){
  const navItems =[
  {
    title: 'Basic',
    submenu: [
        { title: 'Create a Card', url: 'create_card', tab: "How To's"},
        { title: 'Add a child card to an existing card', url: 'add_child_card', tab: "How To's"},
        { title: 'Change card title', url: 'change_card_title', tab: "How To's"},
        { title: 'Associate members with a card', url: 'associate_members_with_card', tab: "How To's" },
        { title: 'Change card status', url: 'change_card_status', tab: "How To's" },
        { title: 'Select multiple cards', url: 'select_multiple_cards',tab: "How To's" },
    ]
    },
  ]
  
  return (
    <NavItemsGroup
      items={navItems}
      selectSection={props.selectSection} 
    />
  )
     
}

const Test = (props) => (
  <div>
    <button type="button" onClick={props.goBack}></button>
    <h1>aja</h1>
  </div>
)