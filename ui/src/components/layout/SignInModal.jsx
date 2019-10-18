import * as React from 'react'; 

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
                        Sign in with Google
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