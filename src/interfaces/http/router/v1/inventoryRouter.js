import express from "express";
import { makeInvoker } from "awilix-express";
import MethodNotAllowedHandler from "interfaces/http/middleware/methodNotAllowed";
import catchErrors from "interfaces/http/errors/catchErrors";
import InventoryController from "interfaces/http/controllers/InventoryController";
import { verifyAPIKey } from "interfaces/http/middleware/verifyApiKey";
import {
  updateProductInventorySchema,
  getUserProductsSchema,
  getInventoryMetricsSchema,
} from "interfaces/http/validations/app.validation.schema";

const validator = require("express-joi-validation").createValidator({
  passError: true, // NOTE: this tells the module to pass the error along for you
});

const api = makeInvoker(InventoryController);
const router = express.Router();
/**
   * @api {post} /inventory Generate products for  a user
   * @apiGroup Inventory
   * @apiDescription This endpoint auto generates 10 products for a user and adds them to the inventory
   * @apiName CreateProducts
   * @apiVersion 1.0.0
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 201 OK
   *     {
    "success": true,
    "statusCode": 201,
    "message": "Products created successfully!",
    "data": [
        {
            "quantitySold": 3,
            "userId": "650b7e58f1dfdde968e6e27f",
            "productName": "Tasty Concrete Table",
            "productPrice": 352,
            "quantityAvailable": 7,
            "dateAdded": "2023-01-05T04:59:39.388Z",
            "id": "650b8468613184f630d1fd7b"
        },
        {
            "quantitySold": 37,
            "userId": "650b7e58f1dfdde968e6e27f",
            "productName": "Modern Bronze Chicken",
            "productPrice": 318,
            "quantityAvailable": 99,
            "dateAdded": "2022-02-05T09:21:30.492Z",
            "id": "650b8468613184f630d1fd7c"
        },
        {
            "quantitySold": 5,
            "userId": "650b7e58f1dfdde968e6e27f",
            "productName": "Licensed Plastic Ball",
            "productPrice": 186,
            "quantityAvailable": 5,
            "dateAdded": "2023-07-04T22:23:27.443Z",
            "id": "650b8468613184f630d1fd7d"
        },
        {
            "quantitySold": 0,
            "userId": "650b7e58f1dfdde968e6e27f",
            "productName": "Unbranded Cotton Hat",
            "productPrice": 696,
            "quantityAvailable": 50,
            "dateAdded": "2021-08-18T13:33:50.006Z",
            "id": "650b8468613184f630d1fd7e"
        },
        {
            "quantitySold": 5,
            "userId": "650b7e58f1dfdde968e6e27f",
            "productName": "Practical Plastic Tuna",
            "productPrice": 761,
            "quantityAvailable": 24,
            "dateAdded": "2022-07-08T09:04:02.431Z",
            "id": "650b8468613184f630d1fd7f"
        },
        {
            "quantitySold": 8,
            "userId": "650b7e58f1dfdde968e6e27f",
            "productName": "Modern Wooden Computer",
            "productPrice": 418,
            "quantityAvailable": 37,
            "dateAdded": "2023-05-24T19:51:30.113Z",
            "id": "650b8468613184f630d1fd80"
        },
        {
            "quantitySold": 52,
            "userId": "650b7e58f1dfdde968e6e27f",
            "productName": "Ergonomic Metal Soap",
            "productPrice": 724,
            "quantityAvailable": 74,
            "dateAdded": "2022-07-25T12:19:32.516Z",
            "id": "650b8468613184f630d1fd81"
        },
        {
            "quantitySold": 2,
            "userId": "650b7e58f1dfdde968e6e27f",
            "productName": "Practical Fresh Mouse",
            "productPrice": 554,
            "quantityAvailable": 12,
            "dateAdded": "2021-01-14T10:33:13.197Z",
            "id": "650b8468613184f630d1fd82"
        },
        {
            "quantitySold": 13,
            "userId": "650b7e58f1dfdde968e6e27f",
            "productName": "Handcrafted Plastic Towels",
            "productPrice": 883,
            "quantityAvailable": 29,
            "dateAdded": "2021-09-10T10:48:52.499Z",
            "id": "650b8468613184f630d1fd83"
        },
        {
            "quantitySold": 2,
            "userId": "650b7e58f1dfdde968e6e27f",
            "productName": "Generic Bronze Sausages",
            "productPrice": 544,
            "quantityAvailable": 13,
            "dateAdded": "2022-07-21T07:28:16.256Z",
            "id": "650b8468613184f630d1fd84"
        }
    ],
    "links": []
    }
   *
   * 
   * @apiHeader {String} x-api-key Secret API token
   *
   *  @apiUse MyError
  * 
   */

