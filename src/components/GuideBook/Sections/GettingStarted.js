import React from 'react'
import { NavItemsGroup } from '../GuideBook'

export default class GettingStarted extends React.Component{

  constructor(props){
    super(props)
    this.state = { selectd: null }

    this.handleSelectSection = this.handleSelectSection.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
  }

  handleSelectSection(section){
    this.setState({
      selectd: section
    })
  }

  handleGoBack(url){
    this.setState({
      selectd: url
    })
  }

  render(){
    const navItems = [
      {
        title: 'Basic',
        submenu: [
            { title: 'Create a Card', url: 'create_card'},
            { title: 'Add a child card to an existing card', url: 'add_child_card'},
            { title: 'Change card title', url: 'change_card_title'},
            { title: 'Associate members with a card', url: 'associate_members_with_card' },
            { title: 'change card status', url: 'change_card_status' },
            { title: 'select multiple cards', url: 'select_multiple_cards' },
        ]
      }
    ]

    switch(this.state.selectd){
      case 'create_card': 
        return <Test goBack={this.handleGoBack} />
        break;
      case 'add_child_card':
        return <></> 
      default:
        return(
          <div id="getting-started">
            {          
              <>
              <h3>Welcome to acorn!</h3>
                <NavItemsGroup 
                  items={navItems}
                  selectSection={ this.handleSelectSection }
                />
              </>

            }

            {/* <p className='instructions'>Hold down 'g' and click anywhere to start creating a Goal</p>
            <p className='instructions'>Click on a node to select it</p>
            <p className='instructions'>With a node selected, hold down 'g' and click anywhere to create a connected (child) Goal</p>
            <p className='instructions'>Press 'Esc' to close the Goal creator and deselect Goals</p>
            <p className='instructions'>Press 'Delete' to archive a Goal</p> */}
          </div>  
        ) 
    }
  }
}

const Test = (props) => (
  <div>
    <button type="button" onClick={props.goBack}></button>
    <h1>aja</h1>
  </div>
)