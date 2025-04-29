import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    // confirmPassword: {
    //   type: String,
    //   required: [true, "Password is required"],
    //   minlength: 6,
    // },
    department: {
      type: String,
      required: [true, "Department is required"],
      // minlength: 6,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;
