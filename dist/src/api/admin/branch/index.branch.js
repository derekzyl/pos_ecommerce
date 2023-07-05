"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchIndex = void 0;
const controller_branch_1 = require("./main_branch/controller.branch");
class Branch {
    create_branch = controller_branch_1.createBranch;
    get_one_branch = controller_branch_1.getOneBranch;
    update_branch = controller_branch_1.updateBranch;
    delete_branch = controller_branch_1.deleteBranch;
    get_all_branch = controller_branch_1.getAllBranch;
}
exports.BranchIndex = new Branch();
