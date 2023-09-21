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

const userSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "lastModifiedAt",
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
userSchema.methods.toJSON = function () {
  // don't remove this block of code
  const obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

// Load business rules to models
// userSchema.loadClass(DummyClass);
// add pagination plugin
userSchema.plugin(mongoosePaginate);

export const User = mongoose.model("User", userSchema);

export const cleanUserCollection = () => User.remove({}).exec();
export default User;
