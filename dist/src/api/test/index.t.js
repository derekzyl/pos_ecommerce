"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestIndex = void 0;
const controller_t_1 = require("./main_test/controller.t");
class Test {
    createTest = controller_t_1.createTest;
    getAllTest = controller_t_1.getAllTest;
    updateTest = controller_t_1.updateOneTest;
    deleteTest = controller_t_1.deleteOneTest;
}
exports.TestIndex = new Test();
