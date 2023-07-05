import { NextFunction, Response, Request } from "express";
import { Crud } from "../../../general_factory/crud";
import { VAT } from "./model.vat";
import { VatDocI, VatI } from "../interface_vat/interface.vat";

export const createVat = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const body = request.body;

    const gotten_body = { ...body };
    const crud_vat = new Crud(request, response, next);
    crud_vat.create<VatI, VatDocI>({ model: VAT, exempt: "" }, gotten_body, {
      vat_name: body.vat_name,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneVat = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_vat = new Crud(request, response, next);
  crud_vat.getOne<VatDocI>(
    { model: VAT, exempt: "-__v -created_at updated_at" },
    { vat_name: request.params.id },
    {}
  );
};

export const getManyVat = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_vat = new Crud(request, response, next);
  crud_vat.getMany<VatDocI>(
    { model: VAT, exempt: "-__v -created_at -updated_at" },
    request.query,
    {},
    {}
  );
};

export const updateVat = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;
  const crud_vat = new Crud(request, response, next);
  crud_vat.update(
    { model: VAT, exempt: "-__v" },
    { vat_name: request.params.id },
    { ...body }
  );
};
export const deleteVat = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const crud_vat = new Crud(request, response, next);
  crud_vat.delete<VatDocI>(
    { model: VAT, exempt: "-__v -created_at -updated_at" },
    { vat_name: request.params.id }
  );
};
