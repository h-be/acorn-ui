import React, { useState } from 'react'
import GuideBook from './GuideBook/GuideBook'

export default function Help() {
    // Declare a new state variable, which we'll call "isOpen"
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='instructions_wrapper'>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close' : 'Open'} Instructions
            </button>
            {isOpen &&
                <GuideBook />
            }
        </div>
    )
}