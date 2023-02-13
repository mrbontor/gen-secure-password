# gen-secure-password

*gen-secure-password* is a library to generate secure password using CryptoJS to make it safer when it stored to database.


## Features
- Using hashing algorithm ([pbkdf2Sync](https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest))
- Able to custom options for more secure password (depends on Device RAM)
- Each password has random iteration
- password is unreadable
- no required dependency as long you already installed `NodeJS`

## Compatibility

All version NodeJS (v0.9.3), [pbkdf2Sync](https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest) added since: v0.9.3

## Install

```sh
npm install gen-secure-password
```


## Usage

there is an example in folder [example](./example/) for more detail.

By default, this library will return secure password with default configuration.

### Generate Secure Password

```js
const GenSecurePassword = require('../libs');

const password = "ThisIsAGoodPasswordIn2023!";
const secPwd = GenSecurePassword.GenerateSecurePassword(password)
console.log(secPwd);
```

example output:

```json
{
    "hash": "967bdb3665fe6001ca4d2f8b5b2a799abad7c51476a86bb9b1a27c0ad6065494634591177a8d9f233f38354704bdfede27b10753ed6f26f0a95dcacdd9dee03b",
    "salt": "qTM9m3QRVYQLFtpD2AjcHrEv0fGeA5Kex14NzWwYRdg=",
    "iterations": 6593
}
```
Store the result to database, it allows you to store them separately.
example in database will looks like:
```json
    "username": "mrbontor",
    "infoAuth": {
        "hash": "967bdb3665fe6001ca4d2f8b5b2a799abad7c51476a86bb9b1a27c0ad6065494634591177a8d9f233f38354704bdfede27b10753ed6f26f0a95dcacdd9dee03b",
        "salt": "qTM9m3QRVYQLFtpD2AjcHrEv0fGeA5Kex14NzWwYRdg=",
        "iterations": 6593
}
```

Noted: _when verifying *password*, we will need _ `hash`, `salt` and `iterations`

### Verify Secured Password

```js
const GenSecurePassword = require('../libs');

const password = {
    hash: "967bdb3665fe6001ca4d2f8b5b2a799abad7c51476a86bb9b1a27c0ad6065494634591177a8d9f233f38354704bdfede27b10753ed6f26f0a95dcacdd9dee03b",
    salt: "qTM9m3QRVYQLFtpD2AjcHrEv0fGeA5Kex14NzWwYRdg=",
    iterations: 6593
};
const validatePwd = GenSecurePassword.VerifySecurePassword(secPwd, password);
console.log(validatePwd)
//return Boolean
```


## Configuration

```js
GenSecurePassword.GenerateSecurePassword(password, options)
```

This library allows you to make more secure password.

default option: 
```json
{
    "minIteration": 5000, //minimun 
    "maxIteration": 50000, // there is no maximum value, but consider to use below 500k for better performance.
    "saltLength": 32, // minimum is 16, and consider to use between range 16 - 128 for better performance
}
```

___Description___

- __minIteration__ and  __maxIteration__
    `minIteration` and `maxIteration` are used to generate `Iterations number`.
    _The iterations argument must be a number set as high as possible. The higher the number of iterations, the more secure the derived key will be, but will take a longer amount of time to complete._
    source: [pbkdf2Sync](https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest)

- __saltLength__

    `saltLength` is number to generate `Buffer` in `Byte` with type data `Buffer`. 
    _The salt should be as unique as possible. It is recommended that a salt is random and at least 16 bytes long. See [NIST SP 800-132](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf) for details._
    source: [pbkdf2Sync](https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest)


As i mention that we need `salt` and `iteration` when verifying the password,
the reason is 

    when converting random or pseudorandom byte sequences to UTF-8 strings, subsequences that do not represent valid code points may be replaced by the Unicode replacement character (U+FFFD). The byte representation of the resulting Unicode string may, therefore, not be equal to the byte sequence that the string was created from.
        
    for more detail, please follow this link 
    https://nodejs.org/api/crypto.html#using-strings-as-inputs-to-cryptographic-apis


## Tests

```sh
npm test

```

## TO DO

_let me know if you have suggestion(s)._


## Contributing

    1. Fork it!
    2. Create your feature branch: git checkout -b my-new-feature
    3. Commit your changes: git commit -am 'Add some feature'
    4. Push to the branch: git push origin my-new-feature
    5. Submit a pull request :D


## License

[MIT Licence](./LICENSE)

If my work helps you, please consider [![buying me a coffee](https://www.buymeacoffee.com/assets/img/custom_images/purple_img.png)](https://www.buymeacoffee.com/mrbontor)

---
[Back to top](#store-secure-password)