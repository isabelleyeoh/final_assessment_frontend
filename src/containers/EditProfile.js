import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class EditProfile extends React.Component {
	state = {
		username: "",
		password: "",
		response: "",
		hasError: true
	}



	handleChange = (e) => {

		this.setState({
			[e.target.name]: e.target.value
		})
	}



	updateAccount = (e) => {

		e.preventDefault();


		// const jwt = localStorage.getItem('jwt')
		const jwt = JSON.parse(localStorage.jwt)

		axios({
			method: 'post',
			url: 'https://letsgo-my.herokuapp.com/api/v1/users/updateprofile',
			headers: {
				Authorization: `Bearer ${jwt.auth_token}`
			},
			data: {
				username: this.state.username,
				password: this.state.password

			}
		})
			.then(result => {
				console.log(result)
				this.setState({
					response: result.data.message,
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
			});

	}

	render() {


		return (
			<>

				<Form>
					<FormGroup>
						<Label for="exampleUsername">Username</Label>
						<Input type="username" name="username" id="exampleUsername" placeholder="username" onChange={this.handleChange} />
					</FormGroup>

					<FormGroup>
						<Label for="examplePassword">Password</Label>
						<Input type="password" name="password" id="examplePassword" placeholder="password" onChange={this.handleChange} />
					</FormGroup>
					<Button onClick={this.updateAccount}>Submit</Button>
				</Form>



			</>
		)
	}


}



export default EditProfile;
