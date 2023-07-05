import {
  createTest,
  deleteOneTest,
  getAllTest,
  updateOneTest,
} from "./main_test/controller.t";

class Test {
  public createTest = createTest;
  public getAllTest = getAllTest;
  public updateTest = updateOneTest;
  public deleteTest = deleteOneTest;
}
export const TestIndex = new Test();
