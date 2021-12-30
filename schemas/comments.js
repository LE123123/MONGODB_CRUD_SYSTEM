const mongoose = require("mongoose");

/* 시퀄라이저에서 모델을 정의하는 것과 매우 비슷하다. */
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
