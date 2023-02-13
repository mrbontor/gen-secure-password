const sinon = require('sinon');
const { GenerateSecurePassword, VerifySecurePassword } = require("../../libs/securePassword");

const logWarn = (logMsg) => console.warn(logMsg);

describe("Authentication Encryption and Decryption", () => {
    let pwdGenerate, isPwdValid;
    let password = "ThisIsAGoodPasswordIn2023!";
    let options = {
        minIteration: 5000,
        maxIteration: 50000,
        saltLength: 32,
    };
    describe("Generate Password", () => {
        it("should return password with property hash, salt and iteration without options inputted", () => {
            pwdGenerate = GenerateSecurePassword(password);
            expect(pwdGenerate).toHaveProperty("hash");
            expect(pwdGenerate).toHaveProperty("salt");
            expect(pwdGenerate).toHaveProperty("iterations");

            expect(typeof pwdGenerate.hash).toBe("string");
            expect(typeof pwdGenerate.salt).toBe("string");
            expect(typeof pwdGenerate.iterations).toBe("number");
        });

        it("should return password with property hash, salt and iteration with options inputted", () => {
            pwdGenerate = GenerateSecurePassword(password, options);
            expect(pwdGenerate).toHaveProperty("hash");
            expect(pwdGenerate).toHaveProperty("salt");
            expect(pwdGenerate).toHaveProperty("iterations");

            expect(typeof pwdGenerate.hash).toBe("string");
            expect(typeof pwdGenerate.salt).toBe("string");
            expect(typeof pwdGenerate.iterations).toBe("number");
        });

        it("should logged warn if Opt salt more than 128 with rigth output", () => {
            console.warn = jest.fn();
            options.saltLength = 16;
            options.maxIteration = 500000;
            pwdGenerate = GenerateSecurePassword(password, options);
            logWarn("i warn you");

            expect(console.warn).toHaveBeenCalledWith("i warn you");

            expect(pwdGenerate).toHaveProperty("hash");
            expect(pwdGenerate).toHaveProperty("salt");
            expect(pwdGenerate).toHaveProperty("iterations");

            expect(typeof pwdGenerate.hash).toBe("string");
            expect(typeof pwdGenerate.salt).toBe("string");
            expect(typeof pwdGenerate.iterations).toBe("number");
        });

        it("should logged warn if Opt maxIteration more than 500000 with rigth output", () => {
            console.warn = jest.fn();
            options.saltLength = 130;
            pwdGenerate = GenerateSecurePassword(password, options);
            logWarn("i warn you");

            expect(console.warn).toHaveBeenCalledWith("i warn you");

            expect(pwdGenerate).toHaveProperty("hash");
            expect(pwdGenerate).toHaveProperty("salt");
            expect(pwdGenerate).toHaveProperty("iterations");

            expect(typeof pwdGenerate.hash).toBe("string");
            expect(typeof pwdGenerate.salt).toBe("string");
            expect(typeof pwdGenerate.iterations).toBe("number");
        });

        it("should throw error when password is empty", () => {
            try {
                pwdGenerate = GenerateSecurePassword();
            } catch (error) {
                expect(error).toBe("Password is required!");
            }
        });

        it("should throw an error if Opt salt less than 16", () => {
            try {
                options.saltLength = 10;
                pwdGenerate = GenerateSecurePassword(password);
            } catch (error) {
                expect(error.message).toBe("It is recommended that a salt is at least 16 bytes long");
            }
        });       
    });

    describe("Verify Password", () => {
        it("should return true when pwd valid", () => {
            pwdGenerate = GenerateSecurePassword(password);

            isPwdValid = VerifySecurePassword(pwdGenerate, password);
            expect(isPwdValid).toBe(true);
        });

        it("should return false when pwd valid", () => {
            pwdGenerate = GenerateSecurePassword(password);

            isPwdValid = VerifySecurePassword(pwdGenerate, password + "x");
            expect(isPwdValid).toBe(false);
        });
    });
});
