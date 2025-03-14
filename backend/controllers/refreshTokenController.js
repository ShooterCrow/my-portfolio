const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // No refresh token found

  const refreshToken = cookies.jwt;

  const matchedUser = await User.findOne({ refreshToken }).exec();

  if (!matchedUser) return res.sendStatus(403); // User not found or invalid token

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || matchedUser.username !== decoded.username) return res.sendStatus(403);

    const roles = Object.values(matchedUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,  // ✅ Use correct secret
      { expiresIn: "3d" }
    );
    
    return res.json({ accessToken });
  });
});

module.exports = { handleRefreshToken };
