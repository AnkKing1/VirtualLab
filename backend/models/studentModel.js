import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    // confirmPassword: {
    //   type: String,
    //   // required: [true, 'Confirm Password is required'],
    //   minlength: 6,
    // },
    registrationNumber: {
      type: String,
      required: [true, 'Registration Number is required'],
      trim: true,
      minlength: 6,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    semester: {
      type:String,
      required: [true, 'Semester is required'],
      enum: [
        "1st", "2nd", "3rd", "4th",
        "5th", "6th", "7th", "8th"
      ],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
