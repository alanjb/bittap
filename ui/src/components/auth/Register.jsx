import * as React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Button, Container, Form, FormGroup, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { isEmail, isPassword, isPasswordMatch}  from '../../validation/index';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import config from '../../app.config';

export default withAuth(
  class Register extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        isSubmitButtonEnabled: false,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        isEmailInputValid: false,
        isPasswordInputValid: false, 
        isPasswordConfirmationMatch: false,
        sessionToken: null
      };

      this.oktaAuth = new OktaAuth({ url: config.url });
    }

    handleChange = (event) => {
      //www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
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
        console.log(validation);
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
      else if(name === 'password'){
        const { isPasswordInputValid } = this.state;
        validation = isPassword(value); //calls validation email module
        // this.handleValidateEmailRegister(isEmailValid); //pass into below function current state
        console.log(validation);
        // this.handleValidationText(name, validation);
        if(validation===true && isPasswordInputValid===false){
          // this is async
          this.setState({
            isPasswordInputValid: true
          }, function () {
            this.handleValidationText(this.state)}.bind(this)); 
        }
        if(validation===false && isPasswordInputValid===true){
          // this is async
          this.setState({
            isPasswordInputValid: false
          }, function () {
            this.handleValidationText(this.state)}.bind(this)); 
        }
      } 
      else if(name === 'confirmPassword'){
        const { isPasswordInputValid, isPasswordConfirmationMatch } = this.state;
        validation = isPassword(value, isPasswordInputValid); //calls validation email module
        // this.handleValidateEmailRegister(isEmailValid); //pass into below function current state
        // console.log(validation);
        // this.handleValidationText(name, validation);
        if(validation===true && isPasswordConfirmationMatch===false){
          // this is async
          this.setState({
            isPasswordConfirmationMatch: true
          }, function () {
            this.handleValidationText(this.state)}.bind(this)); 
        }
        if(validation===false && isPasswordConfirmationMatch===true){
          // this is async
          this.setState({
            isPasswordConfirmationMatch: false
          }, function () {
            this.handleValidationText(this.state)}.bind(this)); 
        }
      } 
    }

    handleValidationText = () => {
      let validationTextClassesArray = 
        [
          "validation-text ", 
          "validation-text removeEmailValidation", 
          "validation-text removePasswordValidation", 
          "validation-text removePasswordConfirmValidation", 
        ]; 
      return validationTextClassesArray;
    }

    handleEnableSubmitButton = () => {
      const { isEmailInputValid,  isPasswordInputValid, isPasswordConfirmationMatch} = this.state;
      if(isEmailInputValid && isPasswordInputValid && isPasswordConfirmationMatch){
        console.log()
        //enable submit button if all validations pass
        document.getElementById("register-button").removeAttribute("disabled");
      } 
    }

    handleSubmit = async(event) => {
      event.preventDefault();
      // create a new user object 
      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      }
      axios.post('http://localhost:8080/register', newUser, { headers: { 'Content-Type': 'application/json', }})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(function (error) {
        console.error("test");
        console.error(error);
      });
    }

    render() {
      const {firstName, lastName, password, email, isEmailInputValid, isPasswordInputValid, isPasswordConfirmationMatch} = this.state;
      let validationTextClassesArray = this.handleValidationText();
      let validationEmailTextClasses = validationTextClassesArray[0];
      let validationPasswordTextClasses = validationTextClassesArray[0]
      let validationPasswordConfirmTextClasses = validationTextClassesArray[0];

      console.log(validationPasswordConfirmTextClasses)

      if(isEmailInputValid){
        validationEmailTextClasses = validationTextClassesArray[1];
      } 

      if(isPasswordInputValid){
        validationPasswordTextClasses = validationTextClassesArray[2];
      } 
      
      if(!isPasswordConfirmationMatch){
        validationPasswordConfirmTextClasses = validationTextClassesArray[0];
      } else {
        validationPasswordConfirmTextClasses = validationTextClassesArray[3];
      }

      if(isEmailInputValid && isPasswordInputValid && isPasswordConfirmationMatch){
        this.handleEnableSubmitButton();
      }

      return (
      <div className="Register-Component">
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <br/>
            <h1 className="header">Bittap</h1>
            <br></br>
            <FormGroup>
              <Input type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => this.handleChange(e)} placeholder="First Name"/>
              <br></br>
            </FormGroup>
            <FormGroup>
              <Input type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => this.handleChange(e)} placeholder="Last Name"/>
              <br></br>
            </FormGroup>
            <FormGroup>
              <Input type="email" name="email" id="email" value={email} onChange={(e) => this.handleChange(e)} placeholder="Email Address"/>
              <p className={validationEmailTextClasses}>Enter a valid email</p>
              <br></br>
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" id="password" value={password} onChange={(e) => this.handleChange(e)} placeholder="Password"/>
              <p className={validationPasswordTextClasses}>Enter a password with at least 5 characters and one number</p>
              <br></br>
            </FormGroup>
            <FormGroup>
              <Input type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => this.handleChange(e)} placeholder="Confirm Password"/>
              <p className={validationPasswordConfirmTextClasses}>Enter a password with at least 5 characters and one number</p>
              <br></br>
            </FormGroup>
            <Button className="register-button" id="register-button" color="primary" label="Register" disabled>Register</Button>
            <br/>
            <br></br>
              <p className="text">Already on Bittap? <Link to="/">Sign in</Link></p>
              <br/>
            <br/>
            <br/>
            <br/>
          </Form>
        </Container>
      </div>);
    }
  }
)