import React from 'react'
import './GuideBook.css'
import Tabs from './Tabs/Tabs'
import GettingStarted from './Sections/GettingStarted'
import HowTos from './Sections/HowTos'

export default class GuideBook extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      tabSelected: null,
      sectionSelected: null,
      tabs: [ {title: 'Getting Started'}, {title: "How To's"}, {title: 'Shortcuts'}, {title: 'FAQ'}],
    }

    this.handleSelectTab = this.handleSelectTab.bind(this)
    this.handleSelectSection = this.handleSelectSection.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
  }

  handleSelectTab(tab){
    this.setState({ tabSelected: tab, sectionSelected: null })
  }

  handleSelectSection(section){
    this.state.tabs.map((tab,index)=>{
      if(tab.title === section.tab){
        this.setState({ tabSelected: index })
      }
      this.setState({
        sectionSelected: section.url
      })
    })
  }

  handleGoBack(){
    this.setState({ sectionSelected: null })
  }

  render(){
    return(
      <div id="guide-book">
        <h2 className="guidebook-title">Guide Book</h2>
        <Tabs
          tabs={this.state.tabs}
          selected={this.state.tabSelected}
          toSelectTab={this.handleSelectTab}
        >
            <GettingStarted
              sectionSelected={this.state.sectionSelected}
              selectSection={this.handleSelectSection}
              goBack={this.handleGoBack}
            />

            <HowTos 
              sectionSelected={this.state.sectionSelected}
              selectSection={this.handleSelectSection}
              goBack={this.handleGoBack}
            />
        </Tabs>
      </div>
    )
  }
}