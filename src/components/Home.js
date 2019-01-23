import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { settingUserTower, settingAllUsers } from '../redux/actions'
import { Header } from 'semantic-ui-react'
import Nav from './Nav'
import GameContainer from './GameContainer'

class Home extends React.Component {
  componentDidMount(){
    this.props.settingUserTower()
  }

  render(){
    return(
      <div>
        <Nav />
        <div id='home'>
          <div className='home-header'>
            SPACE BASE
          </div>

          <GameContainer />
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return { currentUser: state.currentUser }
}


export default connect(mapStateToProps, { settingUserTower, settingAllUsers })(Home)
