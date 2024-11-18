import mongoose from "mongoose";
const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true, maxlength: 255 },
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true, maxlength: 255 },
  description: { type: String, maxlength: 255 },
  belongsToId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  Images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
});

const User = mongoose.model("User", UserSchema);
const Image = mongoose.model("Image", ImageSchema);

module.exports = { User, Image };
