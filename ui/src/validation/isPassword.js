/**
 * Check if a password is valid by matching it with a regular expression
 * @param {string} password 
 * @return {boolean} false if not valid, true if valid
 */
const isPassword = (password) => {
    const MIN_PASSWORD_LENGTH = 6;
    const hasNumber = /\d/;
    let doesPasswordHaveNumber = hasNumber.test(password); 
    if(password.length>=MIN_PASSWORD_LENGTH && doesPasswordHaveNumber === true){
        return true;
    } else{
        return false;
    }
}

export default isPassword;