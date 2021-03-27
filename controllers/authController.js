const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");

exports.login = (req, res) => {
  const { name, password } = req.body;
  if (password === process.env.PASSWORD) {
    // generate token and send to client/react
    const token = jwt.sign({ name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, name, password });
  } else {
    return res.status(400).json({
      error: "Incorrect password",
    });
  }
};

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["RS256"],
});
