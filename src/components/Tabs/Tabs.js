import React from 'react';
import './Tabs.css'

export default class Tabs extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {
      selected: parseInt(this.props.selected) || null 
    }

    this.handlerToSelectTab  = this.handlerToSelectTab.bind(this)
  }
  
  handlerToSelectTab(i){
    this.setState({
      selected: i
    })
  }

  render() {
    return (
      <div className="tabs">
        <div className="tabs-links">
          {
            this.props.tabs &&
            this.props.tabs.map((t,i)=>(
              <button
                key={i}
                onClick={()=>{this.handlerToSelectTab(i)}} 
                className={`tab-link ${i === this.state.selected ? 'active' : ''}`}>
                  {t.title}
                </button>
            ))
          }
        </div>
        <div className="tabs-contents">
          {
            this.props.children &&
            this.props.children.length ?  

              this.props.children.map((item,i)=>(
                <div key={i} className={`tab-content ${i === this.state.selected ? 'active' : ''}`}>
                  {item}
                </div>
              ))
              
            : 
            <div className={`tab-content ${parseInt(this.props.children.key || 0) === this.state.selected ? 'active' : ''}`}>
              {this.props.children}
            </div>
          }
        </div>
      </div>
    );
  }
}