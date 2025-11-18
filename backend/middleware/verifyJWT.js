const jwt = require("jsonwebtoken");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");

const verifyJWT = asyncHandler(async (req, res, next) => {
  const authHeaders = req.headers.authorization || req.headers.Authorization
  if (!authHeaders || !authHeaders.includes("Bearer ")) return res.status(401).json({message: "Incomplete request"});
  const token = authHeaders.split(" ")[1]
  if (!token) return res.status(401).json({message: "Forbidden request"});
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
        if (err) return res.status(403).json({message: "Forbinned"});
        req.username = decoded.UserInfo.username
        req.roles = decoded.UserInfo.roles
        req.user = decoded.UserInfo
        // console.log("Verified user:", decoded)
        next()
    } 
  )
});

module.exports = verifyJWT