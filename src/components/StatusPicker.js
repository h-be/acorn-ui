import React from 'react'
import PropTypes from 'prop-types'

import StatusIcon from './StatusIcon'
import Icon from './Icon'

function StatusPicker({ selectedStatus, statusClicked, onClose }) {

    const statuses = [
        'Uncertain',
        'Incomplete',
        'Complete',
        'InReview'
    ]

    return (
        <div className='status_picker vertical_action_overlay'>
            <Icon className='vertical_action_close' name='x_a3a3a3.svg' size='small-close' onClick={() => onClose()} />
            <div className="popup-title">status</div>
            <div className="status_list">
            {statuses.map(status => (
                <StatusIcon size='small' status={status} selected={selectedStatus === status} onClick={statusClicked} />
            ))}
            </div>
        </div>
    )
}

StatusPicker.propTypes = {
    selectedStatus: PropTypes.string.isRequired,
    statusClicked: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default StatusPicker