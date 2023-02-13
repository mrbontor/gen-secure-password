const Crypto = require("node:crypto");
const ALGORITM = "sha512";
const CRYPTING_ALGORITM = "aes-256-gcm";

const KEY_LEN = 64;

const RANDOM_BYTE = 32;
const RANDOM_BYTE_MINIMUM = 16;
const RANDOM_BYTE_MAXIMUM = 128;

const MAX_NUMBER = 50000;
const MIN_NUMBER = 5000;
const MAX_NUMBER_MAX = 500000;
/**
 * Setting up Options
 * @param {Object} options
 * @param {Number} options.maxIteration
 * @param {Number} options.minIteration
 * @param {Number} options.saltLength
 * @returns
 */
const setOptions = (options) => {
    return {
        minIteration: options.minIteration ? options.minIteration : MIN_NUMBER,
        maxIteration: options.maxIteration ? options.maxIteration : MAX_NUMBER,
        saltLength: options.saltLength ? options.saltLength : RANDOM_BYTE,
    };
};

/**
 * Generate random interation
 * @param {Object} opt
 * @param {Number} opt.maxIteration
 * @param {Number} opt.minIteration
 * @returns
 */
const genIterationNumber = (opt) => {
    if (opt.minIteration < MIN_NUMBER) {
        throw new Error(`It is recommended to use above ${MIN_NUMBER}`);
    }
    if (opt.maxIteration >= MAX_NUMBER_MAX) {
        console.warn(`It is recommended to use below ${MAX_NUMBER_MAX} due to the performance`);
    }
    return Math.floor(Math.random() * (opt.maxIteration - opt.minIteration + 1) + opt.minIteration);
};

/**
 * Generate Salt with randomBytes
 * @param {Number} opt
 * @returns
 */
const genSalt = (saltLengthByte) => {
    if (saltLengthByte < RANDOM_BYTE_MINIMUM) {
        throw new Error(`It is recommended that a salt is at least ${RANDOM_BYTE_MINIMUM} bytes long`);
    }

    if (saltLengthByte > RANDOM_BYTE_MAXIMUM) {
        console.warn("Consider to reduce the long of bytes due to the performance");
    }
    return Crypto.randomBytes(saltLengthByte);
};

/**
 *
 * @param {String} password - as plain text
 * @param {String} salt - unique identifer
 * @param {Number} iteration - number to iterate 
 */
const securePassword = (password, salt, iteration) => {
    return Crypto.pbkdf2Sync(password, salt, iteration, KEY_LEN, ALGORITM);
};

module.exports = {
    SetOptions: setOptions,
    GenerateIterationNumber: genIterationNumber,
    GenerateSalt: genSalt,
    SecurePassword: securePassword,
};
