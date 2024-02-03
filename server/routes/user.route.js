const { Router } = require("express");
const { getAllUser, getSingleUser, updateUser, deleteUser } = require("../controllers/user");
const { verifyUser } = require("../middlewares/verifyToken");

const UserRouter = Router();

UserRouter.get("/getall", getAllUser);
UserRouter.get("/singleuser/:id", verifyUser, getSingleUser);
UserRouter.put("/update/:id", verifyUser, updateUser);
UserRouter.delete("/delete/:id", verifyUser, deleteUser);

module.exports = { UserRouter }