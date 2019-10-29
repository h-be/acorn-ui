import React from 'react'
import './GuideBook.css'
import Tabs from '../Tabs/Tabs'

export default class GuideBook extends React.Component{
  render(){
    return(
      <div id="guide-book">
        <h4>Guide Book</h4>
        <Tabs
          tabs={[ {title: 'Getting Started'}, {title: "How To's"}, {title: 'Shortcuts'}, {title: 'FAQ'}]}
        >
          <div>
              <p className='instructions'>Hold down 'g' and click anywhere to start creating a Goal</p>
              <p className='instructions'>Click on a node to select it</p>
              <p className='instructions'>With a node selected, hold down 'g' and click anywhere to create a connected (child) Goal</p>
              <p className='instructions'>Press 'Esc' to close the Goal creator and deselect Goals</p>
              <p className='instructions'>Press 'Delete' to archive a Goal</p>
          </div>          
        </Tabs>
      </div>
    )
  }
}