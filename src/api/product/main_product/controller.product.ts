import { NextFunction, Response, Request } from "express";
import {
  ProductBodyI,
  ProductDocI,
  ProductI,
} from "../interface_product/interface.product";
import { Crud } from "../../general_factory/crud";
import { PRODUCT } from "./model.product";
import { APP_ERROR } from "../../../utilities/custom_error";
import { imageDeleteHandler } from "../../../utilities/file_handler/files_handler";

export const createProduct = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //todo: send the images to aws or cloudinary
  try {
    const body: ProductBodyI = request.body;

    const b = body.search_tag.split(" ");

    // console.log(body.search_tags, "take by one");

    const gotten_body = {
      ...body,
      search_tags: b,
      created_by: request.user.id,
    };
    const crud_product = new Crud(request, response, next);
    crud_product.create<ProductBodyI, ProductDocI>(
      { model: PRODUCT, exempt: "" },
      gotten_body,
      {
        name: gotten_body.name,
      }
    );
  } catch (error) {
    next(error);
  }
};

export const getOneProduct = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_product = new Crud(request, response, next);
  crud_product.getOne<ProductDocI>(
    { model: PRODUCT, exempt: "-__v" },
    { _id: request.params.id },

    [
      { model: "category" },
      {
        model: "sub_category",
        fields: "name image",
      },
      { model: "reviews" },
    ]
  );
};

export const getManyProduct = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("inside get many products");

  const crud_product = new Crud(request, response, next);
  crud_product.getMany<ProductDocI>(
    { model: PRODUCT, exempt: "-__v -created_at -updated_at -created_by" },
    request.query,
    {},

    [
      { model: "category" },
      {
        model: "sub_category",
        fields: "name image",
      },
      { model: "reviews" },
    ]
  );
};

export const updateProduct = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body: ProductBodyI = request.body;
  if (body.image) {
    const get_product = await PRODUCT.findById(request.params.id);
    if (!get_product) throw APP_ERROR("product not found");
    get_product.image ? imageDeleteHandler(get_product.image) : "";
  }
  if (body.other_image.length > 0) {
    const get_product = await PRODUCT.findById(request.params.id);
    if (!get_product) throw APP_ERROR("product not found");
    get_product.other_image.length > 0
      ? imageDeleteHandler(get_product.other_image)
      : "";
  }

  const crud_product = new Crud(request, response, next);
  crud_product.update<ProductBodyI, ProductDocI>(
    { model: PRODUCT, exempt: "-__v" },
    { ...body },
    { _id: request.params.id }
  );
};
export const deleteProduct = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const get_product = await PRODUCT.findById(request.params.id);
  if (!get_product) throw APP_ERROR("product not found");
  get_product.image ? imageDeleteHandler(get_product.image) : "";

  get_product.other_image.length > 0
    ? imageDeleteHandler(get_product.other_image)
    : "";

  const crud_product = new Crud(request, response, next);
  crud_product.delete<ProductDocI>(
    { model: PRODUCT, exempt: "-__v" },
    { id: request.params.id }
  );
};
