"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getManyBlog = exports.getOneBlog = exports.createBlog = void 0;
const custom_error_1 = require("../../../../utilities/custom_error");
const files_handler_1 = require("../../../../utilities/file_handler/files_handler");
const crud_1 = require("../../../general_factory/crud");
const model_blog_1 = require("./model.blog");
const model_staff_1 = require("../../../admin/staff/main_staff/model.staff");
const createBlog = async (request, response, next) => {
    try {
        const body = request.body;
        // console.log(body.search_tags, "take by one");
        const get_staff = await model_staff_1.STAFF.findOne({ user: request.user.id });
        if (!get_staff)
            throw (0, custom_error_1.APP_ERROR)("you aren't a staff");
        const user_name = `${get_staff.first_name}  ${get_staff.last_name}`;
        const gotten_body = {
            ...body,
            created_by: request.user.id,
        };
        const crud_blog = new crud_1.Crud(request, response, next);
        crud_blog.create({ model: model_blog_1.BLOG, exempt: "" }, { ...gotten_body, creator_name: user_name }, {
            title: gotten_body.title,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createBlog = createBlog;
const getOneBlog = async (request, response, next) => {
    const crud_blog = new crud_1.Crud(request, response, next);
    crud_blog.getOne({ model: model_blog_1.BLOG, exempt: "-__v -created_by" }, { _id: request.params.id }, {});
};
exports.getOneBlog = getOneBlog;
const getManyBlog = async (request, response, next) => {
    console.log("inside get many blogs");
    const crud_blog = new crud_1.Crud(request, response, next);
    crud_blog.getMany({ model: model_blog_1.BLOG, exempt: "-__v -created_at -updated_at -created_by" }, request.query, {}, {});
};
exports.getManyBlog = getManyBlog;
const updateBlog = async (request, response, next) => {
    const body = request.body;
    if (body.image) {
        const get_blog = await model_blog_1.BLOG.findById(request.params.id);
        if (!get_blog)
            throw (0, custom_error_1.APP_ERROR)("blog not found");
        get_blog.image ? (0, files_handler_1.imageDeleteHandler)(get_blog.image) : "";
    }
    const crud_blog = new crud_1.Crud(request, response, next);
    crud_blog.update({ model: model_blog_1.BLOG, exempt: "-__v" }, { ...body }, { _id: request.params.id });
};
exports.updateBlog = updateBlog;
const deleteBlog = async (request, response, next) => {
    const get_blog = await model_blog_1.BLOG.findById(request.params.id);
    if (!get_blog)
        throw (0, custom_error_1.APP_ERROR)("blog not found");
    get_blog.image ? (0, files_handler_1.imageDeleteHandler)(get_blog.image) : "";
    const crud_blog = new crud_1.Crud(request, response, next);
    crud_blog.delete({ model: model_blog_1.BLOG, exempt: "-__v" }, { _id: request.params.id });
};
exports.deleteBlog = deleteBlog;
