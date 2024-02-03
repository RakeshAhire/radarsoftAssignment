const Router = require("express");
const { createBlog, deleteBlog, getAllBlog, getSingleBlog, updateBlog, getAllBlogByUser, searchBlogs } = require("../controllers/blog");
const { verifyUser } = require("../middlewares/verifyToken");

const BlogRouter = Router();

BlogRouter.post("/create",verifyUser, createBlog);
BlogRouter.get("/getall", verifyUser, getAllBlog);
BlogRouter.get("/getall/user", verifyUser, getAllBlogByUser);
BlogRouter.get("/getsingle/:id", getSingleBlog);
BlogRouter.put("/update/:id", verifyUser, updateBlog);
BlogRouter.delete("/delete/:id", deleteBlog);
BlogRouter.get("/search", searchBlogs);

module.exports = { BlogRouter };