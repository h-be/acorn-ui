import React from 'react'
import './PriorityQuadrant.css'
import PriorityGoal from '../PriorityGoal/PriorityGoal'

function PriorityQuadrant({ title, titleClassname, goals }) {
  return (
    <div className='priority-quadrant'>
      <div className={`priority-quadrant-title ${titleClassname}`}>{title}</div>
      <div className='priority-quadrant-goals'>
        {goals.map((goal, index) => {
          return <PriorityGoal key={index} goal={goal} />
        })}
      </div>
    </div>
  )
}

export default PriorityQuadrant
