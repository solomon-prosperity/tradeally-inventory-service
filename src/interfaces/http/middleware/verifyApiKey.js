/* eslint-disable import/no-named-as-default */
/* eslint-disable import/prefer-default-export */
import models from "infra/database/models/mongoose";

const { User } = models;

// Middleware to verify the API key
export const verifyAPIKey = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"]; // Assuming you send the API key in the 'x-api-key' header

  if (!apiKey)
    res.status(401).json({ success: false, message: "Permission Denied, provide ApiKey" });
  const user = await User.findOne({ apiKey });
  if (!user) {
    res.status(401).json({ error: "Invalid API key" });
  }
  req.user = user;
  next();
};
