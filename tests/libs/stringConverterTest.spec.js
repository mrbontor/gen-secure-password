const { Base64Encoding, Base64Decoding, HexFormat } = require("../../libs/stringCoverter");

describe("Convert String", () => {
    let encoding, decoding, bufferText, string;

    string = "am i encoded?";
    bufferText = Buffer.from("am i encoded?", "utf-8");

    describe("encode", () => {
        it("should return the string encoded as base64", () => {

            encoding = Base64Encoding(bufferText);
            expect(encoding).toBe("YW0gaSBlbmNvZGVkPw==");
        });
    });
    describe("decode", () => {
        it("should return the base64 string decoded to a human readable string", () => {
            decoding = Base64Decoding(bufferText);
            expect(decoding.toString()).toBe(string);
        });
    });

    describe("hash", () => {
        it("should return the base64 string decoded to a human readable string", () => {
            let hex = HexFormat(bufferText);
            expect(hex).toBe("616d206920656e636f6465643f");
        });
    });
});
