import React from 'react';
import axios from 'axios';


class GetProfile extends React.Component {
	state = {
		hasError: true,
		response: ""
	}

	render() {

		const jwt = JSON.parse(localStorage.jwt)
		const users = this.props.users

		return (
			<>

				<div>
					<h4>Hi,{jwt.user.username}. </h4>
					<h5>You may change your username, email and password here.</h5>

				</div>

				<div>
					<small>other users: </small>
					{
						users.map(user =>
							<small key={user}>
								{user.id}=
								{user.username} </small>

						)
					}

				</div>

			</>
		)
	}


}



export default GetProfile;
