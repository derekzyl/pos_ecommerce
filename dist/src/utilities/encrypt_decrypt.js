"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypt = void 0;
const node_buffer_1 = require("node:buffer");
const node_crypto_1 = require("node:crypto");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const algorithm = "aes-192-cbc";
/**
 * Crypt Factory
 *
 * -------------
 *
 * @requires password -this password can be in your dot env file
 */
class Crypt {
    password = process.env.ENCRYPT;
    constructor(password) {
        this.password = password ?? process.env.ENCRYPT;
    }
    /**
     * Encrypt
     *
     * --------------
     *
     * @param {String} data - the encrypted data
     * @returns {String} decrypted data
     * @example
     * ```ts
     * const crypt = new crypt()
     * const decrypted = crypt.crypt("a clear string")
     * console.log(decrypted) // returns an encrypted data e.g e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa
     * ```
     */
    encrypt(data) {
        // First, we'll generate the key. The key length is dependent on the algorithm.
        // In this case for aes192, it is 24 bytes (192 bits).
        let output = "";
        (0, node_crypto_1.scrypt)(this.password, "salt", 24, (err, key) => {
            if (err)
                throw err;
            // Then, we'll generate a random initialization vector
            (0, node_crypto_1.randomFill)(new Uint8Array(16), (err, iv) => {
                if (err)
                    throw err;
                const cipher = (0, node_crypto_1.createCipheriv)(algorithm, key, iv);
                let encrypted = cipher.update(data, "utf8", "hex");
                encrypted += cipher.final("hex");
                output = encrypted;
            });
        });
        return output;
    }
    /**
     * Decrypt
     *
     * --------------
     *
     * @param {String} data - the encrypted data
     * @returns {String} decrypted data
     * @example
     * ```ts
     * const crypt = new crypt()
     * const decrypted = crypt.decrypt("e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa")
     * console.log(decrypted) // returns a clear string
     * ```
     */
    decrypt(data) {
        // Use the async `crypto.scrypt()` instead.
        const key = (0, node_crypto_1.scryptSync)(this.password, "salt", 24);
        // The IV is usually passed along with the ciphertext.
        const iv = node_buffer_1.Buffer.alloc(16, 0); // Initialization vector.
        const decipher = (0, node_crypto_1.createDecipheriv)(algorithm, key, iv);
        // Encrypted using same algorithm, key and iv.
        let decrypted = decipher.update(data, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
        // Prints: some clear text data
    }
}
exports.Crypt = Crypt;
const newd = new Crypt();
console.log(newd.encrypt("hello world"));
