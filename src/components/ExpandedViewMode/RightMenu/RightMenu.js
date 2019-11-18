import React from 'react'
import './RightMenu.css'

import Icon from '../../Icon'

export default function RightMenu({ goalAddress, goal, onArchiveClick, updateGoal, onClose }) {

    return (
        <div className="expanded_view_right_menu">
          <Icon name="help_4d4d4d.svg" className="right_menu_help"/>
          <Icon name="priority_4d4d4d.svg" className="right_menu_priority"/>
          <Icon name="tag_4d4d4d.svg" className="right_menu_tag"/>
          <Icon name="squirrel_4d4d4d.svg" className="right_menu_squirrel"/>
          <Icon name="calendar_4d4d4d.svg" className="right_menu_calendar"/>
          <Icon name="link_4d4d4d.svg" className="right_menu_link"/>
          <Icon name="archive_4d4d4d.svg" className="right_menu_archive"/>
          <Icon name="share_4d4d4d.svg" className="right_menu_share"/>
          <Icon name="github_4d4d4d.svg" className="right_menu_github"/>
        </div>
    )
  }