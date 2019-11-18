import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './ExpandedViewMode.css'
import Icon from '../Icon'

import ExpandedViewModeHeader from './ExpandedViewModeHeader/ExpandedViewModeHeader'
import RightMenu from './RightMenu/RightMenu'
import ExpandedViewModeContent from './ExpandedViewModeContent/ExpandedViewModeContent'
import ExpandedViewModeFooter from './ExpandedViewModeFooter/ExpandedViewModeFooter'

function ExpandedViewMode({ goalAddress, goal, onArchiveClick, updateGoal, onClose }) {


  return (
    <div className="expanded_view_overlay">
      <div className="expanded_view_wrapper">
        <Icon onClick={onClose} name="x_a3a3a3.svg" size="small" className="close_icon" />
        <ExpandedViewModeHeader className="expanded_view_header" />
        <div className="expanded_view_main">
          <ExpandedViewModeContent className="expanded_view_content" />
          <RightMenu className="expanded_view_right_menu" />
        </div>
        <ExpandedViewModeFooter className="expanded_view_footer" />
      </div>
    </div>
  )
}

ExpandedViewMode.propTypes = {
  onClose: PropTypes.func,
}

export default ExpandedViewMode