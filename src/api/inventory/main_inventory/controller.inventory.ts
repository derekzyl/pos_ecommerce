import { NextFunction, Response, Request } from "express";

import { BRANCH_INVENTORY, INVENTORY } from "./model.inventory";
import { Crud } from "../../general_factory/crud";
import { generateId } from "../../../utilities/id_generator";
import {
  DistributeInventoryBodyI,
  DistributeInventoryDocI,
  InventoryBodyI,
  InventoryDocI,
} from "../interface_inventory/interface.inventory";
import { PRODUCT } from "../../product/main_product/model.product";
import { APP_ERROR } from "../../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../../utilities/http_response";
import { IdGenE } from "../../../utilities/interface_utilities/id_gen.interface";

//todo inventory receipt
export const createInventory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const inventory_id = generateId(IdGenE.INVENTORY);
    const inventory_receipt = "todo";
    const body: InventoryBodyI = request.body;
    const products = body.products;

    const inventory_body: InventoryBodyI = {
      inventory_id,
      products,
      inventory_receipt,
    };

    for (const product of products) {
      // add product count
      const get_product = await PRODUCT.findById(product.product.id);
      if (!get_product)
        throw APP_ERROR(
          "product not found in database",
          HTTP_RESPONSE.NOT_FOUND
        );
      get_product.number_in_stock =
        Number(get_product.number_in_stock) + Number(product.quantity);
      get_product.save();
    }

    const crud_inventory = new Crud(request, response, next);
    crud_inventory.create<InventoryBodyI, InventoryDocI>(
      { model: INVENTORY, exempt: "" },
      inventory_body,
      {
        inventory_id: inventory_id,
      }
    );
  } catch (error) {
    next(error);
  }
};

export const getOneInventory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_inventory = new Crud(request, response, next);
  crud_inventory.getOne<InventoryDocI>(
    { model: INVENTORY, exempt: "-__v " },
    { inventory_name: request.params.id },
    {}
  );
};

export const getManyInventory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_review = new Crud(request, response, next);
  crud_review.getMany<InventoryDocI>(
    { model: INVENTORY, exempt: "-__v " },
    request.query,
    {},
    {}
  );
};

export const updateInventory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;
  const crud_review = new Crud(request, response, next);
  crud_review.update<InventoryBodyI, InventoryDocI>(
    { model: INVENTORY, exempt: "-__v" },
    { inventory_name: request.params.id },
    { ...body }
  );
};
export const deleteInventory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_review = new Crud(request, response, next);
  crud_review.delete<InventoryDocI>(
    { model: INVENTORY, exempt: "-__v -created_at -updated_at" },
    { inventory_name: request.params.id }
  );
};

//todo inventory receipt
export const createBranchInventory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const inventory_id = generateId(IdGenE.INVENTORY);
    const inventory_receipt = "todo";
    const body: DistributeInventoryBodyI = request.body;
    const products = body.products;

    const inventory_body: DistributeInventoryBodyI = {
      name: body.name,
      branch: body.branch,
      inventory_id,
      products,
      inventory_receipt: body.inventory_receipt,
    };

    for (const product of products) {
      // add product count
      const get_product = await PRODUCT.findById(product.product.id);
      if (!get_product)
        throw APP_ERROR(
          "product not found in database",
          HTTP_RESPONSE.NOT_FOUND
        );
      get_product.number_in_stock =
        Number(get_product.number_in_stock) + Number(product.quantity);
      get_product.save();
    }

    const crud_inventory = new Crud(request, response, next);
    crud_inventory.create<DistributeInventoryBodyI, DistributeInventoryDocI>(
      { model: BRANCH_INVENTORY, exempt: "" },
      inventory_body,
      {
        inventory_id: inventory_id,
      }
    );
  } catch (error) {
    next(error);
  }
};

export const getOneBranchInventory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_inventory = new Crud(request, response, next);
  crud_inventory.getOne<DistributeInventoryDocI>(
    { model: BRANCH_INVENTORY, exempt: "-__v " },
    { name: request.params.id },
    {}
  );
};

export const getManyBranchInventory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_review = new Crud(request, response, next);
  crud_review.getMany<DistributeInventoryDocI>(
    { model: BRANCH_INVENTORY, exempt: "-__v " },
    request.query,
    {},
    { model: "products" }
  );
};

export const updateBranchInventory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body: Partial<DistributeInventoryBodyI> = request.body;
  const crud_review = new Crud(request, response, next);
  crud_review.update<DistributeInventoryBodyI, DistributeInventoryDocI>(
    { model: BRANCH_INVENTORY, exempt: "-__v" },
    { inventory_name: request.params.id },
    { ...body }
  );
};
export const deleteBranchInventory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_review = new Crud(request, response, next);
  crud_review.delete<DistributeInventoryDocI>(
    { model: BRANCH_INVENTORY, exempt: "-__v -created_at -updated_at" },
    { inventory_name: request.params.id }
  );
};
