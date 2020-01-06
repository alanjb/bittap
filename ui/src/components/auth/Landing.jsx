import * as React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Button, Container, Form, FormGroup, Input} from 'reactstrap'; 
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

export default class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    onSignIn = (googleUser) => {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    };

    render() {    
        return (
          <div className="Landing-Component">
              <Container>
                <h1 className="large-header">Engage with the Blockchain</h1>
                <h6 className="">
                    I now offer flat rate hosting with zero maintenance/hosting fees. 
                    You will only pay a flat power rate of 10.5 cents per kWh. 
                    This will essentially include the maintenance and allow you as 
                    a miner to focus on your efficiency per kWh, one of the most important 
                    aspects of mining. As the business hopefully grows with support from you all, 
                    I aim to reduce the cost per kWh available by 10-20%, thus increasing your 
                    profit percentage ratio equally and promoting expansion at the same time. 

                </h6>
              </Container>
          </div>
        );
    }
}