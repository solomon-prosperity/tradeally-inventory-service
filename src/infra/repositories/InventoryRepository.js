/* eslint-disable no-underscore-dangle */
// import publishToRabitmq from "infra/libs/publishToRabitmq";
import { generateProducts } from "infra/support/helpers";
import BadRequestError from "interfaces/http/errors/BadRequest";
import ResourceNotFoundError from "interfaces/http/errors/ResourceNotFound";
import BaseRepository from "./BaseRepository";

class InventoryRepository extends BaseRepository {
  constructor({ models: { User, Inventory }, tracing: { tracer, logSpanError, traceMongoQuery } }) {
    super({ Model: Inventory });
    this.User = User;
    this.Inventory = Inventory;
    this.tracer = tracer;
    this.logSpanError = logSpanError;
    this.traceMongoQuery = traceMongoQuery;
    // this.publishToRabitmq = publishToRabitmq;
  }

  /**
   * Create Products
   * @param { Object } payload
   * @returns {Promise}
   * @memberof InventoryRepository
   */
  async create(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.runInTransaction(async (session) => {
          // check for user
          const user = await this.User.findOne({ _id: userId });
          if (!user) throw new BadRequestError("User does not exist");
          const products = generateProducts(10, userId);
          const newProducts = this.createManyDocs(products, session);
          return newProducts;
        });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get all User Products
   * @param { Object } payload
   * @returns {Promise}
   * @memberof InventoryRepository
   */
  async getProducts(userId, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        // check for user
        const user = await this.User.findOne({ _id: userId });
        if (!user) throw new BadRequestError("User does not exist");
        const { page = 1, limit = 20 } = payload;
        const products = await this.Inventory.paginate(
          { userId },
          { page, limit, sort: { dateAdded: -1 } }
        );

        resolve(products);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get single Product
   * @param { Object } payload
   * @returns {Promise}
   * @memberof InventoryRepository
   */
  async getProduct(userId, productId) {
    return new Promise(async (resolve, reject) => {
      try {
        // check for user
        const user = await this.User.findOne({ _id: userId });
        if (!user) throw new BadRequestError("User does not exist");
        // check if productId is valid
        const isValidId = await this.isValidId(productId);
        if (!isValidId) throw new BadRequestError("ProductId is invalid");
        const product = await this.Inventory.findOne({ _id: productId, userId });
        if (!product) throw new ResourceNotFoundError("Product not found");

        resolve(product);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Increase Product Inventory
   * @param { Object } payload
   * @returns {Promise}
   * @memberof InventoryRepository
   */
  async updateProductInventory(userId, productId, productQty) {
    return new Promise(async (resolve, reject) => {
      try {
        // check for user
        const user = await this.User.findOne({ _id: userId });
        if (!user) throw new BadRequestError("User does not exist");
        // check if productId is valid
        const isValidId = await this.isValidId(productId);
        if (!isValidId) throw new BadRequestError("ProductId is invalid");
        const response = await this.runInTransaction(async (session) => {
          const product = await this.Inventory.findOne({ _id: productId, userId });
          if (!product) throw new ResourceNotFoundError("Product not found");

          // Update the product using optimistic locking
          product.quantityAvailable += productQty;

          // Save the updated product with a version check,
          // this ensures the document is only updated if it's version hasn't changed since it was retrieved. Important for race condition
          const updatedProduct = await product.save({ validateBeforeSave: true, session });
          if (!updatedProduct) throw new Error("Failed to update Product Inventory");
          return product;
        });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Decrease Product Inventory
   * @param { Object } payload
   * @returns {Promise}
   * @memberof InventoryRepository
   */
  async decreaseProductInventory(userId, productId, productQty) {
    return new Promise(async (resolve, reject) => {
      try {
        // check for user
        const user = await this.User.findOne({ _id: userId });
        if (!user) throw new BadRequestError("User does not exist");
        // check if productId is valid
        const isValidId = await this.isValidId(productId);
        if (!isValidId) throw new BadRequestError("ProductId is invalid");
        const response = await this.runInTransaction(async (session) => {
          const product = await this.Inventory.findOne({ _id: productId, userId });
          if (!product) throw new ResourceNotFoundError("Product not found");

          // check if product is still in stock
          if (product.quantityAvailable === 0) throw new BadRequestError("Product is out of stock");

          // Check if there are enough products in stock
          if (product.quantityAvailable < productQty) {
            throw new BadRequestError("Not enough products in stock");
          }
          // Update the product using optimistic locking
          product.quantityAvailable -= productQty;
          product.quantitySold += productQty;

          // Save the updated product with a version check,
          // this ensures the document is only updated if it's version hasn't changed since it was retrieved. Important for race condition
          const updatedProduct = await product.save({ validateBeforeSave: true, session });
          if (!updatedProduct) throw new Error("Failed to update Product Inventory");
          return product;
        });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get Inventory Metrics
   * @param { Object } payload
   * @returns {Promise}
   * @memberof InventoryRepository
   */
  async getMetrics(userId, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        // check for user
        const user = await this.User.findOne({ _id: userId });
        if (!user) throw new BadRequestError("User does not exist");
        const { startDate, endDate } = payload;
        const response = await this.Inventory.aggregate([
          {
            $match: {
              userId: userId.toString(),
              dateAdded: { $gte: startDate, $lte: endDate }, // Filter User products within the date range
            },
          },
          {
            $group: {
              _id: null, // Group all products together
              totalQtyOfProductsSold: { $sum: "$quantitySold" }, // Calculate the total quantity of products sold within the timeframe
              totalProductSold: { $sum: 1 }, // Calculate the total number of products sold within the timeframe
              totalInventoryAvailable: {
                $sum: { $sum: "$quantityAvailable" }, // Calculate the total number of products still available within the timeframe
              },
            },
          },
          {
            $project: {
              _id: 0, // Exclude _id field from the result
              totalAverageSales: {
                $round: [{ $divide: ["$totalQtyOfProductsSold", "$totalProductSold"] }, 2],
              }, // Calculate the average sales and round off to 2 decimal places
              totalQtyOfProductsSold: 1,
              totalProductSold: 1,
              totalInventoryAvailable: 1,
            },
          },
        ]);

        resolve(response[0]);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default InventoryRepository;
