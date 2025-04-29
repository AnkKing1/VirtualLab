// models/Lab.js

import mongoose from "mongoose";
const labSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    semester: {
      type: String,
      required: true,
      enum: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
    },
    schedule:{
      type:Date,
      required:true,
    },
    duration: {
      type: String, // in minutes
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty", 
      required: true,
    },
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Lab = mongoose.model("lab", labSchema);

export default Lab;
