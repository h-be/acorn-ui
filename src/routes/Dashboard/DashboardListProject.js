import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
import Icon from '../../components/Icon/Icon'
import './DashboardListProject.css'
import { pickColorForString } from '../../styles'

export default function DashboardListProject({
  project,
  setShowInviteMembersModal,
}) {
  const [showEntryPoints, setShowEntryPoints] = useState(false)

  const imageStyles = project.image
    ? { backgroundImage: `url(${project.image})` }
    : { backgroundColor: pickColorForString(project.name) }

  const projectInitials = project.name
    .split(' ')
    .map(word => word ? word[0].toUpperCase() : 'X')
    .slice(0, 3)

  return (
    <div className='dashboard-list-project-wrapper'>
      <div className='dashboard-list-project'>
        <NavLink
          to={`/project/${project.cellId}`}
          className='dashboard-list-project-image'>
          <div className='dashboard-list-project-image-bg' style={imageStyles}>
            {project.image ? '' : projectInitials}
          </div>
        </NavLink>
        <div className='dashboard-list-project-content'>
          <NavLink
            to={`/project/${project.cellId}`}
            className='dashboard-list-project-name'>
            {project.name}
          </NavLink>
          <div className='dashboard-list-project-member-count'>
            {project.members.length} member
            {project.members.length > 1 ? 's' : ''}
          </div>
        </div>

        <div className='dashboard-list-project-members'>
          <div className='dashboard-list-project-member-list'>
            {project.members.map(member => (
              member && <Avatar
                key={member.address}
                first_name={member.first_name}
                last_name={member.last_name}
                avatar_url={member.avatar_url}
                small
              />
            ))}
          </div>
          <div
            className='dashboard-invite-members-button'
            onClick={() => setShowInviteMembersModal(project.passphrase)}>
            <Icon name='plus.svg' size='very-small' />
            Invite members
          </div>
        </div>
      </div>
      <div className='dashboard-list-project-entry-points'>
        {/* only allow expanding entry points list if there are some */}
        {project.entryPoints.length > 0 && (
          <div
            className='dashboard-list-project-entry-point-button'
            onClick={() => setShowEntryPoints(!showEntryPoints)}>
            {/*<img className='entry-point-button-image' src='img/door-open.png' />*/}
            {project.entryPoints.length} entry point
            {project.entryPoints.length === 1 ? '' : 's'}
            <Icon
              name='line-angle-down.svg'
              size='very-small'
              className={`grey ${showEntryPoints ? 'active' : ''}`}
            />
          </div>
        )}
        {showEntryPoints && (
          <div className='dashboard-list-project-entry-point-expanded'>
            {project.entryPoints.map(entryPoint => {
              const dotStyle = {
                backgroundColor: entryPoint.color,
              }
              return (
                <NavLink
                  to={`/project/${project.cellId}/map?entryPoints=${entryPoint.address}`}
                  className='entry-point-item'>
                  <div className='entry-point-color-dot' style={dotStyle} />
                  <div className='entry-point-name'>{entryPoint.content}</div>
                </NavLink>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
