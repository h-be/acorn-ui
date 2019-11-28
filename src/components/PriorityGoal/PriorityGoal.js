import React from 'react'
import './PriorityGoal.css'

function PriorityGoal({ goal }) {
  console.log(goal)
  return <div>
    {goal.content}
  </div>
}

export default PriorityGoal