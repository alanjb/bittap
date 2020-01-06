import { SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILURE } from "../actions/actionTypes";

const initialState = {
    isSignedIn: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case  SIGNIN_USER_SUCCESS: {
        // const { id, content } = action.payload;
        return {
            ...state, 
            isSignedIn: true
        }
      }
      case SIGNIN_USER_FAILURE: {
        const { id } = action.payload;
        return {
            ...state, 
            isSignedIn: false
        };
      }
      default:
        return state;
    }
  }