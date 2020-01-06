/**
 * Check if an email is valid by matching it with a regular expression
 * @param {string} emailAddress 
 * @return {boolean} false if not valid, true if valid
 */
const isEmail = (emailAddress) => {
    let emailRegEx = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
    return emailRegEx.test(String(emailAddress).toLowerCase());
}

export default isEmail;