import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import Nav from './Nav'
import PresGameContainer from './FriendTowerComponents/PresGameContainer'

class UserProfile extends React.Component {
  render(){
    return(
      <div>
        {this.props.user ?
          <div>
            <Nav />
            <div id='home'>
              <Header inverted size='huge' align='center'>
                {this.props.user.username.toUpperCase()}
              </Header>
              <PresGameContainer tower={this.props.user.tower}/>
            </div>
          </div>
          :
          <Redirect to='/404'/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, routerProps) => {
  return {
    user: state.allUsers.find(user => user.username === routerProps.match.params.username)
  }
}

export default connect(mapStateToProps)(UserProfile)
