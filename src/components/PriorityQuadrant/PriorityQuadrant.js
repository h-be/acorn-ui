import React from 'react'
import './PriorityQuadrant.css'

function PriorityQuadrant({ title, titleClassname }) {
  return <div className="priority-quadrant">
    <div className={`priority-quadrant-title ${titleClassname}`}>
      {title}
    </div>
  </div>
}

export default PriorityQuadrant