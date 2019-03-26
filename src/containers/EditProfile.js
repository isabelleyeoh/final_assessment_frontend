import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class EditProfile extends React.Component {
	state = {
		username: "",
		password: "",
		success: [],
		error: [],
		hasError: true
	}

	onChangeUsername = (e) => {
		this.setState({
			username: e.target.value
		})
	}

	onChangePassword = (e) => {
		this.setState({
			password: e.target.value
		})
	}


	updateAccount = (e) => {

		// const jwt = localStorage.getItem('jwt')
		const jwt = JSON.parse(localStorage.jwt)

		axios({
			method: 'post',
			url: `http://localhost:5000/api/v1/users/updateprofile`,
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
					success: result.data.message,
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


		return (
			<>

				<Form>
					<FormGroup>
						<Label for="exampleUsername">Username</Label>
						<Input type="username" name="username" id="exampleUsername" placeholder="username" onChange={this.onChangeUsername} />
					</FormGroup>

					<FormGroup>
						<Label for="examplePassword">Password</Label>
						<Input type="password" name="password" id="examplePassword" placeholder="password" onChange={this.onChangePassword} />
					</FormGroup>
					<Button onClick={this.updateAccount}>Submit</Button>
				</Form>



			</>
		)
	}


}



export default EditProfile;
