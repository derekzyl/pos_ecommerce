import {
  createBranch,
  deleteBranch,
  getAllBranch,
  getOneBranch,
  updateBranch,
} from "./main_branch/controller.branch";

class Branch {
  public create_branch = createBranch;
  public get_one_branch = getOneBranch;
  public update_branch = updateBranch;
  public delete_branch = deleteBranch;
  public get_all_branch = getAllBranch;
}

export const BranchIndex = new Branch();
