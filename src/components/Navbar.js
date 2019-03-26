import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import Modal from '../containers/Modal';
import { Link } from "react-router-dom"


export default class NavBar extends React.Component {

  state = {
    isOpen: false
  };

  // isOpen is a command to show modal

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    this.forceUpdate()
  }

  render() {
    const { isOpen, showLogin, logout } = this.state
    return (
      <div>
        {isOpen ? <Modal toggle={this.toggle} isOpen={isOpen} toggleNotice={this.props.toggleNotice} showMessage={this.props.showMessage}
        /> : null}
        {/* passing toggle to Modal */}
        <Navbar color="light" light expand="md">
          {/* <NavbarBrand href="/">Let's Go!</NavbarBrand> */}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className='mr-3' >
                <Link to="/">Home</Link>
              </NavItem>
              {localStorage.getItem("jwt") ?
                <NavItem className='mr-3'>
                  <Link to="/myprofile">Profile Page</Link>
                </NavItem> :
                <NavItem className='mr-3'>

                </NavItem>
              }

              {localStorage.getItem("jwt") ?
                <NavItem className='mr-3'>
                  <Link to="/" onClick={this.logout}>Log Out</Link>
                </NavItem> :
                <NavItem className='mr-3'>
                  <Link to="/" onClick={this.toggle}>Log In / Sign Up</Link>
                  {/* this will take in toggle function to make isOpen true. In line 31, we will have log in modal running. */}
                </NavItem>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
