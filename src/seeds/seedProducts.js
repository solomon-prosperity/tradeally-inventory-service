/* eslint-disable no-underscore-dangle */
// /* eslint-disable no-await-in-loop */
import config from "config";
import Logger from "infra/logging/Logger";
import MongoDbManager from "infra/database/MongoDbManager";
import { User } from "infra/database/models/mongoose/User";
import { Inventory } from "infra/database/models/mongoose/Inventory";
import { generateProducts } from "infra/support/helpers";

const logger = Logger;
const mongoDbManager = new MongoDbManager({ config, logger });

const seedProducts = async () => {
  await mongoDbManager.connect();
  const apiKey = "909d1fb76be5f2da82d676e0ba11a96d660d587f630b7eb4cad823a979131478";
  const user = await User.findOne({ apiKey });
  if (!user) {
    logger.error(
      "run the script to seed user first, then replace the apiKey variable in this script with the user apiKey that will be logged on your console"
    );
    process.exit(1);
  }
  const products = generateProducts(10, user._id);
  await Inventory.insertMany(products);
  // close script
  process.exit(0);
};

seedProducts();
