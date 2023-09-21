// import _pick from "lodash/pick";
import HTTP_STATUS from "http-status-codes";
import BaseController from "./BaseController";

class UserController extends BaseController {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns { Promise}
   * @memberof UserController
   */
  async create(req, res) {
    const payload = req.body;
    const response = await this.userRepository.create(payload);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "User created successfully!", HTTP_STATUS.CREATED);
  }
}

export default UserController;
