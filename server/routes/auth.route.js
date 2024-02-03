const { Router } = require("express");
const { register, login } = require("../controllers/auth");

const AuthRouter = Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);

module.exports = { AuthRouter }