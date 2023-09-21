import express from "express";
import { makeInvoker } from "awilix-express";
import MethodNotAllowedHandler from "interfaces/http/middleware/methodNotAllowed";
import catchErrors from "interfaces/http/errors/catchErrors";
import UserController from "interfaces/http/controllers/UserController";
import { createUserSchema } from "interfaces/http/validations/app.validation.schema";

const validator = require("express-joi-validation").createValidator({
  passError: true, // NOTE: this tells the module to pass the error along for you
});

const api = makeInvoker(UserController);
const router = express.Router();
/**
   * @api {post} /users Create a user
   * @apiGroup Users
   * @apiDescription This endpoint creates a user
   * @apiName CreateUser
   * @apiVersion 1.0.0
   * @apiParam {String} companyName       name of company.
   * @apiParam {String} registrationNumber          registration number of company.
   * @apiParam {String} email          email address of company.
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 201 OK
   *     {
    "success": true,
    "statusCode": 201,
    "message": "User created successfully!",
    "data": {
        "companyName": "TradeAlly LLC",
        "registrationNumber": "RC111111",
        "email": "helloo@tradeally.com",
        "apiKey": "0c7fe1cfed700f268ef99ae354bf7a1c1c129e63cf0e3bea5b657af0c7869751",
        "createdAt": "2023-09-20T23:04:39.158Z",
        "lastModifiedAt": "2023-09-20T23:04:39.158Z",
        "_createdAt": "2023-09-21T00:04:3939+01:00",
        "_lastModifiedAt": "2023-09-21T00:04:3939+01:00",
        "id": "650b7a87def9f0e0abc6284f"
    },
    "links": []
    }
   *
   * @apiParamExample Sample Request:
   *     
   *     {
   *       "companyName": "Tradeally LLC",
   *       "registrationNumber": "RC1111111",
   *       "email": "hello@tradeally.com"
   *     }
   * 
   *
   *  @apiUse MyError
  * 
   */

/* '/v1/user` */
router
  .route("/")
  .post(validator.body(createUserSchema), catchErrors(api("create")))
  .all(MethodNotAllowedHandler);

module.exports = router;
