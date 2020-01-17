import React from 'react'
import { Switch, Route } from 'react-router-dom'
import onClickOutside from 'react-onclickoutside'
import GuideBook from '../GuideBook/GuideBook'
import './Header.css'
import Avatar from '../Avatar/Avatar'
import Icon from '../Icon/Icon'
import ListExport from '../ListExport/ListExport'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.clickAvatar = this.clickAvatar.bind(this)
    this.clickBook = this.clickBook.bind(this)
    this.clickStatus = this.clickStatus.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.clickProfile = this.clickProfile.bind(this)
    this.clickSearch = this.clickSearch.bind(this)
    this.clickExport = this.clickExport.bind(this)
    this.loadStatus = this.loadStatus.bind(this)

    this.hover = this.hover.bind(this)
    this.handleStatusEnter = this.handleStatusEnter.bind(this)
    this.handleStatusLeave = this.handleStatusLeave.bind(this)
    this.state = {
      isGuideOpen: false,
      online: {},
      isStatusHover: false,
      isStatusOpen: false,
      lista: {},
      avatar: false,
      isExportOpen: false,
      listaProfile: {},
      listaExport: {},
    }
  }

  componentDidMount() {
    this.changeStatus(
      this.props.whoami ? this.props.whoami.entry.status : 'Online'
    )
    this.setState({
      lista: [
        { color: 'green', img: 'checkmark-circle.svg', title: 'Online' },
        { color: 'yellow', img: 'user-status-away.svg', title: 'Away' },
        { color: 'gray', img: 'user-status-offline.svg', title: 'Offline' },
      ],
      avatar: false,
      listaProfile: [{ title: 'Profile Settings', click: this.clickProfile }],
      listaExport: [
        { title: 'Export as JSON', type: 'json', download: 'table.json' },
        { title: 'Export as CSV', type: 'csv', download: 'table.csv' },
      ],
    })
  }

  handleClickOutside(e) {
    this.setState({
      isProfileOpen: false,
      isExportOpen: false,
      isStatusOpen: false,
      isGuideOpen: false,
    })
  }
  clickProfile(e) {
    this.props.setShowProfileEditForm(true)
    this.setState({
      isProfileOpen: false,
      isExportOpen: false,
      isStatusOpen: false,
      isGuideOpen: false,
    })
  }
  clickAvatar(e) {
    this.setState({
      isProfileOpen: !this.state.isProfileOpen,
      isExportOpen: false,
      isStatusOpen: false,
      isGuideOpen: false,
    })
  }
  hover(bool) {
    this.setState({ avatar: bool })
  }

  clickStatus(e) {
    this.setState({
      isStatusOpen: !this.state.isStatusOpen,
      isExportOpen: false,
      isGuideOpen: false,
      isProfileOpen: false,
    })
  }
  clickExport(e) {
    this.setState({
      isExportOpen: !this.state.isExportOpen,
      isStatusOpen: false,
      isGuideOpen: false,
      isProfileOpen: false,
    })
  }
  clickSearch(e) {}
  saveStatus(status) {
    this.props.updateStatus(status)
    this.changeStatus(status)
  }
  changeStatus(status) {
    switch (status) {
      case 'Online':
        this.setState({
          online: { color: 'green', img: 'checkmark-circle.svg' },
        })
        break
      case 'Away':
        this.setState({
          online: { color: 'yellow', img: 'user-status-away.svg' },
        })
        break
      case 'Offline':
        this.setState({
          online: { color: 'gray', img: 'user-status-offline.svg' },
        })
        break
      default:
        console.error('no definido')
        break
    }
    this.setState({
      isProfileOpen: false,
      isStatusOpen: false,
      isGuideOpen: false,
    })
  }
  clickBook(e) {
    this.setState({
      isGuideOpen: !this.state.isGuideOpen,
      isStatusOpen: false,
      isProfileOpen: false,
    })
  }
  handleStatusEnter() {
    this.setState({ isStatusHover: true })
  }
  handleStatusLeave() {
    this.setState({ isStatusHover: false })
  }
  render() {
    return (
      <div className='header-wrapper'>
        <div className='header'>
          <div className='top-left-panel'>
            <div className='logo'>
              <Icon
                name='acorn-logo-stroked.svg'
                className='logo not-hoverable'
              />
              <p className='logo-name'>acorn</p>
            </div>
            {this.props.whoami && (
              <div className='current-canvas-wrapper'>
                <div className='current-canvas-content'>
                  <Switch>
                    <Route
                      path='/board/map'
                      render={() => (
                        <Icon
                          name='map.svg'
                          className='view-mode grey not-hoverable'
                        />
                      )}
                    />
                    <Route
                      path='/board/priority'
                      render={() => (
                        <Icon
                          name='priority_898989.svg'
                          className='view-mode grey not-hoverable'
                        />
                      )}
                    />
                  </Switch>
                  <div className='canvas-name'>H-BE SoA</div>
                  <div className='divider-line'></div>
                  <Icon
                    name='export.svg'
                    size='header'
                    className={this.state.isExportOpen ? 'purple' : ''}
                    onClick={this.clickExport}
                  />
                </div>
              </div>
            )}
          </div>
          {this.props.whoami && (
            <div className='top-right-panel'>
              {/* <Icon name="search-line.svg" onClick={this.clickSearch}/> */}
              <Icon
                name='guidebook.svg'
                onClick={this.clickBook}
                size='header'
              />
              <div className={this.state.online.color}>
                <div
                  className='avatar_container'
                  onMouseEnter={e => {
                    this.hover(true)
                  }}
                  onMouseLeave={e => {
                    this.hover(false)
                  }}>
                  <Avatar
                    avatar_url={this.props.whoami.entry.avatar_url}
                    highlighted={this.state.isProfileOpen || this.state.avatar}
                    clickable
                    onClick={this.clickAvatar}
                  />
                </div>

                <span
                  onMouseEnter={this.handleStatusEnter}
                  onMouseLeave={this.handleStatusLeave}>
                  {!this.state.isStatusOpen && !this.state.isStatusHover && (
                    <Icon
                      name={this.state.online.img}
                      onClick={this.clickStatus}
                      className='user-status white'
                    />
                  )}
                  {(this.state.isStatusOpen || this.state.isStatusHover) && (
                    <Icon
                      name='user-status-hover.svg'
                      onClick={this.clickStatus}
                      className='user-status white not-hoverable'
                    />
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* TODO: make this show based on whether the user has just recently created their profile (registered) */}
        {!this.state.isGuideOpen && (
          <div className='guidebook_open_help'>
            <div>Click on the Guidebook to learn more</div>
            <img src='img/arrow_curved.svg' />
          </div>
        )}
        {this.state.isGuideOpen && (
          <div className='instructions_wrapper'>
            <GuideBook />
            <Icon
              name='x_a3a3a3.svg'
              size='small-close'
              className='grey'
              onClick={() => {
                this.setState({ isGuideOpen: false })
              }}
            />
          </div>
        )}
        {this.state.isProfileOpen && (
          <div className='profile-wrapper'>
            {Object.keys(this.state.listaProfile).map(key => (
              <ListProfile
                key={key}
                title={this.state.listaProfile[key].title}
                click={this.state.listaProfile[key].click}
              />
            ))}
          </div>
        )}
        {this.state.isStatusOpen && (
          <div className='user-status-wrapper'>
            {Object.keys(this.state.lista).map(key => (
              <ListStatus
                key={key}
                img={this.state.lista[key].img}
                color={this.state.lista[key].color}
                title={this.state.lista[key].title}
                changeStatus={this.loadStatus}
              />
            ))}
          </div>
        )}
        {!this.state.isExportOpen && this.state.isHoverExport && (
          <span className='export-hover-display'>Export</span>
        )}

        {this.state.isExportOpen && (
          <div className='export-wrapper'>
            {Object.keys(this.state.listaExport).map(key => (
              <ListExport
                key={key}
                type={this.state.listaExport[key].type}
                title={this.state.listaExport[key].title}
                download={this.state.listaExport[key].download}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}
const ListStatus = props => {
  return (
    <button
      className={props.color + ' btn'}
      onClick={color => {
        props.changeStatus(props.title)
      }}>
      <Icon name={props.img} className='user-status white not-hoverable' />
      <p>{props.title}</p>
    </button>
  )
}
const ListProfile = props => {
  return (
    <button onClick={props.click}>
      <p>{props.title}</p>
    </button>
  )
}

export default onClickOutside(Header)
