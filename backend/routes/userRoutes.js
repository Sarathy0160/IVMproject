const express = require("express");
const router = express.Router();
const User = require("../models/User");


// ==========================
// LOGIN API
// ==========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ success: false, message: "Invalid login" });
    }

    return res.json({
      success: true,
      message: "Login success",
      user: {
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});


// ==========================
// CHANGE PASSWORD API
// ==========================
router.put("/change-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.json({
        success: false,
        message: "Missing fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // check old password
    if (user.password !== oldPassword) {
      return res.json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // update password
    user.password = newPassword;
    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});

module.exports = router;