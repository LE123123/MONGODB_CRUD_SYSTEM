const express = require("express");
const User = require("../schemas/user");
const Comment = require("../schemas/comments");

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.find({});
      console.log(typeof users);
      console.log(users);
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get("/:id/comments", async (req, res, next) => {
  try {
    /*
        Comment 스키마 commenter필드의 ref가 User로 되어있으므로 관련있는
        컬렉션의 다큐먼트를 불러올 수 있습니다.
        commenter 필드가 사용자 다큐먼트로 치환됩니다.
    */
    const comments = await Comment.find({ commenter: req.params.id }).populate(
      "commenter"
    );
    console.log(typeof comments);
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
