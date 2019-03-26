import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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
                        <GetProfile />
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
