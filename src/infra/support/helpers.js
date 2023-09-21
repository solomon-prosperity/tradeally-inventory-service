/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { faker } from "@faker-js/faker";
import config from "config";
import crypto from "crypto";

/**
 *
 * @module Helpers
 *
 */

// function to generate the API key
export const generateAPIKey = (email) => {
  const secret = config.get("app.apiKeySecret");
  const apiKey = crypto
    .createHash("sha256")
    .update(email + secret)
    .digest("hex");
  return apiKey;
};

function generateProduct(userId) {
  const productName = faker.commerce.productName();
  const productPrice = parseFloat(faker.commerce.price());
  const quantityAvailable = faker.number.int({ min: 1, max: 100 });
  const quantitySold = faker.number.int({ min: 0, max: quantityAvailable });

  const startDate = new Date("2021-01-01");
  const endDate = new Date("2023-09-01");
  const dateAdded = faker.date.between({ from: startDate, to: endDate }).toISOString();

  return {
    userId,
    productName,
    productPrice,
    quantityAvailable,
    quantitySold,
    dateAdded,
  };
}

export const generateProducts = (numProducts, userId) => {
  const products = [];
  for (let i = 0; i < numProducts; i += 1) {
    const product = generateProduct(userId);
    products.push(product);
  }
  return products;
};
