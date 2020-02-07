import React from 'react'
import './GuideBook.css'
import Tabs from './Tabs/Tabs'
import GettingStarted from './Sections/GettingStarted'
import HowTos from './Sections/HowTos'
import Shortcuts from './Sections/Shortcuts'

export default class GuideBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabSelected: 0,
      sectionSelected: null,
      tabs: [
        //{ title: 'Getting Started' },
        { title: 'How To' },
        { title: 'Shortcuts' },
        // { title: 'FAQ' },
      ],
    }

    this.handleSelectTab = this.handleSelectTab.bind(this)
    this.handleSelectSection = this.handleSelectSection.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
  }

  handleSelectTab(tab) {
    this.setState({ tabSelected: tab, sectionSelected: null })
  }

  handleSelectSection(section) {
    this.state.tabs.map((tab, index) => {
      if (tab.title === section.tab) {
        this.setState({ tabSelected: index })
      }
      this.setState({
        sectionSelected: section,
      })
    })
  }

  handleGoBack() {
    this.setState({ sectionSelected: null })
  }

  render() {
    return (
      <div className='guidebook-wrapper'>
        <h2 className='guidebook-title'>Guidebook</h2>
        <Tabs
          tabs={this.state.tabs}
          selected={this.state.tabSelected}
          toSelectTab={this.handleSelectTab}>
          {/* <GettingStarted
            sectionSelected={this.state.sectionSelected}
            selectSection={this.handleSelectSection}
            goBack={this.handleGoBack}
          /> */}

          <HowTos
            sectionSelected={this.state.sectionSelected}
            selectSection={this.handleSelectSection}
            goBack={this.handleGoBack}
          />

          <Shortcuts />
        </Tabs>
      </div>
    )
  }
}