/* '/v1/inventory` */

/**
   * @api {get} /inventory Get User Inventory
   * @apiGroup Inventory
   * @apiDescription This endpoint retrieves user inventory
   * @apiName getProductsInventory
   * @apiVersion 1.0.0
   * @apiParam (Query) {Number} [page = 1]                  Page to display.
   * @apiParam (Query) {Number} [limit = 20]                Number of documents to return per page.
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 201 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "Products retrieved successfully!",
    "data": {
        "docs": [
            {
                "quantitySold": 17,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Handmade Wooden Shoes",
                "productPrice": 68,
                "quantityAvailable": 26,
                "dateAdded": "2021-03-19T16:06:32.222Z",
                "id": "650b83cf095785f5128f12ba"
            },
            {
                "quantitySold": 15,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Handmade Concrete Chicken",
                "productPrice": 578,
                "quantityAvailable": 95,
                "dateAdded": "2022-05-02T03:05:10.063Z",
                "id": "650b83cf095785f5128f12bb"
            },
            {
                "quantitySold": 57,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Incredible Granite Cheese",
                "productPrice": 453,
                "quantityAvailable": 88,
                "dateAdded": "2023-08-28T15:03:49.577Z",
                "id": "650b83cf095785f5128f12bc"
            },
            {
                "quantitySold": 6,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Unbranded Concrete Table",
                "productPrice": 890,
                "quantityAvailable": 7,
                "dateAdded": "2023-05-15T06:44:08.781Z",
                "id": "650b83cf095785f5128f12bd"
            },
            {
                "quantitySold": 66,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Practical Cotton Pizza",
                "productPrice": 517,
                "quantityAvailable": 80,
                "dateAdded": "2021-12-20T01:46:09.529Z",
                "id": "650b83cf095785f5128f12be"
            },
            {
                "quantitySold": 47,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Small Concrete Table",
                "productPrice": 47,
                "quantityAvailable": 47,
                "dateAdded": "2021-09-19T19:28:15.754Z",
                "id": "650b83cf095785f5128f12bf"
            },
            {
                "quantitySold": 54,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Elegant Rubber Sausages",
                "productPrice": 268,
                "quantityAvailable": 87,
                "dateAdded": "2021-03-23T22:13:39.732Z",
                "id": "650b83cf095785f5128f12c0"
            },
            {
                "quantitySold": 2,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Modern Plastic Table",
                "productPrice": 29,
                "quantityAvailable": 8,
                "dateAdded": "2021-12-19T15:22:20.256Z",
                "id": "650b83cf095785f5128f12c1"
            },
            {
                "quantitySold": 16,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Refined Plastic Chips",
                "productPrice": 604,
                "quantityAvailable": 83,
                "dateAdded": "2023-06-11T17:04:12.082Z",
                "id": "650b83cf095785f5128f12c2"
            },
            {
                "quantitySold": 29,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Practical Metal Gloves",
                "productPrice": 644,
                "quantityAvailable": 42,
                "dateAdded": "2023-07-27T00:43:17.331Z",
                "id": "650b83cf095785f5128f12c3"
            },
            {
                "quantitySold": 40,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Fantastic Rubber Fish",
                "productPrice": 696,
                "quantityAvailable": 63,
                "dateAdded": "2021-06-13T07:03:32.593Z",
                "id": "650b8439bb0ac5f592bba080"
            },
            {
                "quantitySold": 9,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Small Metal Ball",
                "productPrice": 260,
                "quantityAvailable": 11,
                "dateAdded": "2021-06-03T00:28:54.280Z",
                "id": "650b8439bb0ac5f592bba081"
            },
            {
                "quantitySold": 46,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Elegant Cotton Shirt",
                "productPrice": 292,
                "quantityAvailable": 66,
                "dateAdded": "2021-01-09T18:47:52.113Z",
                "id": "650b8439bb0ac5f592bba082"
            },
            {
                "quantitySold": 14,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Gorgeous Steel Hat",
                "productPrice": 704,
                "quantityAvailable": 24,
                "dateAdded": "2021-08-08T18:47:30.598Z",
                "id": "650b8439bb0ac5f592bba083"
            },
            {
                "quantitySold": 0,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Tasty Bronze Computer",
                "productPrice": 461,
                "quantityAvailable": 2,
                "dateAdded": "2021-12-14T02:34:15.159Z",
                "id": "650b8439bb0ac5f592bba084"
            },
            {
                "quantitySold": 79,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Awesome Fresh Table",
                "productPrice": 212,
                "quantityAvailable": 96,
                "dateAdded": "2021-04-19T06:38:15.771Z",
                "id": "650b8439bb0ac5f592bba085"
            },
            {
                "quantitySold": 2,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Handmade Granite Towels",
                "productPrice": 11,
                "quantityAvailable": 6,
                "dateAdded": "2023-03-19T05:33:17.193Z",
                "id": "650b8439bb0ac5f592bba086"
            },
            {
                "quantitySold": 1,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Licensed Cotton Bike",
                "productPrice": 966,
                "quantityAvailable": 6,
                "dateAdded": "2021-05-24T19:12:09.936Z",
                "id": "650b8439bb0ac5f592bba087"
            },
            {
                "quantitySold": 49,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Handmade Wooden Tuna",
                "productPrice": 610,
                "quantityAvailable": 85,
                "dateAdded": "2021-01-14T11:20:12.768Z",
                "id": "650b8439bb0ac5f592bba088"
            },
            {
                "quantitySold": 39,
                "userId": "650b7e58f1dfdde968e6e27f",
                "productName": "Rustic Concrete Bike",
                "productPrice": 676,
                "quantityAvailable": 71,
                "dateAdded": "2021-11-27T08:19:41.152Z",
                "id": "650b8439bb0ac5f592bba089"
            }
        ],
        "pagination": {
            "totalDocs": 60,
            "offset": 0,
            "perPage": 20,
            "totalPages": 3,
            "currentPage": 1,
            "serialNo": 1,
            "hasPrevPage": false,
            "hasNextPage": true,
            "prevPage": null,
            "nextPage": 2
        }
    },
    "links": []
  }
   *
   * 
   * @apiHeader {String} x-api-key Secret API token
   *
   *  @apiUse MyError
  * 
   */

