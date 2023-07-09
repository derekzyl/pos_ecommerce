import {
  createBlog,
  deleteBlog,
  getManyBlog,
  getOneBlog,
  updateBlog,
} from "./main_blog/controller.blog";

class Blog {
  public create_blog = createBlog;
  public get_one_blog = getOneBlog;
  public get_all_blog = getManyBlog;
  public update_blog = updateBlog;
  public delete_blog = deleteBlog;
}
export const BlogIndex = new Blog();
