import React from 'react';
import GetProfile from '../containers/GetProfile';
import EditProfile from '../containers/EditProfile';
import Delete from '../containers/Delete';


// Styles
import '../styles/Profile.css';

class ProfilePage extends React.Component {


    render() {


        return (
            <>
                <div className='form-page'>
                    <div>
                        <GetProfile users={this.props.users} />
                    </div>

                    <div className='form-edit'>
                        <EditProfile />
                    </div>

                    <div className='form-delete'>

                        <Delete />


                    </div>

                </div>


            </>
        )
    }


}



export default ProfilePage;