/* '/v1/inventory` */
router
  .route("/")
  .post(verifyAPIKey, catchErrors(api("create")))
  .get(verifyAPIKey, validator.query(getUserProductsSchema), catchErrors(api("getUserProducts")))
  .all(MethodNotAllowedHandler);

/**
   * @api {get} /metrics Get Inventory Metrics
   * @apiGroup Inventory
   * @apiDescription This endpoint retrieves inventory metrics
   * @apiName getInventoryMetrics
   * @apiVersion 1.0.0
   * @apiParam (Query) {String} startDate                 Date Range for the metric.
   * @apiParam (Query) {String} endDate                   Date Range for the metric.
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 201 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "Metrics retrieved successfully!",
    "data": {
        "totalQtyOfProductsSold": 2522,
        "totalProductSold": 90,
        "totalInventoryAvailable": 4525,
        "totalAverageSales": 28.02
    },
    "links": []
    }
   *
   * 
   * @apiHeader {String} x-api-key Secret API token
   *
   *  @apiUse MyError
  * 
   */

/* '/v1/metrics` */
router
  .get(
    "/metrics",
    verifyAPIKey,
    validator.query(getInventoryMetricsSchema),
    catchErrors(api("getInventoryMetrics"))
  )
  .all(MethodNotAllowedHandler);
