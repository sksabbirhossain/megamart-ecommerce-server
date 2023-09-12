const jwt = require("jsonwebtoken");

const checkedLogin = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECTET);
    const { name, email, _id } = decoded;
    req.name = name;
    req.email = email;
    req.userId = _id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Authentication Failure!", status: 401 });
  }
};

module.exports = checkedLogin;
