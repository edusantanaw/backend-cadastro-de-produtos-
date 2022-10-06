const jwt = require("jsonwebtoken");
const getToken = require("../helpers/getToken");

const checkToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "Acesso negado!";

    const token = getToken(req);
    if (!token) throw "Acesso negado!";

    const verified = jwt.verify(token, "edusantanaw");
    req.user = verified;
    next();

  }catch (err) {

    return res.status(401).send(err);
 
}
};

module.exports = checkToken;
