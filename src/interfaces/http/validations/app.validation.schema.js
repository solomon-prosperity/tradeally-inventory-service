/* eslint-disable import/prefer-default-export */
import BaseJoi from "joi";
import JoiDateExtention from "@hapi/joi-date";
// import moment from "moment";
// let tomorrow = moment().add(24, "hours").format("YYYY-MM-DD");
const Joi = BaseJoi.extend(JoiDateExtention);

// validation for creating user
export const createUserSchema = Joi.object({
  companyName: Joi.string().required(),
  registrationNumber: Joi.string().required(),
  email: Joi.string().email().required(),
});

// validation for getting user products
export const getUserProductsSchema = Joi.object({
  limit: Joi.number().integer().min(1).default(20),
  page: Joi.number().integer().min(1).default(1),
});

// validation for getting user products
export const getInventoryMetricsSchema = Joi.object({
  startDate: Joi.date().format("YYYY-MM-DD").utc().required(),
  endDate: Joi.date().format("YYYY-MM-DD").utc().min(Joi.ref("startDate")),
});

// validation for updating product inventory
export const updateProductInventorySchema = Joi.object({
  productQty: Joi.number().integer().min(1).required(),
});
