import React from 'react'
import './PriorityQuadrant.css'
import PriorityGoal from '../PriorityGoal/PriorityGoal'



function PriorityQuadrant({ title, titleClassname, goals }) {
  return <div className="priority-quadrant">
    <div className={`priority-quadrant-title ${titleClassname}`}>
      {title}
    </div>
    <div className="priority-quadrant-goals">
      {goals.map((goal) => {
        return <PriorityGoal key={goal.content} goal={goal} />
      })}
    </div>
  </div>
}

export default PriorityQuadrant