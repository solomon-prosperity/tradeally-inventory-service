/* eslint-disable no-underscore-dangle */
// import publishToRabitmq from "infra/libs/publishToRabitmq";
import ConflictError from "interfaces/http/errors/Conflict";
import { generateAPIKey } from "infra/support/helpers";
// import BadRequestError from "interfaces/http/errors/BadRequest";
import BaseRepository from "./BaseRepository";

class UserRepository extends BaseRepository {
  constructor({ models: { User }, tracing: { tracer, logSpanError, traceMongoQuery } }) {
    super({ Model: User });
    this.User = User;
    this.tracer = tracer;
    this.logSpanError = logSpanError;
    this.traceMongoQuery = traceMongoQuery;
    // this.publishToRabitmq = publishToRabitmq;
  }

  /**
   * Create a User
   * @param { Object } payload
   * @returns {Promise}
   * @memberof UserRepository
   */
  async create(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { companyName, registrationNumber, email } = payload;
        const response = await this.runInTransaction(async (session) => {
          // check for already existing user
          const isUser = await this.User.findOne({ email });
          if (isUser) throw new ConflictError("A User with this email already exists");
          const apiKey = generateAPIKey(email);
          const user = this.createDoc({ companyName, registrationNumber, email, apiKey }, session);
          return user;
        });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default UserRepository;
