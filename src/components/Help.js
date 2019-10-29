import React, { useState } from 'react'
import Tabs from './Tabs/Tabs'

export default function Help() {
    // Declare a new state variable, which we'll call "isOpen"
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='instructions_wrapper'>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close' : 'Open'} Instructions
            </button>
            {isOpen &&
                <div id="guide-book">
                    <h4>Guide Book</h4>
                    <Tabs 
                    tabs={[ {title: 'Getting Started'}, {title: "How To's"}, {title: 'Shortcuts'}, {title: 'FAQ'}]} >
                        <div>
                            <p className='instructions'>Hold down 'g' and click anywhere to start creating a Goal</p>
                            <p className='instructions'>Click on a node to select it</p>
                            <p className='instructions'>With a node selected, hold down 'g' and click anywhere to create a connected (child) Goal</p>
                            <p className='instructions'>Press 'Esc' to close the Goal creator and deselect Goals</p>
                            <p className='instructions'>Press 'Delete' to archive a Goal</p>
                        </div>
                    </Tabs>
                </div>
            }
        </div>
    )
}