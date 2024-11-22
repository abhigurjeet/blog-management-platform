const Blog = require("../Models/blog");

exports.addNewBlog = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const { id: createdBy } = req.user;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }

    const newBlog = new Blog({ title, description, tags, createdBy });
    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding new blog.", error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id: adminId } = req.user;
    const { blogId } = req.params;
    const updateData = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    if (blog.createdBy.toString() !== adminId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this blog." });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, {
      new: true,
    });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating blog.", error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id: adminId } = req.user;
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    if (blog.createdBy.toString() !== adminId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this blog." });
    }

    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting blog.", error: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blogs.", error: error.message });
  }
};
