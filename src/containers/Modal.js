import React from 'react';
import Login from './Login';
import Signup from './SignUp';


class Modal extends React.Component {
  state = {
    showSignup: false
  }

  signupToggle = () => {
    this.setState({
      showSignup: !this.state.showSignup
    });
  }

  render() {

    const { showSignup } = this.state

    return (

      <div>

        {showSignup ?
          <Signup toggle={this.props.toggle} isOpen={this.props.isOpen} signupToggle={this.signupToggle} showSignup={showSignup} /> :
          <Login toggle={this.props.toggle} isOpen={this.props.isOpen} signupToggle={this.signupToggle} showSignup={showSignup}
            toggleNotice={this.props.toggleNotice} showMessage={this.props.showMessage}
          />}
      </div>
    );
  }
}

export default Modal;


