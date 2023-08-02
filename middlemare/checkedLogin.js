const jwt = require("jsonwebtoken");

const checkedLogin = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECTET);
    const { name, email, id } = decoded;
    req.name = name;
    req.email = email;
    req.userId = id;
    next();
  } catch (err) {
    next("Authentication Failure!");
  }
};

module.exports = checkedLogin;