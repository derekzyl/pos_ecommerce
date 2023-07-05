"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VatIndex = void 0;
const controller_vat_1 = require("./main_vat/controller.vat");
class Vat {
    create_vat = controller_vat_1.createVat;
    get_one_vat = controller_vat_1.getOneVat;
    get_all_vat = controller_vat_1.getManyVat;
    update_vat = controller_vat_1.updateVat;
    delete_vat = controller_vat_1.deleteVat;
}
exports.VatIndex = new Vat();
