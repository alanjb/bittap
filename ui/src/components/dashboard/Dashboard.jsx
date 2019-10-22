import * as React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Button, Container, Form, FormGroup, Input} from 'reactstrap';
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

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("outgoing data", data => this.setState({ response: data }));
  }

  // signOut = () => {
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     console.log('User signed out.');
  //   });
  // }
  
  render() {
    const { response } = this.state;
    return (
      <div className="Dashboard-Component">
        <Container>
          <div>
            <InputGroup>
              <Input placeholder="Filter" />
              <Button color="primary" size="lg" active>+</Button>{' '}
            </InputGroup>
          </div>

          <ServerCard/>
          <ServerCard/>
          <ServerCard/>
          


          
          {/* <a href="#" onclick="signOut();">Sign out</a> */}
        </Container>
      </div>
    );
  }
}

export default Dashboard;