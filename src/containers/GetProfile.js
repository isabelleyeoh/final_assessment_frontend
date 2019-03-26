import React from 'react';
import axios from 'axios';


class GetProfile extends React.Component {
	state = {
		hasError: true,
		username: []
	}

	getDetails = () => {

		const jwt = localStorage.getItem('jwt')

		axios({
			method: 'get',
			url: `http://localhost:5000/api/v1/users/getprofile`,
			headers: {
				Authorization: `Bearer ${jwt.auth_token}`
			}
		})

			.then(result => {
				console.log(result)
				this.setState({
					username: result.data
				})
			})

			.catch(error => {
				// If unsuccessful, we notify users what went wrong
				console.log('ERROR: ', error)
				this.setState({
					hasErrors: true
				})
			});

	}

	render() {

		const { username } = this.state

		return (
			<>

				<div>
					{/* <h4>Hi,{username}. </h4> */}
					<h5>You may change your username, email and password here.</h5>

				</div>

			</>
		)
	}


}



export default GetProfile;
