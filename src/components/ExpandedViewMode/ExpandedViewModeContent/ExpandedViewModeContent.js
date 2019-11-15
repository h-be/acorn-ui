import React from 'react'
import './ExpandedViewModeContent.css'

export default function ExpandedViewModeContent({ goalAddress, goal, onArchiveClick, updateGoal, onClose }) {


    return (
        <div className="expanded_view_content">
            <div className="expanded_view_title">Feature Hypothesis Statement</div>
            <div className="expanded_view_tags"></div>
            <div className="expanded_view_squirrels"></div>
            <div className="expanded_view_timeframe"></div>
            <div className="expanded_view_description"></div>
            <div className="expanded_view_tabs">
                <div className="expanded_view_priority"></div>
                <div className="expanded_view_comments"></div>
                <div className="expanded_view_acitivity_history"></div>
                <div className="expanded_view_attachments"></div>
            </div>
        </div>
    )
  }