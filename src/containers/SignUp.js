import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Form, Label, Input } from 'reactstrap';
import axios from 'axios';


class Signup extends React.Component {

  state = {
    username: "",
    email: "",
    password: "",
    response: ""
  };

  submitSignup = (e) => {

    e.preventDefault();

    axios({
      method: 'post',
      url: 'https://letsgo-my.herokuapp.com/api/v1/users/',
      data: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(result => {
        console.log(result)
        localStorage.setItem('jwt', JSON.stringify(result.data));
        this.setState({
          response: result.data.message
        })
        window.alert(this.state.response)

      })

  }


  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })
  }



  render() {

    const { toggle, isOpen, signupToggle, showSignup } = this.props;


    return (
      <div>

        <Modal isOpen={showSignup} toggle={toggle}>
          <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleUsername">Username</Label>
                <Input type="username" name="username" id="exampleUsername" placeholder="username" value={this.state.username} onChange={this.handleChange} />
              </FormGroup>
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
            <Button color="danger" onClick={signupToggle}>Show Log In </Button>
            <Button color="primary" onClick={this.submitSignup}>Signup</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>


        </Modal>



      </div>
    );
  }
}

export default Signup;


