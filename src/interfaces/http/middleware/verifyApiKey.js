/* eslint-disable consistent-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/prefer-default-export */
import models from "infra/database/models/mongoose";

const { User } = models;

// Middleware to verify the API key
export const verifyAPIKey = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"]; // Assuming you send the API key in the 'x-api-key' header

  if (!apiKey) {
    return res
      .status(401)
      .json({ success: false, statusCode: 401, message: "Permission Denied, provide ApiKey" });
  }

  try {
    // verify api key
    const user = await User.findOne({ apiKey });
    if (!user) {
      return res.status(401).json({ success: false, statusCode: 401, message: "Invalid API key" });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ success: false, msg: `${error.message}` });
    }
    console.log({ error });
  }
};
