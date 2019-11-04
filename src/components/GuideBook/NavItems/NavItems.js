import React from 'react'

export function NavItemsGroup(props) {
  return(
    <nav>
      { 
        props.items &&
        props.items.map((ni,i)=>(
          <NavItem
            key={i}
            id={i}
            title={ni.title}
            icon={ni.icon}
            url={ni.url}
            submenu={ni.submenu}
            className={ni.className}
            selectSection={props.selectSection}
          />
        ))
      }
    </nav> 
  )
}


export class NavItem extends React.Component{
  
  constructor(props){
    super(props)
    this.state ={
      expand: false,
    }
    this.handleExpand = this.handleExpand.bind(this)
  }
  

  handleExpand(){
    this.setState({
      expand: this.state.expand ? false : true
    })
  }

  render(){
    const expand = this.state.expand ? 'active' : ''
    return(
      <section>
      {
        this.props.submenu 
        ?
          <>
          <button 
            className={`nav-item ${this.props.className || ''}`}
            onClick={this.handleExpand}>
            {this.props.title}
            </button>
          <div className={`sidebar-submenu ${expand}`}>
            <ul>
            {
              this.props.submenu.map((ni,i)=>(
                <li key={i}>
                  {/* <NavLink to={ni.url}><span>-</span> {ni.title}</NavLink> */}
                  <button type="button" onClick={()=>{this.props.selectSection(ni)}}>{ni.title}</button>
                </li>
              ))
            }
            </ul>     
          </div>
          </>
        :
        // <NavLink className={`nav-item ${this.props.className || ''}`} to={this.props.url ? this.props.url : '/' }>
        //   {this.props.icon && <img src={this.props.icon} alt=""/> }
        //   {this.props.title && this.props.title}
        // </NavLink>
        <>{ this.props.title} </>
      }
      </section>
    )
  }
}