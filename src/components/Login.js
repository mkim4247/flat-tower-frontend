import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { settingCurrentUser } from '../redux/actions'
import { Button, Form, Grid, Header, Segment, Message, Modal } from 'semantic-ui-react'

class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      username: "",
      password: "",
      showModal: false
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  handleLoginSubmit = (event) => {
    this.props.settingCurrentUser(this.state)
  };

  openModal = () => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  render(){
    const { showModal } = this.state

    return(
      <div className='login-form'>
        <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
            height: 100%;
            }`}
        </style>

        <div id='login-header'>
          SPACE BASE
        </div>
        
        <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 300 }}>
            <Button onClick={this.openModal}>
              START GAME
            </Button>
          </Grid.Column>
        </Grid>

        <Modal
          basic
          size='large'
          onClose={this.closeModal}
          open={showModal}
          dimmer='blurring'
          closeIcon>
        <Modal.Actions>
          <Grid
              textAlign='center'
              style={{ height: '100%' }}
              verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 300 }}>
          <Form inverted size='large' onSubmit={this.handleLoginSubmit}>
            <Segment inverted stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                label='Enter Username:'
                type='text'
                name='username'
                onChange={this.handleChange}
                placeholder="username"/>
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                label='Password:'
                type='password'
                name='password'
                onChange={this.handleChange}
                placeholder="password"/>
              <Button> Login </Button>
            </Segment>
          </Form>
          <Segment inverted>
          <Message>
            <Link to='/new'>
              CREATE AN ACCOUNT
            </Link>
          </Message>
          </Segment>
        </Grid.Column>
      </Grid>
        </Modal.Actions>

        </Modal>
      </div>
    )
  }

}


export default connect(null, { settingCurrentUser })(Login)