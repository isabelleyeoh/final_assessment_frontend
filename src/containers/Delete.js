import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';


class Delete extends React.Component {
	state = {
		hasError: true,
		response: ""
	}

	deleteAccount = (e) => {

		e.preventDefault();

		const jwt = JSON.parse(localStorage.jwt)

		axios({
			method: 'post',
			url: 'https://letsgo-my.herokuapp.com/api/v1/users/delete',
			headers: {
				Authorization: `Bearer ${jwt.auth_token}`
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


				<div className='form-delete'>
					<div>
						<h5>Delete account</h5>
					</div>
					<Button onClick={this.deleteAccount}>Delete</Button>
				</div>




			</>
		)
	}


}



export default Delete;
