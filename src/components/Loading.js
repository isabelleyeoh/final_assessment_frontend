import React from 'react';
import { Spinner } from 'reactstrap';


const Loading = (props) => {
	const { type, color } = props
	const loaderStyle = {
		type,
		color
	}

	return (
		<div>
			<Spinner style={loaderStyle} />
		</div>

	)
}


export default Loading;
