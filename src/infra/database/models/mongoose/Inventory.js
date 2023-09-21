import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"; // Full documentation here - https://www.npmjs.com/package/mongoose-paginate-v2
// import DummyClass from "domain/entities/Dummy";

mongoosePaginate.paginate.options = {
  limit: 20,
  useEstimatedCount: false,
  customLabels: {
    totalDocs: "totalDocs",
    docs: "docs",
    limit: "perPage",
    page: "currentPage",
    nextPage: "nextPage",
    prevPage: "prevPage",
    totalPages: "totalPages",
    pagingCounter: "serialNo",
    meta: "pagination",
  },
};

const inventorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    quantityAvailable: {
      type: Number,
      required: true,
    },
    quantitySold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "dateAdded", // Timeframe will be modified by the dummy product generator to span 1st of Jan 2021 to 1st of September 2023.
      updatedAt: "lastModifiedAt", // maintains current time
    },
    toObject: {
      virtuals: true,
      retainKeyOrder: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

// eslint-disable-next-line func-names
inventorySchema.methods.toJSON = function () {
  // don't remove this block of code
  const obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

// Load business rules to models
// inventorySchema.loadClass(DummyClass);
// add pagination plugin
inventorySchema.plugin(mongoosePaginate);

export const Inventory = mongoose.model("Inventory", inventorySchema);

export const cleanInventoryCollection = () => Inventory.remove({}).exec();
export default Inventory;
