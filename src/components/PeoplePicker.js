import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Icon from './Icon'
import {
    addMemberOfGoal,
    archiveMemberOfGoal
} from '../goal-members/actions'
import Avatar from './Avatar/Avatar'

function PeoplePicker({ people, goalAddress, addMemberOfGoal, archiveMemberOfGoal, onClose }) {
    const [filterText, setFilterText] = useState('')

    return (
        <div className='people_picker vertical_action_overlay'>
            <div className='people_picker_search'>
                <Icon name='search.svg' size='small' />
                <input type='text' onChange={e => setFilterText(e.target.value)} value={filterText} placeholder='Search squirrels...' autoFocus />
                <Icon className='vertical_action_close' name='x.svg' size='small' onClick={() => onClose()} />
            </div>
            <div className='people_picker_spacer' />
            <ul className='people_picker_people'>
                {people
                    // filter people out if there's filter text defined, and don't bother case matching
                    .filter(person => {
                      const name = `${person.first_name} ${person.last_name}`
                      return !filterText || name.toLowerCase().indexOf(filterText.toLowerCase()) > -1
                    })
                    // sort members (people attached to Goal) to the top of the list
                    .sort((p1, p2) => {
                        if (p1.is_member && !p2.is_member) return -1
                        else if (p1.is_member && p2.is_member) return 0
                        else if (!p1.is_member && p2.is_member) return 1
                    })
                    .map((person, index) => {
                        const onClick = () => {
                            if (person.is_member) archiveMemberOfGoal(person.goal_member_address)
                            else addMemberOfGoal(goalAddress, person.address)
                        }
                        return (<li key={index} className={person.is_member ? 'member' : ''} onClick={onClick}>
                            <Avatar avatar_url={person.avatar_url} highlighted={person.is_member} small />
                            <div className='hover_wrapper'>
                                <span className='person_name'>{person.first_name} {person.last_name}</span>
                                {person.is_member && <Icon size='small' name='check_mark.svg' />}
                            </div>
                        </li>)
                    })
                }
            </ul>
        </div>
    )
}

PeoplePicker.propTypes = {
    people: PropTypes.arrayOf(PropTypes.shape({
        address: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        handle: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
        is_member: PropTypes.bool.isRequired,
        goal_member_address: PropTypes.string
    })).isRequired,
    goalAddress: PropTypes.string.isRequired,
    addMemberOfGoal: PropTypes.func.isRequired,
    archiveMemberOfGoal: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const goalAddress = state.ui.goalForm.editAddress
    const membersOfGoal = Object.keys(state.goalMembers)
        .map(address => state.goalMembers[address])
        .filter(goalMember => goalMember.goal_address === goalAddress)
    const agents = Object.keys(state.agents).map(address => state.agents[address])
    return {
        people: agents.map(agent => {
            const member = membersOfGoal.find(goalMember => goalMember.agent_address === agent.address)
            return {
                ...agent, // address, name, avatar_url
                is_member: member ? true : false,
                goal_member_address: member ? member.address : null,
            }
        }),
        goalAddress
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addMemberOfGoal: (goal_address, agent_address) => {
            return dispatch(addMemberOfGoal.create({
                goal_member: {
                    goal_address,
                    agent_address,
                    unix_timestamp: Date.now()
                }
            }))
        },
        archiveMemberOfGoal: (address) => {
            return dispatch(archiveMemberOfGoal.create({ address }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePicker)