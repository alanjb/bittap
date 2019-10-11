import { VALIDATE_EMAIL_REGISTER } from "../actions/actionTypes";

const initialState = {
    isEmailInputValid: false
}

export default function(state = initialState, action) {
    switch (action.type){
        case VALIDATE_EMAIL_REGISTER: {
            const { isEmailInputValid } = action.payload;
            return {
                ...state, 
                isEmailInputValid: isEmailInputValid
            }
        }
        default:
            return state;
    }
}