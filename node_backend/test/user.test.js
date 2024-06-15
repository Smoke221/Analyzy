const request = require("supertest");
const express = require("express");
const { createAccount, login } = require("../controllers/userController");
const { userModel } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Mock dependencies
jest.mock("../models/user");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const app = express();
app.use(express.json());
app.post("/createAccount", createAccount);
app.post("/login", login);

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createAccount", () => {
    it("should create a new user successfully", async () => {
      bcrypt.hash.mockResolvedValue("hashedPassword");
      userModel.findOne.mockResolvedValue(null);
      userModel.prototype.save = jest.fn().mockResolvedValue(true);

      const response = await request(app).post("/createAccount").send({
        name: "John",
        email: "john@example.com",
        password: "password123",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User registered successfully.");
    });

    it("should return an error if the user already exists", async () => {
      //   This line mocks the userModel.findOne method to always return a resolved promise with an object containing the email "existing@example.com".
      //   This simulates the scenario where the user already exists in the database.
      userModel.findOne.mockResolvedValue({ email: "existing@example.com" });

      const response = await request(app).post("/createAccount").send({
        name: "John",
        //Even though the email doesn't actually exist in my real database, the mocked response makes the code think it does.
        email: "existing@example.com",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User already exists. Please log in.");
    });

    it("should handle server errors", async () => {
      userModel.findOne.mockRejectedValue(new Error("Database error"));

      const response = await request(app).post("/createAccount").send({
        name: "John",
        email: "john@example.com",
        password: "password123",
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Internal server error");
    });
  });

  describe("login", () => {
    it("should log in the user successfully", async () => {
      userModel.findOne.mockResolvedValue({
        email: "john@example.com",
        password: "hashedPassword",
        _id: "userId123",
      });

      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token123");

      const response = await request(app)
        .post("/login")
        .send({ email: "john@example.com", password: "password123" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Login successful.");
      expect(response.headers["set-cookie"][0]).toContain("token=token123");
    });
  });
});
