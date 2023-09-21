/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-undef */
import { expect } from "chai";
import request from "supertest";
import { server } from "./utils";

describe("Inventory API Tests /v1/inventory", () => {
  let apiKey;
  let productId;

  beforeEach((done) => {
    apiKey = "9d3ff4e60e0ac48846994d592efdbfebca01a590729a3b2c1a4c1721b62b90b3";
    productId = "650c2178e6542436047e160d";
    done();
  });
  context("Generate Products for Inventory", function () {
    it("should generate ten products for the user", (done) => {
      request(server)
        .post("/v1/inventory")
        .set("x-api-key", apiKey)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.data).to.be.an("array");
          expect(res.body.data).to.have.lengthOf(10);
          expect(res.body.data[0]).to.have.property("id");
          expect(res.body.data[0]).to.have.property("userId");
          expect(res.body.data[0]).to.have.property("quantitySold");
          expect(res.body.data[0]).to.have.property("productName");
          expect(res.body.data[0]).to.have.property("productPrice");
          expect(res.body.data[0]).to.have.property("quantityAvailable");
          expect(res.body.data[0]).to.have.property("dateAdded");
          done();
        });
    });

    it("should throw unauthorized error if the request header is without apiKey", (done) => {
      request(server)
        .post("/v1/inventory")
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.statusCode).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal("Permission Denied, provide ApiKey");
          done();
        });
    });

    it("should throw unauthorized error if the request header x-api-key is present but the apiKey is wrong", (done) => {
      request(server)
        .post("/v1/inventory")
        .set("x-api-key", "wrong-apiKey")
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.statusCode).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal("Invalid API key");
          done();
        });
    });
  });

  context("Update Product in the Inventory", function () {
    it("should increase the quantity of a product", (done) => {
      const payload = {
        productQty: 10,
      };
      request(server)
        .post(`/v1/inventory/${productId}`)
        .set("x-api-key", apiKey)
        .send(payload)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("userId");
          expect(res.body.data).to.have.property("quantitySold");
          expect(res.body.data).to.have.property("productName");
          expect(res.body.data).to.have.property("productPrice");
          expect(res.body.data).to.have.property("quantityAvailable");
          expect(res.body.data).to.have.property("dateAdded");
          done();
        });
    });

    it("should decrease the quantity of a product", (done) => {
      const payload = {
        productQty: 10,
      };
      request(server)
        .put(`/v1/inventory/${productId}`)
        .set("x-api-key", apiKey)
        .send(payload)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("userId");
          expect(res.body.data).to.have.property("quantitySold");
          expect(res.body.data).to.have.property("productName");
          expect(res.body.data).to.have.property("productPrice");
          expect(res.body.data).to.have.property("quantityAvailable");
          expect(res.body.data).to.have.property("dateAdded");
          done();
        });
    });

    it("should throw  validation error if the productQty to update is less than 1", (done) => {
      const payload = {
        productQty: 0,
      };
      request(server)
        .put(`/v1/inventory/${productId}`)
        .set("x-api-key", apiKey)
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.statusCode).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.name).to.equal("ValidationError");
          done();
        });
    });

    it("should throw  not enough product in stock error if the productQty to decrease is more than the available product quantity", (done) => {
      const payload = {
        productQty: 500000000, // test with an insanely high number :)
      };
      request(server)
        .put(`/v1/inventory/${productId}`)
        .set("x-api-key", apiKey)
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.statusCode).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal("Not enough products in stock");
          done();
        });
    });

    it("should throw  out of stock error if a decrease is attempted and the available product quantity is 0", (done) => {
      const payload = {
        productQty: 50,
      };
      productId = "650c2bdf10c26b3c3b75b646"; // use a productId with no available products
      request(server)
        .put(`/v1/inventory/${productId}`)
        .set("x-api-key", apiKey)
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.statusCode).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal("Product is out of stock");
          done();
        });
    });
  });

  context("Inventory Metrics", function () {
    it("should retrieve inventory metrics", (done) => {
      request(server)
        .get("/v1/inventory/metrics")
        .query({ startDate: "2021-01-01", endDate: "2023-09-01" })
        .set("x-api-key", apiKey)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.data).to.have.property("totalQtyOfProductsSold");
          expect(res.body.data).to.have.property("totalProductSold");
          expect(res.body.data).to.have.property("totalInventoryAvailable");
          expect(res.body.data).to.have.property("totalAverageSales");
          done();
        });
    });

    it("should throw validation error if the query params for timeframe(start and end date) is not set", (done) => {
      request(server)
        .get("/v1/inventory/metrics")
        .set("x-api-key", apiKey)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.statusCode).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.name).to.equal("ValidationError");
          done();
        });
    });
  });
});
