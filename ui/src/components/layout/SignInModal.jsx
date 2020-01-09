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
            signInModalClasses = 'signinmodal-component opened';
        }
        else{
            signInModalClasses = 'signinmodal-component '
        }
        return(
            <React.Fragment>
                <div className={signInModalClasses}>
                    <div className="signinmodal-component signinwithgoogle">
                        <a href="https://dev-110361.okta.com/oauth2/v1/authorize?idp=0oa2ei4u0toSEXE0x357&client_id=0oa2eraf6jA4etZqH357&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=http://localhost:3000/dashboard&state=123&nonce=456">
                        Sign in with Google
                            {/* <div className="g-signin2" data-onsuccess="onSignIn"></div> */}
                        </a>
                        {/* <NavLink to="/dashboard"> Sign in </NavLink> */}

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