import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Login from './components/Login'
import Home from './components/Home'

import {checkingToken} from './redux/actions'
import {connect} from 'react-redux'
import { NavLink, Route, Switch, Redirect, withRouter } from 'react-router'

import 'semantic-ui-css/semantic.min.css'

class App extends Component {

  componentDidMount(){
    let token = localStorage.getItem('token')
    
    if(token){
      this.props.checkingToken(token)
    }
  }

  render() {
    return (
      <div>
          <Switch>
            <Route exact path='/' render={ () => (
                this.props.currentUser ?
                <Home /> : <Redirect to='/login' />
              )} />
            <Route exact path='/login' render={ () => (
              this.props.currentUser ?
              <Redirect to="/" /> : <Login />
              )} />
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, {checkingToken})(App));
