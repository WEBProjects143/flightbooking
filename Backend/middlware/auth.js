
module.exports = (req, res, next) => {
  try {
    const userId = req.session.user;
    console.log("Authenticated user id:", userId);

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
