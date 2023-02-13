const SecurePassword = require('../libs');

const password = "ThisIsAGoodPasswordIn2023!";
const secPwd = SecurePassword.GenerateSecurePassword(password);
console.log(secPwd);
// example output
// {
//     hash: '967bdb3665fe6001ca4d2f8b5b2a799abad7c51476a86bb9b1a27c0ad6065494634591177a8d9f233f38354704bdfede27b10753ed6f26f0a95dcacdd9dee03b',
//     salt: 'qTM9m3QRVYQLFtpD2AjcHrEv0fGeA5Kex14NzWwYRdg=',
//     iterations: 6593
// }

const validatePwd = SecurePassword.VerifySecurePassword(secPwd, password);
//return Boolean
console.log(validatePwd);