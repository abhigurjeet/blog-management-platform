const { Router } = require("express");
const adminHandler = require("../Controllers/adminHandler");
const blogHandler = require("../Controllers/blogHandler");
const verifyToken = require("../Middlewares/verifyJWT");
const router = Router();

//Fetch all blogs
router.get("/", blogHandler.getAllBlogs);

//admin related routes
router.post("/login", adminHandler.loginAdmin);
router.post("/create-admin", adminHandler.createNewAdmin);

//Blog modification related routes
router.delete("/:blogId", verifyToken, blogHandler.deleteBlog);
router.put("/:blogId", verifyToken, blogHandler.updateBlog);
router.post("/", verifyToken, blogHandler.addNewBlog);

module.exports = router;
