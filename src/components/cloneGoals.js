import { createGoal } from '../goals/actions'
import { selectGoal } from '../selection/actions'
import { addMemberOfGoal } from '../goal-members/actions'
import moment from 'moment'

export default function cloneGoals(store, goalsToClone, goalMembers, goals) {
  goalsToClone.forEach(value => {
    let members = []
    Object.values(goalMembers).map(_value => {
      _value.goal_address === value ? members.push(_value) : null
    })

    store
      .dispatch(
        createGoal.create({
          goal: {
            ...goals[value],
            timestamp_created: moment().unix(),
          },
          maybe_parent_address: null,
        })
      )
      .then(value => {
        let newGoalAddress = value.goal.address
        store.dispatch(selectGoal(value.goal.address))
        members.map(member => {
          store.dispatch(
            addMemberOfGoal.create({
              goal_member: {
                goal_address: newGoalAddress,
                agent_address: member.agent_address,
                user_edit_hash: member.user_edit_hash,
                unix_timestamp: moment().unix(),
              },
            })
          )
        })
      })
  })
}
