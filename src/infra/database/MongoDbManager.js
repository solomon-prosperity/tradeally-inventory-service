import mongoose from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

class MongoDbManager {
  constructor({ config, logger }) {
    mongoose.Promise = global.Promise;
    // initialize beautifyUnique on all schema
    mongoose.plugin(beautifyUnique);
    this.config = config;
    this.logger = logger;
  }

  async connect(poolSize = 25, autoIndex = true) {
    const dbName = this.config.get("database.name");
    const connectionString = `mongodb+srv://${encodeURIComponent(
      this.config.get("database.user")
    )}:${encodeURIComponent(this.config.get("database.password"))}@${this.config.get(
      "database.host"
    )}/test?retryWrites=true&w=majority`;

    const options = {
      poolSize, // Maintain up to 20 (default if not specified) socket connections,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
      autoIndex,
      // ssl: true,
      dbName,
    };
    if (this.config.get("database.auth")) {
      options.user = encodeURIComponent(this.config.get("database.user"));
      options.pass = encodeURIComponent(this.config.get("database.password"));
    }

    this.logger.info("Connecting to MongoDB database...");
    await mongoose.connect(connectionString, options).catch((error) => {
      this.logger.info("Error while connecting to MongoDB database");
      this.logger.error(error);
      process.exit(1);
    });

    // if (this.config.get("app.env") === "development") {
    //   mongoose.set("debug", true);
    // }

    this.logger.info("Connected to MongoDB database");
  }

  async close() {
    this.logger.debug("Closing database...");

    await mongoose.connection.close().catch((error) => {
      this.logger.info("Error while closing MongoDB database");
      this.logger.error(error);
      process.exit(1);
    });

    this.logger.info("MongoDB Database closed");
  }
}

export default MongoDbManager;
