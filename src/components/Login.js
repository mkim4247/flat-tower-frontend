import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {settingCurrentUser} from '../redux/actions'
import { withRouter } from 'react-router'

class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      username: "",
      password: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLoginSubmit = (event) => {
    this.props.settingCurrentUser(this.state)
  };

  render(){
    return(
      <div className='login-form'>
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
        height: 100%;
      }`}</style>

      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 500 }}>
        <Header id='login-header' color='black' textAlign='center' size='huge'>
          Login Here
        </Header>
        <Form size='large' onSubmit={this.handleLoginSubmit}>
         <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' label='Enter Username:' type='text' name='username' onChange={this.handleChange} placeholder="username"/>
          <Form.Input fluid icon='lock' iconPosition='left' label='Password:' type='password' name='password' onChange={this.handleChange} placeholder="password"/>
          <Button fluid icon='lock' iconPosition='left'> Login </Button>
          </Segment>
        </Form>

      </Grid.Column>
      </Grid>
      </div>
    )
  }

}


export default connect(null, {settingCurrentUser})(Login)
