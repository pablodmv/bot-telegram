const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let messageSchema = new Schema(
  {
    id: {
      type: Number,
    },
    user: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
