const { BlogModel } = require("../models/blog.model");

const createBlog = async (req, res, next) => {
  const { id } = req.user;
  const { title, description, category, image } = req.body;
  try {
    const Blog = new BlogModel({
      title,
      description,
      category,
      userID: id,
      image,
    });
    const savedBlog = await Blog.save();
    res.status(200).json({ savedBlog, message: "Blog Posted Successfully !" });
  } catch (error) {
    next(error);
  }
};

const getAllBlog = async (req, res, next) => {
  const { sort } = req.query;

  try {
    let sortOrder = -1;

    if (sort === "old") {
      sortOrder = 1;
    } else if (sort === "new") {
      sortOrder = -1;
    }
    const Blogs = await BlogModel.find()
      .sort({ createdAt: sortOrder })
      .populate("userID");

    // console.log('Blogs: ', Blogs);
    return res.status(200).json(Blogs);
  } catch (err) {
    next(err);
  }
};

const getSingleBlog = async (req, res, next) => {
  const { id } = req.params;
  // console.log('id: ', id);
  try {
    const Blog = await BlogModel.findById(id).populate("userID");
    res.status(200).json(Blog);
  } catch (err) {
    next(err);
  }
};

const updateBlog = async (req, res, next) => {
  const { id } = req.params;
  const payload=req.body
  // console.log('id: ', id);
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true }
    ).populate("userID");
    res
      .status(200)
      .json({ updatedBlog, message: "Blog has been Updated Successfully !" });
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    await BlogModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Blog has been deleted" });
  } catch (err) {
    next(err);
  }
};

const getAllBlogByUser = async (req, res, next) => {
  const { id } = req.user;
  // console.log('id: ', id);
  try {
    const unreadBlogs = await BlogModel.find({
      userID: id,
    })
      .sort({ createdAt: -1 })
      .populate("userID");
    res.status(200).json(unreadBlogs);
  } catch (err) {
    next(err);
  }
};

const searchBlogs = async (req, res, next) => {
    const { text } = req.query;
  
    try {
      if (text==="") {
        const result = await BlogModel.find().populate('userID')
        return res.status(200).json(result);
      }
  
      const searchRegex = new RegExp(text, 'i'); // Case-insensitive regex for search
  
      const result = await BlogModel.find({
        $or: [
          { title: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
          { category: { $regex: searchRegex } },
          // Add more fields as needed for your search
        ],
      }).populate('userID');
  
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = { searchBlogs };
  

module.exports = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getAllBlogByUser,
  searchBlogs,
};
