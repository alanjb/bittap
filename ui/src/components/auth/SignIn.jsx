import * as React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Button, Container, Form, FormGroup, Input} from 'reactstrap';
import { isEmail }  from './../../validation/index';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

export default withAuth(
  class SignIn extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isSubmitButtonEnabled: false,
      email: "",
      password: "",
      isEmailInputValid: false,
      isPasswordInputValid: false, 
      sessionToken: null,
      error: null,
    };
    // this.oktaAuth = new OktaAuth({ url: props.baseUrl });
  }

  onSignIn = (googleUser) => {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name= event.target.name;
    let validation;
    this.setState({
      ...this.state,
      [event.target.name]: value //setting the email state to whatever the user has inputted 
    });
    // console.log(event.target.name + ":" + event.target.value);
    if(name === 'email'){
      const {isEmailInputValid} = this.state;
      validation = isEmail(value); //calls validation email module
      // this.handleValidateEmailRegister(isEmailValid); //pass into below function current state
      // this.handleValidationText(name, validation);
      if(validation===true && isEmailInputValid===false){
        // this is async
        this.setState({
          isEmailInputValid: true
        }, function () {
          this.handleValidationText(this.state)}.bind(this)); 
      }
      if(validation===false && isEmailInputValid===true){
        // this is async
        this.setState({
          isEmailInputValid: false
        }, function () {
          this.handleValidationText(this.state)}.bind(this)); 
      }
    } 
  }

  handleValidationText = () => {
    let validationTextClassesArray = ["validation-text ", "validation-text removeEmailValidation"]; 
    return validationTextClassesArray;
    // console.log("updated email validation from other function: " + this.state.isEmailInputValid);
  }

  handleEnableSubmitButton = () => {
    const { isEmailInputValid } = this.state;
    if(isEmailInputValid){
      //enable submit button if all validations pass
      document.getElementById("signin-button").removeAttribute("disabled");
    }
  }

  handleSubmit = async(event) => {
    // console.log('submit clicked!');
    event.preventDefault();
    // create a new user object 
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.oktaAuth
      .signIn({
        user
      })
      .then(res=>{
        this.setState({
          sessionToken: res.sessionToken
        });
      })
      .catch(err => {
        this.setState({ error: err.message });
        console.log(err.statusCode + ' error', err);
      });

    axios.post('http://localhost:8080/', user, { headers: { 'Content-Type': 'application/json', }})
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const {firstName, lastName, password, email, isSubmitButtonEnabled, isEmailInputValid} = this.state;
    let validationTextClassesArray = this.handleValidationText();
    let validationTextClasses = validationTextClassesArray[0];
    if(isEmailInputValid){
      validationTextClasses = validationTextClassesArray[1]; 
    } 
    this.handleEnableSubmitButton();

    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    const errorMessage = this.state.error ? (
      <span className="error-message">{this.state.error}</span>
    ) : null;

    return (
      <div className="SignIn-Component">
        <Container>
          <Form onSubmit={this.handleSubmit}>
            {errorMessage}
            <br/>
            <h1 className="header">Bittap</h1>
            <br></br>
            <FormGroup>
              <Input type="email" name="email" id="email" value={email} onChange={(e) => this.handleChange(e)} placeholder="Email Address"/>
              <p className={validationTextClasses}>Enter a valid email</p>
              <br></br>
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" id="password" value={password} onChange={(e) => this.handleChange(e)} placeholder="Password"/>
              <br></br>
            </FormGroup>
            <Button className="register-button" id="signin-button" color="primary" label="Register" disabled>Sign in</Button>
            <br/>
            <FormGroup>
              <br></br>
              <p className="text">Don't have a Bittap account? <Link to="/register">Register here</Link></p>
              <br/>
            </FormGroup>
            <br/>
            <div class="g-signin2" data-onsuccess="onSignIn">Sign in with Google</div>
            <br/>
            <br/>
          </Form>
        </Container>
      </div>
    );
  }
}
);