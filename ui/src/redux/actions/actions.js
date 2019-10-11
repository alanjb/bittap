import { VALIDATE_EMAIL_REGISTER } from "./actionTypes";

//action creator
export const validateEmailRegister = isEmailAddressValid => ({
  type: VALIDATE_EMAIL_REGISTER,
  payload: {
    isEmailAddressValid
  }
});
