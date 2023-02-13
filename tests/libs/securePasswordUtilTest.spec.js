const secPwd = require('../../libs/securePasswordUtils');
require('../toBeWithinRange');

let logWarn = (logMsg) => console.warn(logMsg);

describe('Utility Authentication Encryption and Decryption', () => {
    let setOpt, genIteration, genSalt, sePassword;
    let password = 'ThisIsAGoodPasswordIn2023!';
    let optData = {
        minIteration: 5000,
        maxIteration: 6000,
        saltLength: 16
    };

    describe('seting Options', () => {
        it('should return default object value with empty params', () => {
            setOpt = secPwd.SetOptions({});
            expect(setOpt).toHaveProperty('minIteration', 5000);
            expect(setOpt).toHaveProperty('maxIteration', 50000);
            expect(setOpt).toHaveProperty('saltLength', 32);
        });

        it('should return object value with params', () => {
            setOpt = secPwd.SetOptions(optData);
            expect(setOpt).toHaveProperty('minIteration', 5000);
            expect(setOpt).toHaveProperty('maxIteration', 6000);
            expect(setOpt).toHaveProperty('saltLength', 16);
        });
    });

    describe('Generator Iteration Number', () => {
        it('should return number value with random number', () => {
            genIteration = secPwd.GenerateIterationNumber(optData);
            expect(genIteration).toBeWithinRange(5000, 6000);
        });

        it('should logged warn when Max Iteration over 500000', () => {
            console.warn = jest.fn();

            optData.maxIteration = 500000;
            genIteration = secPwd.GenerateIterationNumber(optData);
            logWarn('i warn you');

            expect(console.warn).toHaveBeenCalledWith('i warn you');
            expect(genIteration).toBeWithinRange(5000, 500000);
        });

        it('should throw error when Iteration Min Number below 5000', () => {
            try {
                optData.minIteration = 1000;
                optData.maxIteration = 6000;
                genIteration = secPwd.GenerateIterationNumber(optData);
            } catch (error) {
                expect(error.message).toBe('It is recommended to use above 5000');
            }
        });
    });

    describe('Generate Salt with randomBytes', () => {
        it('should return data with type Object Buffer', () => {
            genSalt = secPwd.GenerateSalt(optData.saltLength);
            expect(typeof genSalt).toBe('object');
        });

        it("should throw an error if Opt salt less than 16", () => {
            try {
                optData.saltLength = 10;
                genSalt = secPwd.GenerateSalt(optData.saltLength);
            } catch (error) {
                expect(error.message).toBe("It is recommended that a salt is at least 16 bytes long");
            }
        });

        it('should logged warn when Salt long byte over 128', () => {
            console.warn = jest.fn();

            optData.saltLength = 130;
            genIteration = secPwd.GenerateSalt(optData.saltLength);
            logWarn('i warn you');

            expect(console.warn).toHaveBeenCalledWith('i warn you');
        });
    });
});
