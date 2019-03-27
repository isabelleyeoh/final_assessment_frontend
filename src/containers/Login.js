import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Form, Label, Input } from 'reactstrap';
import axios from 'axios';

class Login extends React.Component {

  state = {
    email: "",
    password: "",
    response: "",
    hasErrors: false,
    statusLogin: false

  };

  submitLogin = (e) => {

    e.preventDefault();

    axios({
      method: 'post',
      url: 'https://letsgo-my.herokuapp.com/api/v1/sessions/login',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(result => {
        console.log(result)
        localStorage.setItem('jwt', JSON.stringify(result.data))
        this.setState({
          response: result.data.message,
          statusLogin: true
        })
        window.alert(this.state.response)

      })

      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log('ERROR: ', error)
        this.setState({
          response: error,
          hasErrors: true
        })
        window.alert(this.state.response)
      })

  }

  loginSuccessful = () => {
    this.setState({
      statusLogin: !this.state.statusLogin
    })

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {

    const { toggle, signupToggle, showSignup } = this.props;
    const { statusLogin } = this.state


    return (



      <Modal isOpen={!showSignup} toggle={toggle} >
        <ModalHeader toggle={toggle}>Log in</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="email" value={this.state.email} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="examplePassword" placeholder="password" value={this.state.password} onChange={this.handleChange} />
            </FormGroup>

          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={signupToggle}>Show Sign up</Button>
          <Button color="primary" onClick={this.submitLogin}>Login</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>


      </Modal >


    );
  }
}

export default Login;


