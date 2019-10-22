import * as React from 'react'; 
import { NavLink } from 'react-router-dom'

class SignInModal extends React.Component {
    constructor(props){
        super(props); 
    }
    
    render(){
        let signInModalClasses = 'signinmodal-component';
        const { isOpen } = this.props;
        if(isOpen){
            signInModalClasses = 'signinmodal-component open';
        }
        else{
            signInModalClasses = 'signinmodal-component '
        }
        return(
            <React.Fragment>
                <div className={signInModalClasses}>
                    <div className="signinmodal-component signinwithgoogle">
                        {/* <a href="https://dev-110361.okta.com/oauth2/v1/authorize?idp=0oa1mwheghj9OY4wH357&client_id=0oa1k8lnfkw8m28jq357&response_type=id_token&response_mode=fragment&scope= openid email&redirect_uri=https://www.bittapfinancial.com&state=102219&nonce=102219">
                            <div class="g-signin2" data-onsuccess="onSignIn"></div>
                        </a> */}
                        <NavLink to="/dashboard"> Sign in </NavLink>

                    </div>
                    <div className="signinmodal-component cancel">
                        Cancel
                    </div>
                </div>

            </React.Fragment>
        );
    }
}
export default SignInModal; 