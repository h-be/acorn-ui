import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Icon from './Icon'
import { addMemberOfGoal, archiveMemberOfGoal } from '../goal-members/actions'
import Avatar from './Avatar/Avatar'

function PeoplePicker({
  people,
  goalAddress,
  addMemberOfGoal,
  archiveMemberOfGoal,
  onClose,
}) {
  const [filterText, setFilterText] = useState('')

  return (
    <div className='people_picker vertical_action_overlay'>
      <Icon
        className='vertical_action_close'
        name='x_a3a3a3.svg'
        size='small-close'
        onClick={() => onClose()}
      />
      <div className='popup_title'>squirrels</div>
      <div className='people_picker_search'>
        <Icon name='search.svg' size='small' />
        <input
          type='text'
          onChange={e => setFilterText(e.target.value)}
          value={filterText}
          placeholder='search squirrels...'
          autoFocus
        />
        {filterText !== '' && (
          <button
            onClick={() => {
              setFilterText('')
            }}
            className='clear_button'>
            clear
          </button>
        )}
      </div>
      <div className='people_picker_spacer' />
      <ul className='people_picker_people'>
        {people
          // filter people out if there's filter text defined, and don't bother case matching
          .filter(person => {
            const name = `${person.first_name} ${person.last_name}`
            return (
              !filterText ||
              name.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            )
          })
          // sort members (people attached to Goal) to the top of the list
          .sort((p1, p2) => {
            if (p1.is_member && !p2.is_member) return -1
            else if (p1.is_member && p2.is_member) return 0
            else if (!p1.is_member && p2.is_member) return 1
          })
          .map((person, index) => {
            const onClick = () => {
              if (person.is_member)
                archiveMemberOfGoal(person.goal_member_address)
              else addMemberOfGoal(goalAddress, person.address)
            }
            return (
              <li
                key={index}
                className={person.is_member ? 'member' : ''}
                onClick={onClick}>
                <Avatar avatar_url={person.avatar_url} medium />
                <div className='person_nameANDhandle'>
                  <span className='person_name'>
                    {person.first_name} {person.last_name}
                  </span>
                  <div className='person_handle'>{person.handle}</div>
                </div>
                {!person.is_member && (
                  <Icon
                    name='radio_button.svg'
                    size='small'
                    className='radio_button'
                  />
                )}
                {person.is_member && (
                  <Icon
                    name='radio_button_checked.svg'
                    size='small'
                    className='radio_button'
                  />
                )}
              </li>
            )
          })}
      </ul>
    </div>
  )
}

PeoplePicker.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      handle: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
      is_member: PropTypes.bool.isRequired,
      goal_member_address: PropTypes.string,
    })
  ).isRequired,
  goalAddress: PropTypes.string.isRequired,
  addMemberOfGoal: PropTypes.func.isRequired,
  archiveMemberOfGoal: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const goalAddress = state.ui.goalForm.editAddress
  const membersOfGoal = Object.keys(state.goalMembers)
    .map(address => state.goalMembers[address])
    .filter(goalMember => goalMember.goal_address === goalAddress)
  const agents = Object.keys(state.agents).map(address => state.agents[address])
  return {
    people: agents.map(agent => {
      const member = membersOfGoal.find(
        goalMember => goalMember.agent_address === agent.address
      )
      return {
        ...agent, // address, name, avatar_url
        is_member: member ? true : false,
        goal_member_address: member ? member.address : null,
      }
    }),
    goalAddress,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMemberOfGoal: (goal_address, agent_address) => {
      return dispatch(
        addMemberOfGoal.create({
          goal_member: {
            goal_address,
            agent_address,
            unix_timestamp: Date.now(),
          },
        })
      )
    },
    archiveMemberOfGoal: address => {
      return dispatch(archiveMemberOfGoal.create({ address }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePicker)
