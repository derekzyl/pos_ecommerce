import { NextFunction, Response, Request, query } from "express";
import { APP_ERROR } from "../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../utilities/http_response";
import { Queries } from "../../utilities/query";
import { responseMessage } from "../../utilities/response_message";
import { CrudModelI, PopulateFieldI } from "./interface/general_factory";
import { FilterQuery, UpdateQuery } from "mongoose";
import { getOne } from "./controller.factory";

/**
 * Crud functionality
 *
 *
 */
export class Crud {
  request: Request;
  response: Response;
  next: NextFunction;
  /**
   *
   * @param {Request} request express request object
   * @param {Response} response express response object
   * @param {NextFunction} next function
   */
  constructor(request: Request, response: Response, next: NextFunction) {
    this.request = request;
    this.response = response;
    this.next = next;
  }
  /**
   * Create a new request
   * ----------------------
   *
   *
   *  @summary please insert the literal value create <T>
   *
   * @method  create handles the creation
   * @param {CrudModelI} MyModel model object and whats its exempting when returning a response
   * @param {Record<string, any>} data request.body data object
   * @param {Record<string, any> }finder object searches the database for existing data then throws error if it does exist
   * @returns {Response | NextFunction}   a response message or passes errors to error center
   *
   * @example
   * // returns a response
   * create< T{ for the body}, U {for the model} >(MyModel, data, finder)
   */
  async create<T, U>(
    MyModel: CrudModelI,
    data: T,
    finder: FilterQuery<U>
  ): Promise<Response | NextFunction | void> {
    try {
      console.log("<---------------------finder------", finder);
      const find =
        Object.keys(finder).length !== 0
          ? await MyModel.model.findOne(finder)
          : undefined;
      if (find)
        throw APP_ERROR(
          `the data ${{
            ...finder,
          }}} already exist in database`,
          HTTP_RESPONSE.BAD_REQUEST
        );

      const create = new MyModel.model(data);
      const created = await create.save();

      if (!created)
        throw APP_ERROR(
          `${finder} is not successfully created`,
          HTTP_RESPONSE.BAD_REQUEST
        );
      return this.response.status(HTTP_RESPONSE.CREATED).json(
        responseMessage({
          success_status: true,
          data: created,
          message: "successfully created",
        })
      );
    } catch (error) {
      return this.next(error);
    }
  }
  /**
   * Update
   *
   * ---------
   *  @summary please insert the literal value update <T>
   *
   * @param {CrudModelI | CrudModelI[]} MyModel model object or an array of model object and whats its exempting when returning a response
   * @param {Record<string, any>} data this is the data to be used for updating the model
   * @param {Record<string, any>} filter this is used to find the document that need to be filtered
   * @returns
   *
   * @example
   * // returns a response
   * update< T{ for the body}, U{ for the model }>(MyModel, data<T>, filter<U>)
   */
  async update<T, U>(
    MyModel: CrudModelI | CrudModelI[],
    data: UpdateQuery<T>,
    filter: FilterQuery<U>
  ) {
    try {
      const dataF: Array<any> = [];

      if (Array.isArray(MyModel)) {
        MyModel.forEach(async (model: CrudModelI) => {
          const findAndUpdate = await model.model
            .findOneAndUpdate(filter, data)
            .select(model.exempt);
          if (!findAndUpdate)
            throw APP_ERROR(
              `${data} not updated successfully`,
              HTTP_RESPONSE.NOT_IMPLEMENTED
            );
          else {
            dataF.push(findAndUpdate);
          }
        });
      } else {
        const findAndUpdate = await MyModel.model
          .findOneAndUpdate(filter, data)
          .select(MyModel.exempt);
        if (!findAndUpdate) throw APP_ERROR(`${data} not updated successfully`);
        else {
          dataF.push(findAndUpdate);
        }
      }

      return this.response.status(HTTP_RESPONSE.OK).json(
        responseMessage({
          success_status: true,
          data: dataF,
          message: "successfully updated ",
        })
      );
    } catch (error) {
      return this.next(error);
    }
  }
  /**
   *
   * @param {CrudModelI} MyModels the model and exempt are the object data
   * @param {request.query} query
   * @param {Record<string, any> | null } category the first filter before any other filters
   * @param {Object} populate this takes the model field that needs to be populated
   *
   * ```ts
   * CrudModelI {
   * model: Model<any>;
   *exempt: string;
   *  }\
   *   populate: { model?: string | undefined; fields?: string | undefined } ```
   *
   * @example
   * // returns a response
   * getMany< T the model >(MyModel, query category<T>, populate: { model?: string | undefined; fields?: string | undefined)
   */
  async getMany<T>(
    MyModels: CrudModelI | CrudModelI[],
    query: typeof this.request.query,
    category: FilterQuery<T> | null = null,
    populate: PopulateFieldI | PopulateFieldI[]
  ) {
    try {
      let data: any;
      const all = [];
      if (Array.isArray(MyModels)) {
        MyModels.forEach(async (model: CrudModelI) => {
          let modelFind = category
            ? model.model.find(category)
            : model.model.find();
          if (model.exempt) modelFind = modelFind.select(model.exempt);
          if (populate && Array.isArray(populate))
            for (const pop of populate) {
              if (pop.model)
                modelFind = modelFind.populate({
                  path: pop.model,
                  select: pop.fields,
                  populate: pop.second_layer_populate,
                });
            }
          else if (populate && !Array.isArray(populate))
            if (populate.model)
              modelFind = modelFind.populate({
                path: populate.model,
                select: populate.fields,
                populate: populate.second_layer_populate,
              });
          const queryf = new Queries(modelFind, query)
            .filter()
            .limitFields()
            .paginate()
            .sort();
          const queryG = await queryf.model;
          if (!queryG)
            throw APP_ERROR(
              `${model} is not successfully fetched`,
              HTTP_RESPONSE.NOT_FOUND
            );
          data = all.push(queryG);
        });
      } else {
        let modelFind = category
          ? MyModels.model.find(category)
          : MyModels.model.find();
        if (MyModels.exempt) modelFind = modelFind.select(MyModels.exempt);
        if (populate && Array.isArray(populate))
          for (const pop of populate) {
            if (pop.model)
              modelFind = modelFind.populate({
                path: pop.model,
                select: pop.fields,
                populate: pop.second_layer_populate,
              });
          }
        else if (populate && !Array.isArray(populate))
          if (populate.model)
            modelFind = modelFind.populate({
              path: populate.model,
              select: populate.fields,
              populate: populate.second_layer_populate,
            });

        const queryf = new Queries(modelFind, query)
          .filter()
          .limitFields()
          .sort()
          .paginate();
        const queryG = await queryf.model;
        if (!queryG)
          throw APP_ERROR(
            `${MyModels} is not successfully created`,
            HTTP_RESPONSE.NOT_FOUND
          );
        data = queryG;
      }
      this.response.status(HTTP_RESPONSE.OK).json(
        responseMessage({
          success_status: true,
          message: "data fetched successfully",
          data: data,
          doc_length: data.length,
        })
      );
    } catch (error) {
      this.next(error);
    }
  }
  /**
   *
   * @param {CrudModelI} MyModel -it takes a model and exempt field
   * @param {Object} data it takes the field that is used to mďthď up the data to be deleted
   * @example
   * // returns a response
   * delete< T the model >(MyModel,category<T>,)
   */
  async delete<T>(MyModel: CrudModelI | CrudModelI[], data: FilterQuery<T>) {
    try {
      if (Array.isArray(MyModel)) {
        MyModel.forEach(async (model: CrudModelI) => {
          const delet = await model.model.deleteOne(data);
          if (!delet)
            throw APP_ERROR(
              `${model} is not successfully deleted`,
              HTTP_RESPONSE.NOT_IMPLEMENTED
            );
        });
      } else {
        const delet = await MyModel.model.deleteOne(data);
        if (!delet)
          throw APP_ERROR(
            `${MyModel} is not successfully deleted`,
            HTTP_RESPONSE.NOT_FOUND
          );
      }

      this.response.status(HTTP_RESPONSE.OK).json(
        responseMessage({
          success_status: true,
          message: " deleted successfully",
          data: "deleted",
        })
      );
    } catch (error) {
      this.next(error);
    }
  }

