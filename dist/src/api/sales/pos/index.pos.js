"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosIndex = void 0;
const controller_pos_1 = require("./main_pos/controller.pos");
class Pos {
    create_pos = controller_pos_1.createPos;
    get_one_pos = controller_pos_1.getOnePos;
    get_all_pos = controller_pos_1.getManyPos;
    update_pos = controller_pos_1.updatePos;
    delete_pos = controller_pos_1.deletePos;
    get_products = controller_pos_1.getManyPosProduct;
}
exports.PosIndex = new Pos();
