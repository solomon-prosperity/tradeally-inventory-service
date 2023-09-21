// import _pick from "lodash/pick";
import HTTP_STATUS from "http-status-codes";
import BaseController from "./BaseController";

class InventoryController extends BaseController {
  constructor({ inventoryRepository }) {
    super();
    this.inventoryRepository = inventoryRepository;
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns { Promise}
   * @memberof InventoryController
   */
  async create(req, res) {
    const userId = req.user._id;
    const response = await this.inventoryRepository.create(userId);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "Products created successfully!", HTTP_STATUS.CREATED);
  }

  async getUserProducts(req, res) {
    const userId = req.user._id;
    const payload = req.query;
    const response = await this.inventoryRepository.getProducts(userId, payload);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "Products retrieved successfully!", HTTP_STATUS.OK);
  }

  async getProduct(req, res) {
    const userId = req.user._id;
    const { productId } = req.params;
    const response = await this.inventoryRepository.getProduct(userId, productId);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "Product retrieved successfully!", HTTP_STATUS.OK);
  }

  async updateProductInventory(req, res) {
    const userId = req.user._id;
    const { productId } = req.params;
    const { productQty } = req.body;
    const response = await this.inventoryRepository.updateProductInventory(
      userId,
      productId,
      productQty
    );
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "Product Inventory increased successfully!", HTTP_STATUS.OK);
  }

  async decreaseProductInventory(req, res) {
    const userId = req.user._id;
    const { productId } = req.params;
    const { productQty } = req.body;
    const response = await this.inventoryRepository.decreaseProductInventory(
      userId,
      productId,
      productQty
    );
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "Product Inventory decreased successfully!", HTTP_STATUS.OK);
  }

  async getInventoryMetrics(req, res) {
    const userId = req.user._id;
    const payload = req.query;
    const response = await this.inventoryRepository.getMetrics(userId, payload);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "Metrics retrieved successfully!", HTTP_STATUS.OK);
  }
}

export default InventoryController;
