import React from 'react'
import { NavItemsGroup } from '../NavItems/NavItems'
import Icon from '../../Icon/Icon'

const howTosItems = [
  {
    title: 'Cards',
    submenu: [
      {
        title: 'Create a Card',
        url: 'create_card',
        description: (
          <ol>
            <li>
              hold G on keyboard left click on any empty space on the canvas
            </li>
            <li> type in a title for the card</li>
            <li> press Enter</li>
          </ol>
        ),
        tab: "How To's",
      },
      {
        title: 'Add a child card to an existing card',
        url: 'add_child_card',
        description: 'This is my description.',
        tab: "How To's",
      },
      {
        title: 'Change card title',
        url: 'change_card_title',
        description: 'This is my description.',
        tab: "How To's",
      },
      {
        title: 'Associate members with a card',
        url: 'associate_members_with_card',
        description: 'This is my description.',
        tab: "How To's",
      },
      {
        title: 'Change card status',
        url: 'change_card_status',
        description: 'This is my description.',
        tab: "How To's",
      },
      {
        title: 'Select multiple cards',
        url: 'select_multiple_cards',
        description: 'This is my description.',
        tab: "How To's",
      },
      {
        title: 'Deselect cards',
        url: 'deselect_cards',
        description: 'This is my description.',
        tab: "How To's",
      },
      {
        title: 'Archive',
        url: 'archive',
        description: 'This is my description.',
        tab: "How To's",
      },
    ],
  },
  {
    title: 'Navigation',
    submenu: [],
  },
]

// component
const Content = ({ goBack, title, description }) => (
  <div className='guidebook-section'>
    <div className='nav-item'>
      <Icon
        name='back_717171.svg'
        size='very-small'
        className='grey'
        onClick={goBack}
      />
      <div className='guidebook-section-title'>{title}</div>
    </div>
    <div className='guidebook-section-description'>{description}</div>
  </div>
)

export default function HowTos({ sectionSelected, goBack, selectSection }) {
  if (sectionSelected) {
    return (
      <Content
        goBack={goBack}
        title={sectionSelected.title}
        description={sectionSelected.description}
      />
    )
  }
  return <NavItemsGroup items={howTosItems} selectSection={selectSection} />
}
