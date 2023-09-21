/* eslint-disable no-underscore-dangle */
// /* eslint-disable no-await-in-loop */
import config from "config";
import Logger from "infra/logging/Logger";
import MongoDbManager from "infra/database/MongoDbManager";
import Chance from "chance";
import { User } from "infra/database/models/mongoose/User";
import { generateAPIKey } from "infra/support/helpers";

const logger = Logger;
const mongoDbManager = new MongoDbManager({ config, logger });
const chance = new Chance();

const seedUser = async () => {
  await mongoDbManager.connect();
  const email = chance.email();
  const user = await User.create({
    companyName: chance.company(),
    registrationNumber: `RC${chance.integer({ min: 1000, max: 9999 })}`, // Add "RC" to the generated 4-digit number
    email,
    apiKey: generateAPIKey(email),
  });
  console.log({ userApiKey: user._doc.apiKey });
  // close script
  process.exit(0);
};

seedUser();
