// models/Lab.js

import mongoose from "mongoose";
const labSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    facultyName: {
      type: String,
    },
    department: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
      enum: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
    },
    schedule:{
      type:date-time,
      required:true,
    },
    duration: {
      type: String, // or use Date if it's a date-time
      required: true,
    },
    description: {
      type: String,
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // Assuming you have a User model
    //   required: true,
    // },
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Lab = mongoose.model("lab", labSchema);

export default Lab;
