import React from 'react'
import { NavItemsGroup } from '../NavItems/NavItems'
import Icon from '../../Icon/Icon'

const shortcutsItems = [
  {
    title: 'Cards',
    submenu: [
      {
        shortcutKey: 'G + shift',
        shortcutTitle: 'Create a card',
      },
      {
        shortcutKey: 'E',
        shortcutTitle: 'Enter expanded view (on a selected card)',
      },
      {
        shortcutKey: 'delete',
        shortcutTitle: 'Archive',
      },
    ],
  },
  {
    title: 'Tools',
    submenu: [
      {
        shortcutKey: '⌘ + Z',
        shortcutTitle: 'Undo',
      },
      {
        shortcutKey: '⌘ + shift + Z',
        shortcutTitle: 'Redo',
      },
    ],
  },
  {
    title: 'Navigation',
    submenu: [
      {
        shortcutKey: '+',
        shortcutTitle: 'Zoom in',
      },
      {
        shortcutKey: '–',
        shortcutTitle: 'Zoom out',
      },
      {
        shortcutKey: '← → ↑ ↓',
        shortcutTitle: 'Pan around canvas',
      },
    ],
  },
]

// component
const Content = ({ shortcutKey, shortcutTitle }) => (
  <div className='guidebook-shortcut-row'>
    <div className='guidebook-shortcut-title'>{shortcutTitle}</div>
    <div className='guidebook-shortcut-key'>{shortcutKey}</div>
  </div>
)

export default function Shortcuts() {
  return shortcutsItems.map((category, index) => {
    return (
      <div className='guidebook-shortcut-category-wrapper' key={index}>
        <div className='guidebook-shortcut-category-title'>
          {category.title}
        </div>
        {category.submenu.map((menuItem, index) => {
          return (
            <Content
              key={index}
              shortcutKey={menuItem.shortcutKey}
              shortcutTitle={menuItem.shortcutTitle}
            />
          )
        })}
      </div>
    )
  })
}

// return <NavItemsGroup items={shortcutsItems} selectSection={selectSection} />
