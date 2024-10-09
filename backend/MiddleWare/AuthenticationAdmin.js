const jwt = require("jsonwebtoken");
const Admin = require("../Model/Admin");
//const Category = require("../Model/category");
const AuthenticationAdmin = async (req, res, next) => {
  //verify
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token reqired" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.admin = await Admin.findOne({ _id });
    //const customer_id = req.user._id;
    //req.cat = await Category.find({ user_id }).select("_id");

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Request not authorized" });
  }
};
module.exports = AuthenticationAdmin;
