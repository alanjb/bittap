/**
 * Check if password input attempt matches current password in password input
 * @param {string} 
 * @return {boolean} false if not valid, true if valid
 */
const isPasswordMatch = (passwordAttempt, passwordCurrent) => {
    return passwordAttempt === passwordCurrent
}

export default isPasswordMatch;