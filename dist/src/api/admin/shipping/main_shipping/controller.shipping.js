"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllShippingFee = exports.deleteShippingFee = exports.updateShippingFee = exports.addShippingFee = exports.getOneShippingFee = exports.fetchCountryAndState = void 0;
const countries_states_json_1 = __importDefault(require("../countries_states.json"));
const custom_error_1 = require("../../../../utilities/custom_error");
const http_response_1 = require("../../../../utilities/http_response");
const response_message_1 = require("../../../../utilities/response_message");
const crud_1 = require("../../../general_factory/crud");
const model_shipping_1 = require("./model.shipping");
const fetchCountryAndState = async (request, response, next) => {
    const r = request.query;
    const { country, state } = r;
    try {
        const data = JSON.parse(JSON.stringify(countries_states_json_1.default));
        const result = data
            .filter((dat) => country ? dat.name.toLowerCase() === country.toLowerCase() : dat)
            .filter((data) => data.states.some((states) => state ? states.name.toLowerCase() === state.toLowerCase() : states));
        const m = result.map((a) => {
            return {
                name: a.name,
                states: a.states.map((s) => {
                    return { name: s.name };
                }),
            };
        });
        response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            data: m,
            success_status: true,
            message: "fetched address successfully",
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.fetchCountryAndState = fetchCountryAndState;
const getOneShippingFee = async (request, response, next) => {
    try {
        const get_shipping_fee = await model_shipping_1.SHIPPING.findById(request.params.id);
        if (!get_shipping_fee)
            throw (0, custom_error_1.APP_ERROR)("shipping fee for selected location not found");
        response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            data: { get_shipping_fee },
            success_status: true,
            message: "fetched address successfully",
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.getOneShippingFee = getOneShippingFee;
const addShippingFee = async (request, response, next) => {
    try {
        const { country, country_shipping_fee, states, use_country_shipping_fee_as_default, } = request.body;
        const find_country_in_db = await model_shipping_1.SHIPPING.findOne({
            country: country.toUpperCase(),
        });
        let create_country_shipping;
        if (!find_country_in_db) {
            if (use_country_shipping_fee_as_default) {
                states.map((state) => (state.state_shipping_fee = country_shipping_fee));
            }
            create_country_shipping = model_shipping_1.SHIPPING.create({
                created_by: request.user.id,
                country,
                country_shipping_fee,
                use_country_shipping_fee_as_default,
                states,
            });
            if (!create_country_shipping) {
                throw (0, custom_error_1.APP_ERROR)("oops shipping fee not created");
            }
        }
        else {
            if (use_country_shipping_fee_as_default) {
                states.map((state) => (state.state_shipping_fee = country_shipping_fee));
            }
            const update_shipping = await model_shipping_1.SHIPPING.updateOne({ country: find_country_in_db.country }, {
                $addToSet: {
                    states: { $each: states },
                },
                use_country_shipping_fee_as_default,
                country_shipping_fee,
            });
            if (!update_shipping)
                throw (0, custom_error_1.APP_ERROR)("sorry we couldn't update shipping either");
        }
        response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            data: create_country_shipping,
            success_status: true,
            message: "fetched address successfully",
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.addShippingFee = addShippingFee;
const updateShippingFee = async (request, response, next) => {
    try {
        const { country_shipping_fee, states, use_country_shipping_fee_as_default, } = request.body;
        const country = request.params.id;
        await model_shipping_1.SHIPPING.updateOne({ country }, { $addToSet: { states: { $each: states } } });
        const find_country_in_db = await model_shipping_1.SHIPPING.findOne({ country });
        if (find_country_in_db) {
            if (use_country_shipping_fee_as_default) {
                find_country_in_db?.states.map((state) => (state.state_shipping_fee =
                    country_shipping_fee ?? find_country_in_db.country_shipping_fee));
                find_country_in_db.use_country_shipping_fee_as_default =
                    use_country_shipping_fee_as_default;
            }
            await find_country_in_db.save();
        }
    }
    catch (error) {
        next(error);
    }
};
exports.updateShippingFee = updateShippingFee;
const deleteShippingFee = async (request, response, next) => {
    try {
        const shipping_crud = new crud_1.Crud(request, response, next);
        await shipping_crud.delete({ model: model_shipping_1.SHIPPING, exempt: "" }, {
            id: request.params.id,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteShippingFee = deleteShippingFee;
const getAllShippingFee = async (request, response, next) => {
    try {
        // const { state, country }: { state: string; country: string } = request.body;
        const get_many_shipping_fee = new crud_1.Crud(request, response, next);
        get_many_shipping_fee.getMany({ model: model_shipping_1.SHIPPING, exempt: "" }, request.query, {}, {});
    }
    catch (error) {
        next(error);
    }
};
exports.getAllShippingFee = getAllShippingFee;
