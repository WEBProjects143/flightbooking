const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.session.jwt;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, "jwt_secret");
    console.log(decoded)
    // Attach user id to request
    req.userId = decoded.id;

    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
