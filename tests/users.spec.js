/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-undef */
import { expect } from "chai";
import request from "supertest";
import { server } from "./utils";

describe("User API tests /v1/users", () => {
  context("User Signup", function () {
    it("should allow a user to sign up with a unique email", (done) => {
      const newUser = {
        companyName: "Terry llc",
        registrationNumber: "RC0000000",
        email: "biz@terry.com", // test with a unique email
      };

      request(server)
        .post("/v1/users")
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("companyName");
          expect(res.body.data).to.have.property("registrationNumber");
          expect(res.body.data).to.have.property("email");
          expect(res.body.data).to.have.property("apiKey");
          expect(res.body.data.companyName).to.equal(newUser.companyName);
          expect(res.body.data.registrationNumber).to.equal(newUser.registrationNumber);
          expect(res.body.data.email).to.equal(newUser.email);

          done();
        });
    });

    it("should throw bad request error if the payload is missing a required field", (done) => {
      // payload is missing a required field
      const invalidPayload = {
        companyName: "Terry llc",
        email: "unique@unique.com",
      };

      request(server)
        .post("/v1/users")
        .send(invalidPayload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.statusCode).to.equal(400);
          expect(res.body.success).to.equal(false);
          done();
        });
    });

    it("should throw a conflict error if the email already exists", (done) => {
      const existingUser = {
        companyName: "Terry llc",
        registrationNumber: "RC0000000",
        email: "unique@unique.com", // use already existing email
      };

      request(server)
        .post("/v1/users")
        .send(existingUser)
        .expect(409)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.statusCode).to.equal(409);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal("A User with this email already exists");
          done();
        });
    });
  });
});
