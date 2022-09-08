import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    fname: {
      type: String,
      min: 3,
      max: 20,
    },
    lname: {
      type: String,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      minLength: 10,
      maxLength: 10,
    },
    location: {
      type: String,
      required: true,
    },
    emailverified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/luxuryhub-3b0f6.appspot.com/o/Site%20Images%2Fprofile.png?alt=media&token=6f94d26d-315c-478b-9892-67fda99d2cd6",
    },
    isAdmin: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = Mongoose.model("User", UserSchema);
export default User;
