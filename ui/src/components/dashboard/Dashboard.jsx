import * as React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Container, Form, FormGroup, Input} from 'reactstrap';
import socketIOClient from 'socket.io-client';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import ServerCard from '../layout/ServerCard';

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }

  componentDidMount(googleUser) { 
    console.log("dashboard loads now")
    // console.log(googleUser)
    // const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    // socket.on("outgoing data", data => this.setState({ response: data }));
  }

  // signOut() {
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     console.log('User signed out.');
  //   });
  // }
  // }

//   onSignIn = (googleUser) => {
//     let profile = googleUser.getBasicProfile();
//     // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     // console.log('Name: ' + profile.getName());
//     // console.log('Image URL: ' + profile.getImageUrl());
//     // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//     return profile.getName();
// };

  // signOut = () => {
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     console.log('User signed out.');
  //   });
  // }
  
  render() {
    return (
      <div className="Dashboard-Component">
        <Container>
          <div>
          <h1 className="large-header">Dashboard</h1>
            <InputGroup>
              <Input placeholder="Filter..." />
              {/* <Button color="primary" size="lg" active>+</Button>{' '} */}
            </InputGroup>
            
          </div>
          <ServerCard/>
{/* \          <a href="#" onclick="signOut();">Sign out</a> */}
        </Container>
      </div>
    );
  }
}

export default Dashboard;