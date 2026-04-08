const request = require("supertest");
const express = require("express");
const { authRouter } = require("../routes/authRoute");

const app = express();
app.use("/auth", authRouter);

describe("POST /auth/logout", () => {
  it("returns 200 and clears token cookie", async () => {
    const res = await request(app).post("/auth/logout").expect(200);

    expect(res.body.message).toBe("Logged out.");
    expect(res.headers["set-cookie"]).toBeDefined();
    const joined = res.headers["set-cookie"].join(";");
    expect(joined).toMatch(/token=/);
  });
});
