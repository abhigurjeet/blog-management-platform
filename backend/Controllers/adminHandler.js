const Admin = require("../Models/admin");
const jwt = require("jsonwebtoken");
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const adminFound = await Admin.findOne({ email });
    if (!adminFound) {
      return res.status(404).json({ message: "No user found with this email" });
    }
    if (password !== adminFound.password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      { email: adminFound.email, id: adminFound._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.createNewAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(409)
        .json({ message: "Admin with this email already exists" });
    }
    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    const token = jwt.sign(
      { email: newAdmin.email, id: newAdmin._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    res.status(201).json({
      message: "Admin created successfully",
      token,
    });
  } catch (error) {
    console.error("Error creating new admin:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