  /**
   * Get One Crud Model
   *
   * -----------------
   *
   *
   * @param MyModel - it takes object as parameter {model, exempt}
   * @param data -data is the filter parameters and its an object  it takes `<key, value>`
   * @param populate - takes the model name and the fields from the you want to populate
   *
   * @example
   * ```ts
   * CrudModelI {
   * model: Model<any>;
   *exempt: string;
   *  }
   *   populate: { model?: string | undefined; fields?: string | undefined } ```
   *
   *   @example
   * // returns a response
   * getOne< T the model >(MyModel, category<T>, populate: { model?: string | undefined; fields?: string | undefined)})
   */
  async getOne<T>(
    MyModel: CrudModelI | CrudModelI[],
    data: FilterQuery<T>,
    populate: PopulateFieldI | PopulateFieldI[]
  ) {
    try {
      const get_data = [];
      let get_one: any;
      if (Array.isArray(MyModel)) {
        MyModel.forEach(async (model: CrudModelI) => {
          get_one = model.model.findOne(data).select(model.exempt);

          if (populate && Array.isArray(populate))
            for (const pop of populate) {
              if (pop.model)
                get_one = get_one.populate({
                  path: pop.model,
                  select: pop.fields,
                  populate: pop.second_layer_populate,
                });
            }
          else if (populate && !Array.isArray(populate))
            if (populate.model)
              get_one = get_one.populate({
                path: populate.model,
                select: populate.fields,
                populate: populate.second_layer_populate,
              });
          // if (!get_one)
          //   throw APP_ERROR(
          //     `${model} is not successfully fetched`,
          //     HTTP_RESPONSE.NOT_IMPLEMENTED
          //   );
          const gotten = await get_one.exec();
          get_data.push(gotten);
        });
      } else {
        get_one = MyModel.model.findOne(data).select(MyModel.exempt);

        // if (!get_one)
        //   throw APP_ERROR(
        //     `${MyModel} is not successfully fetched`,
        //     HTTP_RESPONSE.NOT_FOUND
        //   );
        if (populate && Array.isArray(populate))
          for (const pop of populate) {
            if (pop.model)
              get_one = get_one.populate({
                path: pop.model,
                select: pop.fields,
                populate: pop.second_layer_populate,
              });
          }
        else if (populate && !Array.isArray(populate))
          if (populate.model)
            get_one = get_one.populate({
              path: populate.model,
              select: populate.fields,
              populate: populate.second_layer_populate,
            });
        const gotten = await get_one.exec();

        get_data.push(gotten);
      }

      this.response.status(HTTP_RESPONSE.OK).json(
        responseMessage({
          success_status: true,
          message: " fetched successfully",
          data: get_data,
        })
      );
    } catch (error) {
      this.next(error);
    }
  }
}
