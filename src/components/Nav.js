import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setCurrentUser, muteMusic } from '../redux/actions'
import { Menu, Icon } from 'semantic-ui-react'

class Nav extends React.Component {
  logout = () => {
    this.props.setCurrentUser(null)
    localStorage.clear()
  }

  muteMusic = () => {
    this.props.muteMusic()
  }

  render() {
    return (
      <div id='nav'>
        <Menu size='small' inverted>
          <Menu.Menu position='left'>
            <Menu.Item
              as={NavLink}
              to='/users'>
              <Icon name='rocket'/>
            </Menu.Item>

            {this.props.muted ?
              <Menu.Item onClick={this.muteMusic}>
                <Icon name='play circle outline'/>
              </Menu.Item>
              :
              <Menu.Item onClick={this.muteMusic}>
                <Icon name='pause circle outline'/>
              </Menu.Item>
            }
          </Menu.Menu>
          <Menu.Menu position='right'>
            <Menu.Item
                as={NavLink}
                exact
                to='/'>
              <Icon name='home'/>
            </Menu.Item>
            <Menu.Item
                as={NavLink}
                exact
                to='/about' >
              <Icon name='question circle outline'/>
            </Menu.Item>
            <Menu.Item
                as={NavLink}
                exact
                to='/edit'>
              <Icon name='edit'/>
            </Menu.Item>
            {this.props.currentUser ?
              <Menu.Item
                onClick={this.logout}>
                <Icon name='log out'/>
              </Menu.Item>
              :
              <Menu.Item
                as={NavLink}
                exact
                name="Login"
                to='/login' />
            }
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { currentUser: state.currentUser, muted: state.muted }
}

export default connect(mapStateToProps, { setCurrentUser, muteMusic })(Nav)