/**
   * @api {get} /inventory/:productId Get one Product from the Inventory
   * @apiGroup Inventory
   * @apiDescription This endpoint retrieves one product from the inventory
   * @apiName getProduct
   * @apiVersion 1.0.0
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 201 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "Product retrieved successfully!",
    "data": {
        "quantitySold": 57,
        "userId": "650b7e58f1dfdde968e6e27f",
        "productName": "Incredible Granite Cheese",
        "productPrice": 453,
        "quantityAvailable": 24,
        "dateAdded": "2023-08-28T15:03:49.577Z",
        "id": "650b83cf095785f5128f12bc"
    },
    "links": []
 }
   * 
   * @apiHeader {String} x-api-key Secret API token
   *
   *  @apiUse MyError
  * 
   */

/* '/v1/inventory/:productId` */

/**
   * @api {post} /inventory/:productId Update a Product Inventory
   * @apiGroup Inventory
   * @apiDescription This endpoint updates a product inventory
   * @apiName updateProductInventory
   * @apiVersion 1.0.0
   * @apiParam {Number} productQty       quantity of product to add to the inventory
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 201 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "Product Inventory updated successfully!",
    "data": {
        "quantitySold": 57,
        "userId": "650b7e58f1dfdde968e6e27f",
        "productName": "Incredible Granite Cheese",
        "productPrice": 453,
        "quantityAvailable": 108,
        "dateAdded": "2023-08-28T15:03:49.577Z",
        "id": "650b83cf095785f5128f12bc"
    },
    "links": []
  }

   * @apiParamExample Sample Request:
   *     
   *     {
   *       "productQty": 4
   *     }
   * 
   * @apiHeader {String} x-api-key Secret API token
   *
   *  @apiUse MyError
  * 
   */

/* '/v1/inventory/:productId` */

/**
   * @api {put} /inventory/:productId Decrease a Product Inventory
   * @apiGroup Inventory
   * @apiDescription This endpoint decreases a product inventory
   * @apiName decreaseProductInventory
   * @apiVersion 1.0.0
   * @apiParam {Number} productQty       quantity of product to remove from the inventory
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 201 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "Product Inventory updated successfully!",
    "data": {
        "quantitySold": 57,
        "userId": "650b7e58f1dfdde968e6e27f",
        "productName": "Incredible Granite Cheese",
        "productPrice": 453,
        "quantityAvailable": 108,
        "dateAdded": "2023-08-28T15:03:49.577Z",
        "id": "650b83cf095785f5128f12bc"
    },
    "links": []
  }

   * @apiParamExample Sample Request:
   *     
   *     {
   *       "productQty": 4
   *     }
   * 
   * @apiHeader {String} x-api-key Secret API token
   *
   *  @apiUse MyError
  * 
   */

/* '/v1/inventory/:productId` */
router
  .route("/:productId")
  .get(verifyAPIKey, catchErrors(api("getProduct")))
  .post(
    verifyAPIKey,
    validator.body(updateProductInventorySchema),
    catchErrors(api("updateProductInventory"))
  )
  .put(
    verifyAPIKey,
    validator.body(updateProductInventorySchema),
    catchErrors(api("decreaseProductInventory"))
  )
  .all(MethodNotAllowedHandler);

module.exports = router;
