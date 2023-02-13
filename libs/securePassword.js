const { Base64Encoding, Base64Decoding, HexFormat } = require("./stringCoverter");
const SecPwdUtil = require('./securePasswordUtils');

/**
 * Generate Secure Password
 * @param {String} password -required
 * @param {Object} options - optional
 * @param {Object} options
 * @param {Object} options
 * @returns
 */
const genSecurePassword = (password, options = {}) => {
    try {
        if (!password) throw new Error('Password is required!')
        const opt = SecPwdUtil.SetOptions(options);
        
        const salt = SecPwdUtil.GenerateSalt(opt.saltLength); // return Buffer
        const iterations = SecPwdUtil.GenerateIterationNumber(opt);
    
        const hash = SecPwdUtil.SecurePassword(password, salt, iterations);
    
        // return result with readable format
        const result = {
            hash: HexFormat(hash),
            salt: Base64Encoding(salt),
            iterations: iterations,
        };
    
        return result;        
    } catch (error) {
        return error
    }
};

/**
 *
 * @param {Object} authInfo
 * @param {String} authInfo.hash
 * @param {String} authInfo.salt
 * @param {Number} authInfo.interation
 * @param {String} password
 * @returns
 */
const verifySecurePassword = (authInfo, password) => {
    //convert back salt to Buffer
    const salt = Base64Decoding(authInfo.salt);

    const hashed = SecPwdUtil.SecurePassword(password, salt, authInfo.iterations);
   
    const isVerified = authInfo.hash === HexFormat(hashed);
    return isVerified;
};

module.exports = {
    GenerateSecurePassword: genSecurePassword,
    VerifySecurePassword: verifySecurePassword,
};

// const main = (password, options = {}) => {
//     // return await genSecurePassword(password)
//     let gen = genSecurePassword(password, options);
//     return gen;
// };

// let password = "aku ingin makan";
// console.time("genSecurePassword");
// let x = main(password, {});
// console.timeEnd("genSecurePassword");
// console.log(x);

// console.time("verifyHashPassword");
// let y = verifyHashPassword(x, "aku ingin makan1");
// console.timeEnd("verifyHashPassword");

// console.log(y);
// byDcFzFZoB2v7hm7mdGW+NScUnIvU9QeZ3X8y13mH1QI3EbhdZab91NJL836QP/oAHyaLJIa/afV4feqH7/D5zQNFCazLt/dT1QRrJ4+qoZnSH0bKEuhQmxUvzPAjm+O5yf3fsPR5ee7gdVOt/TrCSifz/8i87OeIhjY5yJ/QW4=

// e6cef8e850cd3ff152ff2129dfb9f34636266e27917643a9fd99f9900c9eb3b19b98d9b5a2723a877a5cbf9c4c89f5ea9db8352e9218b949b029fb84815eeb4e6d13fa7afb9c9342d44b284b85ab9d0af699ac12683e8a8baf36660e0d29ca2113fbfadb095d30a44600796fdcbd05b96bb5150517e56a20ef12da6e26f19203;
