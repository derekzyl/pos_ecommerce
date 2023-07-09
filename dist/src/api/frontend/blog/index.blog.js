"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogIndex = void 0;
const controller_blog_1 = require("./main_blog/controller.blog");
class Blog {
    create_blog = controller_blog_1.createBlog;
    get_one_blog = controller_blog_1.getOneBlog;
    get_all_blog = controller_blog_1.getManyBlog;
    update_blog = controller_blog_1.updateBlog;
    delete_blog = controller_blog_1.deleteBlog;
}
exports.BlogIndex = new Blog();
