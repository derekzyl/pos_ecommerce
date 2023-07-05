import { Buffer } from "node:buffer";

import {
  scrypt,
  randomFill,
  createCipheriv,
  scryptSync,
  createDecipheriv,
} from "node:crypto";
import * as dotenv from "dotenv";
dotenv.config();

const algorithm = "aes-192-cbc";

/**
 * Crypt Factory
 *
 * -------------
 *
 * @requires password -this password can be in your dot env file
 */
export class Crypt {
  password = process.env.ENCRYPT!;
  constructor(password?: string) {
    this.password = password ?? process.env.ENCRYPT!;
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
  encrypt(data: string): string {
    // First, we'll generate the key. The key length is dependent on the algorithm.
    // In this case for aes192, it is 24 bytes (192 bits).
    let output = "";
    scrypt(this.password, "salt", 24, (err, key) => {
      if (err) throw err;
      // Then, we'll generate a random initialization vector
      randomFill(new Uint8Array(16), (err, iv) => {
        if (err) throw err;

        const cipher = createCipheriv(algorithm, key, iv);

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
  decrypt(data: string): string {
    // Use the async `crypto.scrypt()` instead.
    const key = scryptSync(this.password, "salt", 24);
    // The IV is usually passed along with the ciphertext.
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    const decipher = createDecipheriv(algorithm, key, iv);

    // Encrypted using same algorithm, key and iv.

    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
    // Prints: some clear text data
  }
}

const newd = new Crypt();

console.log(newd.encrypt("hello world"));
