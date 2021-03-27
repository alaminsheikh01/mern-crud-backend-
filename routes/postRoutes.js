const express = require("express");
const router = express.Router();

const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controllers/postConroller");
const { requireSignin } = require("../controllers/authController");

router.post("/post", requireSignin, create);
router.get("/posts", list);
router.get("/post/:slug", read);
router.put("/post/:slug", requireSignin, update);
router.delete("/post/:slug", requireSignin, remove);

router.get("/secret", requireSignin, (req, res) => {
  res.json({
    data: req.user.name,
  });
});

module.exports = router;
