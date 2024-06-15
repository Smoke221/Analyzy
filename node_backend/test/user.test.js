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
  });
});
