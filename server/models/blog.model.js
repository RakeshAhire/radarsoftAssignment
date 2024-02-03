const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:"https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=600"

    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "users", // this is table name which we want to refer here
      required: true,
    },
    category: {
      type: String,
      default: "other",
      enum: ["food", "education", "business", "politics", "sports", "travel","other"],
    },
  },
  { timestamps: true }
);

const BlogModel = model("tasks", taskSchema);

module.exports = { BlogModel };
