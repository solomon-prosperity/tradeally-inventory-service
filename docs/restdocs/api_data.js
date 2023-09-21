define({ "api": [
  {
    "type": "post",
    "url": "/inventory",
    "title": "Generate products for  a user",
    "group": "Inventory",
    "description": "<p>This endpoint auto generates 10 products for a user and adds them to the inventory</p>",
    "name": "CreateProducts",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 201 OK\n{\n\"success\": true,\n\"statusCode\": 201,\n\"message\": \"Products created successfully!\",\n\"data\": [\n    {\n        \"quantitySold\": 3,\n        \"userId\": \"650b7e58f1dfdde968e6e27f\",\n        \"productName\": \"Tasty Concrete Table\",\n        \"productPrice\": 352,\n        \"quantityAvailable\": 7,\n        \"dateAdded\": \"2023-01-05T04:59:39.388Z\",\n        \"id\": \"650b8468613184f630d1fd7b\"\n    },\n    {\n        \"quantitySold\": 37,\n        \"userId\": \"650b7e58f1dfdde968e6e27f\",\n        \"productName\": \"Modern Bronze Chicken\",\n        \"productPrice\": 318,\n        \"quantityAvailable\": 99,\n        \"dateAdded\": \"2022-02-05T09:21:30.492Z\",\n        \"id\": \"650b8468613184f630d1fd7c\"\n    },\n    {\n        \"quantitySold\": 5,\n        \"userId\": \"650b7e58f1dfdde968e6e27f\",\n        \"productName\": \"Licensed Plastic Ball\",\n        \"productPrice\": 186,\n        \"quantityAvailable\": 5,\n        \"dateAdded\": \"2023-07-04T22:23:27.443Z\",\n        \"id\": \"650b8468613184f630d1fd7d\"\n    },\n    {\n        \"quantitySold\": 0,\n        \"userId\": \"650b7e58f1dfdde968e6e27f\",\n        \"productName\": \"Unbranded Cotton Hat\",\n        \"productPrice\": 696,\n        \"quantityAvailable\": 50,\n        \"dateAdded\": \"2021-08-18T13:33:50.006Z\",\n        \"id\": \"650b8468613184f630d1fd7e\"\n    },\n    {\n        \"quantitySold\": 5,\n        \"userId\": \"650b7e58f1dfdde968e6e27f\",\n        \"productName\": \"Practical Plastic Tuna\",\n        \"productPrice\": 761,\n        \"quantityAvailable\": 24,\n        \"dateAdded\": \"2022-07-08T09:04:02.431Z\",\n        \"id\": \"650b8468613184f630d1fd7f\"\n    },\n    {\n        \"quantitySold\": 8,\n        \"userId\": \"650b7e58f1dfdde968e6e27f\",\n        \"productName\": \"Modern Wooden Computer\",\n        \"productPrice\": 418,\n        \"quantityAvailable\": 37,\n        \"dateAdded\": \"2023-05-24T19:51:30.113Z\",\n        \"id\": \"650b8468613184f630d1fd80\"\n    },\n    {\n        \"quantitySold\": 52,\n        \"userId\": \"650b7e58f1dfdde968e6e27f\",\n        \"productName\": \"Ergonomic Metal Soap\",\n        \"productPrice\": 724,\n        \"quantityAvailable\": 74,\n        \"dateAdded\": \"2022-07-25T12:19:32.516Z\",\n        \"id\": \"650b8468613184f630d1fd81\"\n    },\n    {\n        \"quantitySold\": 2,\n        \"userId\": \"650b7e58f1dfdde968e6e27f\",\n        \"productName\": \"Practical Fresh Mouse\",\n        \"productPrice\": 554,\n        \"quantityAvailable\": 12,\n        \"dateAdded\": \"2021-01-14T10:33:13.197Z\",\n        \"id\": \"650b8468613184f630d1fd82\"\n    },\n    {\n        \"quantitySold\": 13,\n        \"userId\": \"650b7e58f1dfdde968e6e27f\",\n        \"productName\": \"Handcrafted Plastic Towels\",\n        \"productPrice\": 883,\n        \"quantityAvailable\": 29,\n        \"dateAdded\": \"2021-09-10T10:48:52.499Z\",\n        \"id\": \"650b8468613184f630d1fd83\"\n    },\n    {\n        \"quantitySold\": 2,\n        \"userId\": \"650b7e58f1dfdde968e6e27f\",\n        \"productName\": \"Generic Bronze Sausages\",\n        \"productPrice\": 544,\n        \"quantityAvailable\": 13,\n        \"dateAdded\": \"2022-07-21T07:28:16.256Z\",\n        \"id\": \"650b8468613184f630d1fd84\"\n    }\n],\n\"links\": []\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>Secret API token</p>"
          }
        ]
      }
    },
    "filename": "src/interfaces/http/router/v1/inventoryRouter.js",
    "groupTitle": "Inventory",
    "sampleRequest": [
      {
        "url": "https://tradeally-inventory-service.onrender.com/inventory"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Other Error Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n  \"success\": false,\n  \"statusCode\": 404,\n  \"message\": \"You have attempted to get a resource that does not exist.\",\n  \"name\": \"ResourceNotFoundError\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/inventory/:productId",
    "title": "Decrease a Product Inventory",
    "group": "Inventory",
    "description": "<p>This endpoint decreases a product inventory</p>",
    "name": "decreaseProductInventory",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "productQty",
            "description": "<p>quantity of product to remove from the inventory</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sample Request:",
          "content": "\n{\n  \"productQty\": 4\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "  HTTP/1.1 201 OK\n  {\n  \"success\": true,\n  \"statusCode\": 200,\n  \"message\": \"Product Inventory updated successfully!\",\n  \"data\": {\n      \"quantitySold\": 57,\n      \"userId\": \"650b7e58f1dfdde968e6e27f\",\n      \"productName\": \"Incredible Granite Cheese\",\n      \"productPrice\": 453,\n      \"quantityAvailable\": 108,\n      \"dateAdded\": \"2023-08-28T15:03:49.577Z\",\n      \"id\": \"650b83cf095785f5128f12bc\"\n  },\n  \"links\": []\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>Secret API token</p>"
          }
        ]
      }
    },
    "filename": "src/interfaces/http/router/v1/inventoryRouter.js",
    "groupTitle": "Inventory",
    "sampleRequest": [
      {
        "url": "https://tradeally-inventory-service.onrender.com/inventory/:productId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Other Error Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n  \"success\": false,\n  \"statusCode\": 404,\n  \"message\": \"You have attempted to get a resource that does not exist.\",\n  \"name\": \"ResourceNotFoundError\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/metrics",
    "title": "Get Inventory Metrics",
    "group": "Inventory",
    "description": "<p>This endpoint retrieves inventory metrics</p>",
    "name": "getInventoryMetrics",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>Date Range for the metric.</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>Date Range for the metric.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 201 OK\n{\n\"success\": true,\n\"statusCode\": 200,\n\"message\": \"Metrics retrieved successfully!\",\n\"data\": {\n    \"totalQtyOfProductsSold\": 2522,\n    \"totalProductSold\": 90,\n    \"totalInventoryAvailable\": 4525,\n    \"totalAverageSales\": 28.02\n},\n\"links\": []\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>Secret API token</p>"
          }
        ]
      }
    },
    "filename": "src/interfaces/http/router/v1/inventoryRouter.js",
    "groupTitle": "Inventory",
    "sampleRequest": [
      {
        "url": "https://tradeally-inventory-service.onrender.com/metrics"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Other Error Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n  \"success\": false,\n  \"statusCode\": 404,\n  \"message\": \"You have attempted to get a resource that does not exist.\",\n  \"name\": \"ResourceNotFoundError\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/inventory/:productId",
    "title": "Get one Product from the Inventory",
    "group": "Inventory",
    "description": "<p>This endpoint retrieves one product from the inventory</p>",
    "name": "getProduct",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "   HTTP/1.1 201 OK\n   {\n   \"success\": true,\n   \"statusCode\": 200,\n   \"message\": \"Product retrieved successfully!\",\n   \"data\": {\n       \"quantitySold\": 57,\n       \"userId\": \"650b7e58f1dfdde968e6e27f\",\n       \"productName\": \"Incredible Granite Cheese\",\n       \"productPrice\": 453,\n       \"quantityAvailable\": 24,\n       \"dateAdded\": \"2023-08-28T15:03:49.577Z\",\n       \"id\": \"650b83cf095785f5128f12bc\"\n   },\n   \"links\": []\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>Secret API token</p>"
          }
        ]
      }
    },
    "filename": "src/interfaces/http/router/v1/inventoryRouter.js",
    "groupTitle": "Inventory",
    "sampleRequest": [
      {
        "url": "https://tradeally-inventory-service.onrender.com/inventory/:productId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Other Error Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n  \"success\": false,\n  \"statusCode\": 404,\n  \"message\": \"You have attempted to get a resource that does not exist.\",\n  \"name\": \"ResourceNotFoundError\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/inventory",
    "title": "Get User Inventory",
    "group": "Inventory",
    "description": "<p>This endpoint retrieves user inventory</p>",
    "name": "getProductsInventory",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Page to display.</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Number of documents to return per page.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "  HTTP/1.1 201 OK\n  {\n  \"success\": true,\n  \"statusCode\": 200,\n  \"message\": \"Products retrieved successfully!\",\n  \"data\": {\n      \"docs\": [\n          {\n              \"quantitySold\": 17,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Handmade Wooden Shoes\",\n              \"productPrice\": 68,\n              \"quantityAvailable\": 26,\n              \"dateAdded\": \"2021-03-19T16:06:32.222Z\",\n              \"id\": \"650b83cf095785f5128f12ba\"\n          },\n          {\n              \"quantitySold\": 15,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Handmade Concrete Chicken\",\n              \"productPrice\": 578,\n              \"quantityAvailable\": 95,\n              \"dateAdded\": \"2022-05-02T03:05:10.063Z\",\n              \"id\": \"650b83cf095785f5128f12bb\"\n          },\n          {\n              \"quantitySold\": 57,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Incredible Granite Cheese\",\n              \"productPrice\": 453,\n              \"quantityAvailable\": 88,\n              \"dateAdded\": \"2023-08-28T15:03:49.577Z\",\n              \"id\": \"650b83cf095785f5128f12bc\"\n          },\n          {\n              \"quantitySold\": 6,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Unbranded Concrete Table\",\n              \"productPrice\": 890,\n              \"quantityAvailable\": 7,\n              \"dateAdded\": \"2023-05-15T06:44:08.781Z\",\n              \"id\": \"650b83cf095785f5128f12bd\"\n          },\n          {\n              \"quantitySold\": 66,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Practical Cotton Pizza\",\n              \"productPrice\": 517,\n              \"quantityAvailable\": 80,\n              \"dateAdded\": \"2021-12-20T01:46:09.529Z\",\n              \"id\": \"650b83cf095785f5128f12be\"\n          },\n          {\n              \"quantitySold\": 47,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Small Concrete Table\",\n              \"productPrice\": 47,\n              \"quantityAvailable\": 47,\n              \"dateAdded\": \"2021-09-19T19:28:15.754Z\",\n              \"id\": \"650b83cf095785f5128f12bf\"\n          },\n          {\n              \"quantitySold\": 54,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Elegant Rubber Sausages\",\n              \"productPrice\": 268,\n              \"quantityAvailable\": 87,\n              \"dateAdded\": \"2021-03-23T22:13:39.732Z\",\n              \"id\": \"650b83cf095785f5128f12c0\"\n          },\n          {\n              \"quantitySold\": 2,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Modern Plastic Table\",\n              \"productPrice\": 29,\n              \"quantityAvailable\": 8,\n              \"dateAdded\": \"2021-12-19T15:22:20.256Z\",\n              \"id\": \"650b83cf095785f5128f12c1\"\n          },\n          {\n              \"quantitySold\": 16,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Refined Plastic Chips\",\n              \"productPrice\": 604,\n              \"quantityAvailable\": 83,\n              \"dateAdded\": \"2023-06-11T17:04:12.082Z\",\n              \"id\": \"650b83cf095785f5128f12c2\"\n          },\n          {\n              \"quantitySold\": 29,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Practical Metal Gloves\",\n              \"productPrice\": 644,\n              \"quantityAvailable\": 42,\n              \"dateAdded\": \"2023-07-27T00:43:17.331Z\",\n              \"id\": \"650b83cf095785f5128f12c3\"\n          },\n          {\n              \"quantitySold\": 40,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Fantastic Rubber Fish\",\n              \"productPrice\": 696,\n              \"quantityAvailable\": 63,\n              \"dateAdded\": \"2021-06-13T07:03:32.593Z\",\n              \"id\": \"650b8439bb0ac5f592bba080\"\n          },\n          {\n              \"quantitySold\": 9,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Small Metal Ball\",\n              \"productPrice\": 260,\n              \"quantityAvailable\": 11,\n              \"dateAdded\": \"2021-06-03T00:28:54.280Z\",\n              \"id\": \"650b8439bb0ac5f592bba081\"\n          },\n          {\n              \"quantitySold\": 46,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Elegant Cotton Shirt\",\n              \"productPrice\": 292,\n              \"quantityAvailable\": 66,\n              \"dateAdded\": \"2021-01-09T18:47:52.113Z\",\n              \"id\": \"650b8439bb0ac5f592bba082\"\n          },\n          {\n              \"quantitySold\": 14,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Gorgeous Steel Hat\",\n              \"productPrice\": 704,\n              \"quantityAvailable\": 24,\n              \"dateAdded\": \"2021-08-08T18:47:30.598Z\",\n              \"id\": \"650b8439bb0ac5f592bba083\"\n          },\n          {\n              \"quantitySold\": 0,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Tasty Bronze Computer\",\n              \"productPrice\": 461,\n              \"quantityAvailable\": 2,\n              \"dateAdded\": \"2021-12-14T02:34:15.159Z\",\n              \"id\": \"650b8439bb0ac5f592bba084\"\n          },\n          {\n              \"quantitySold\": 79,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Awesome Fresh Table\",\n              \"productPrice\": 212,\n              \"quantityAvailable\": 96,\n              \"dateAdded\": \"2021-04-19T06:38:15.771Z\",\n              \"id\": \"650b8439bb0ac5f592bba085\"\n          },\n          {\n              \"quantitySold\": 2,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Handmade Granite Towels\",\n              \"productPrice\": 11,\n              \"quantityAvailable\": 6,\n              \"dateAdded\": \"2023-03-19T05:33:17.193Z\",\n              \"id\": \"650b8439bb0ac5f592bba086\"\n          },\n          {\n              \"quantitySold\": 1,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Licensed Cotton Bike\",\n              \"productPrice\": 966,\n              \"quantityAvailable\": 6,\n              \"dateAdded\": \"2021-05-24T19:12:09.936Z\",\n              \"id\": \"650b8439bb0ac5f592bba087\"\n          },\n          {\n              \"quantitySold\": 49,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Handmade Wooden Tuna\",\n              \"productPrice\": 610,\n              \"quantityAvailable\": 85,\n              \"dateAdded\": \"2021-01-14T11:20:12.768Z\",\n              \"id\": \"650b8439bb0ac5f592bba088\"\n          },\n          {\n              \"quantitySold\": 39,\n              \"userId\": \"650b7e58f1dfdde968e6e27f\",\n              \"productName\": \"Rustic Concrete Bike\",\n              \"productPrice\": 676,\n              \"quantityAvailable\": 71,\n              \"dateAdded\": \"2021-11-27T08:19:41.152Z\",\n              \"id\": \"650b8439bb0ac5f592bba089\"\n          }\n      ],\n      \"pagination\": {\n          \"totalDocs\": 60,\n          \"offset\": 0,\n          \"perPage\": 20,\n          \"totalPages\": 3,\n          \"currentPage\": 1,\n          \"serialNo\": 1,\n          \"hasPrevPage\": false,\n          \"hasNextPage\": true,\n          \"prevPage\": null,\n          \"nextPage\": 2\n      }\n  },\n  \"links\": []\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>Secret API token</p>"
          }
        ]
      }
    },
    "filename": "src/interfaces/http/router/v1/inventoryRouter.js",
    "groupTitle": "Inventory",
    "sampleRequest": [
      {
        "url": "https://tradeally-inventory-service.onrender.com/inventory"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Other Error Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n  \"success\": false,\n  \"statusCode\": 404,\n  \"message\": \"You have attempted to get a resource that does not exist.\",\n  \"name\": \"ResourceNotFoundError\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/inventory/:productId",
    "title": "Update a Product Inventory",
    "group": "Inventory",
    "description": "<p>This endpoint updates a product inventory</p>",
    "name": "updateProductInventory",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "productQty",
            "description": "<p>quantity of product to add to the inventory</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sample Request:",
          "content": "\n{\n  \"productQty\": 4\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "  HTTP/1.1 201 OK\n  {\n  \"success\": true,\n  \"statusCode\": 200,\n  \"message\": \"Product Inventory updated successfully!\",\n  \"data\": {\n      \"quantitySold\": 57,\n      \"userId\": \"650b7e58f1dfdde968e6e27f\",\n      \"productName\": \"Incredible Granite Cheese\",\n      \"productPrice\": 453,\n      \"quantityAvailable\": 108,\n      \"dateAdded\": \"2023-08-28T15:03:49.577Z\",\n      \"id\": \"650b83cf095785f5128f12bc\"\n  },\n  \"links\": []\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>Secret API token</p>"
          }
        ]
      }
    },
    "filename": "src/interfaces/http/router/v1/inventoryRouter.js",
    "groupTitle": "Inventory",
    "sampleRequest": [
      {
        "url": "https://tradeally-inventory-service.onrender.com/inventory/:productId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Other Error Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n  \"success\": false,\n  \"statusCode\": 404,\n  \"message\": \"You have attempted to get a resource that does not exist.\",\n  \"name\": \"ResourceNotFoundError\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create a user",
    "group": "Users",
    "description": "<p>This endpoint creates a user</p>",
    "name": "CreateUser",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>name of company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "registrationNumber",
            "description": "<p>registration number of company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email address of company.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sample Request:",
          "content": "\n{\n  \"companyName\": \"Tradeally LLC\",\n  \"registrationNumber\": \"RC1111111\",\n  \"email\": \"hello@tradeally.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 201 OK\n{\n\"success\": true,\n\"statusCode\": 201,\n\"message\": \"User created successfully!\",\n\"data\": {\n    \"companyName\": \"TradeAlly LLC\",\n    \"registrationNumber\": \"RC111111\",\n    \"email\": \"helloo@tradeally.com\",\n    \"apiKey\": \"0c7fe1cfed700f268ef99ae354bf7a1c1c129e63cf0e3bea5b657af0c7869751\",\n    \"createdAt\": \"2023-09-20T23:04:39.158Z\",\n    \"lastModifiedAt\": \"2023-09-20T23:04:39.158Z\",\n    \"_createdAt\": \"2023-09-21T00:04:3939+01:00\",\n    \"_lastModifiedAt\": \"2023-09-21T00:04:3939+01:00\",\n    \"id\": \"650b7a87def9f0e0abc6284f\"\n},\n\"links\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/interfaces/http/router/v1/userRouter.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "https://tradeally-inventory-service.onrender.com/users"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Other Error Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n  \"success\": false,\n  \"statusCode\": 404,\n  \"message\": \"You have attempted to get a resource that does not exist.\",\n  \"name\": \"ResourceNotFoundError\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    }
  }
] });
