const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and Password Required" });
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser)
    res.status(401).json({ message: "Wrong Username or password" });
  const decryptedPwd = await bcrypt.compare(password, foundUser.password);
  if (!decryptedPwd)
    res.status(401).json({ message: "Wrong Username or password" });
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        roles: foundUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "3d" }
  );

  foundUser.refreshToken = refreshToken;
  await foundUser.save();
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", //SAME SITE NONE REQUIRES SECURE TRUE
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
});

const handleLogout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content if no cookie

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  return res.status(200).json({ message: "Logout successful" }); // ✅ Ensure success response
});


module.exports = { handleLogin, handleLogout };
