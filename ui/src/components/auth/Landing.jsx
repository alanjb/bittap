import * as React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Button, Container, Form, FormGroup, Input} from 'reactstrap'; 
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

//https://developers.google.com/identity/sign-in/web/reference#gapiauth2getauthinstance

export default class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }
      
    onSignIn = (googleUser) => {
        console.log(googleUser)
        let profile = googleUser.getBasicProfile();
        // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        let x = profile.getName();
        console.log(x);
        // return profile.getName();
    };

    render() {    
        return (
          <div className="Landing-Component">
              <Container>
                <h1 className="large-header">welcome</h1>
              </Container>
          </div>
        );
    }
}