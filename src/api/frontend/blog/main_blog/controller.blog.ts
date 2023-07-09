import { NextFunction, Response, Request } from "express";
import { BlogBodyI, BlogDocI, BlogI } from "../interface_blog/interface.blog";
import { APP_ERROR } from "../../../../utilities/custom_error";
import { imageDeleteHandler } from "../../../../utilities/file_handler/files_handler";
import { Crud } from "../../../general_factory/crud";
import { BLOG } from "./model.blog";
import { STAFF } from "../../../admin/staff/main_staff/model.staff";

export const createBlog = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const body: BlogBodyI = request.body;

    // console.log(body.search_tags, "take by one");
    const get_staff = await STAFF.findOne({ user: request.user.id });
    if (!get_staff) throw APP_ERROR("you aren't a staff");

    const user_name = `${get_staff.first_name}  ${get_staff.last_name}`;
    const gotten_body = {
      ...body,
      created_by: request.user.id,
    };

    const crud_blog = new Crud(request, response, next);
    crud_blog.create<BlogI, BlogDocI>(
      { model: BLOG, exempt: "" },
      { ...gotten_body, creator_name: user_name },
      {
        title: gotten_body.title,
      }
    );
  } catch (error) {
    next(error);
  }
};

export const getOneBlog = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_blog = new Crud(request, response, next);
  crud_blog.getOne<BlogDocI>(
    { model: BLOG, exempt: "-__v -created_by" },
    { _id: request.params.id },
    {}
  );
};

export const getManyBlog = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("inside get many blogs");

  const crud_blog = new Crud(request, response, next);
  crud_blog.getMany<BlogDocI>(
    { model: BLOG, exempt: "-__v -created_at -updated_at -created_by" },
    request.query,
    {},

    {}
  );
};

export const updateBlog = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body: BlogBodyI = request.body;
  if (body.image) {
    const get_blog = await BLOG.findById(request.params.id);
    if (!get_blog) throw APP_ERROR("blog not found");
    get_blog.image ? imageDeleteHandler(get_blog.image) : "";
  }

  const crud_blog = new Crud(request, response, next);
  crud_blog.update<BlogBodyI, BlogDocI>(
    { model: BLOG, exempt: "-__v" },
    { ...body },
    { _id: request.params.id }
  );
};
export const deleteBlog = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const get_blog = await BLOG.findById(request.params.id);
  if (!get_blog) throw APP_ERROR("blog not found");
  get_blog.image ? imageDeleteHandler(get_blog.image) : "";

  const crud_blog = new Crud(request, response, next);
  crud_blog.delete<BlogDocI>(
    { model: BLOG, exempt: "-__v" },
    { _id: request.params.id }
  );
};
