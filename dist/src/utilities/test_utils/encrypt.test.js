"use strict";
// import {
//   createCipheriv,
//   createDecipheriv,
//   randomFill,
//   scrypt,
//   scryptSync,
// } from "crypto";
// import { Buffer } from "buffer";
// import Crypt from "../encrypt_decrypt"; // Assuming the Crypt class is exported from a separate file
// import dotenv from "dotenv";
// dotenv.config();
// jest.mock("crypto");
// jest.mock("dotenv");
// describe("Crypt", () => {
//   let crypt;
//   beforeAll(() => {
//     process.env.ENCRYPT = "testpassword";
//     crypt = new Crypt();
//   });
//   describe("encrypt", () => {
//     it("should encrypt data correctly", async () => {
//       const mockKey = Buffer.alloc(24);
//       const mockIv = Buffer.alloc(16);
//       const mockCipher = {
//         update: jest.fn().mockReturnValue("encrypted"),
//         final: jest.fn().mockReturnValue("data"),
//       };
//       createCipheriv.mockReturnValue(mockCipher);
//       randomFill.mockImplementation((buffer, callback) =>
//         callback(null, mockIv)
//       );
//       scrypt.mockImplementation((password, salt, keylen, callback) =>
//         callback(null, mockKey)
//       );
//       const encrypted = crypt.encrypt("clear string");
//       expect(createCipheriv).toHaveBeenCalledWith(
//         "aes-192-cbc",
//         mockKey,
//         mockIv
//       );
//       expect(mockCipher.update).toHaveBeenCalledWith(
//         "clear string",
//         "utf8",
//         "hex"
//       );
//       expect(mockCipher.final).toHaveBeenCalledWith("hex");
//       expect(encrypted).toBe("encrypteddata");
//     });
//     it("should throw an error if encryption fails", async () => {
//       const mockError = new Error("Encryption failed");
//       randomFill.mockImplementation((buffer, callback) => callback(mockError));
//       expect(() => {
//         crypt.encrypt("clear string");
//       }).toThrow("Encryption failed");
//     });
//   });
//   describe("decrypt", () => {
//     it("should decrypt data correctly", () => {
//       const mockKey = Buffer.alloc(24);
//       const mockIv = Buffer.alloc(16);
//       const mockDecipher = {
//         update: jest.fn().mockReturnValue("decrypted"),
//         final: jest.fn().mockReturnValue("data"),
//       };
//       createDecipheriv.mockReturnValue(mockDecipher);
//       scryptSync.mockReturnValue(mockKey);
//       const decrypted = crypt.decrypt("encrypteddata");
//       expect(createDecipheriv).toHaveBeenCalledWith(
//         "aes-192-cbc",
//         mockKey,
//         mockIv
//       );
//       expect(mockDecipher.update).toHaveBeenCalledWith(
//         "encrypteddata",
//         "hex",
//         "utf8"
//       );
//       expect(mockDecipher.final).toHaveBeenCalledWith("utf8");
//       expect(decrypted).toBe("decrypteddata");
//     });
//   });
// });
