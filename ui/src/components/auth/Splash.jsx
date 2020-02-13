import * as React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Button, Container, Form, FormGroup, Input} from 'reactstrap'; 

//https://developers.google.com/identity/sign-in/web/reference#gapiauth2getauthinstance

export default class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    sendMessage = e => {
        e.preventDefault();
        const message = { message: e.target.elements.message.value };
        axios.post("/api/message", message);
        console.log(e.target.elements.message.value)
        e.target.elements.message.value = "";
    }

    render() {    
        return (
          <div className="Landing-Component">
              <Container>
                <h1 className="large-header">welcome</h1>
                <br/><br/> 
                <form onSubmit={e => this.sendMessage(e)}>
                    <Input type="text" placeholder="Enter your name..." id="message" name="message" />
                    <Button type="submit">Send</Button>
                </form>
              </Container>
          </div>
        );
    }
}