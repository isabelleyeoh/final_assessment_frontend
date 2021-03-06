import React from 'react';
import axios from 'axios';
import { Route } from "react-router-dom"
import './App.css';

// Components
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import ProfilePage from './pages/ProfilePage';



class App extends React.Component {
  state = {
    users: [],
    hasErrors: false,
    showMessage: false,
  }

  componentDidMount = () => {

    axios({
      method: 'get',
      url: `https://letsgo-my.herokuapp.com/api/v1/users/`,
    })
      .then(result => {
        console.log(result)
        this.setState({
          users: result.data,
          isLoading: false
        })
      })
      // If successful, we do stuff with 'result'
      .catch(error => {
        console.log('ERROR: ', error)
        this.setState({
          hasErrors: true,
          isLoading: false
        })
      });
    // If unsuccessful, we notify users what went wrong
  }

  toggleNotice = () => {
    this.setState({
      showMessage: !this.state.showMessage
    })
  }




  render() {
    const { toggleNotice, showMessage, users } = this.state

    return (
      <>

        <Navbar toggleNotice={toggleNotice} showMessage={showMessage} />
        {showMessage ? <p>You have logged in!</p> : null}

        <div>
          <Route exact path="/" component={props => <Homepage />} />
          <Route path='/myprofile' component={props => <ProfilePage users={users} />} />


        </div>


      </>
    )

  }
}



export default App;
