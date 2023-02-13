module.exports = {
    /**
     * @param {Buffer} value 
     * @returns 
     */
    Base64Encoding: (value) => {
        return value.toString("base64");
    },
    /**
     * @param {Buffer} value 
     * @returns 
     */
    Base64Decoding: (value) => {
        return Buffer.from(value, "base64");
    },
    HexFormat: (value) => {
        return value.toString(`hex`);
    }
};
