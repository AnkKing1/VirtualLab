import mongoose from 'mongoose';

const CodeEditorSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',   // reference to the user who wrote the code

  },
  labId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab',   // reference to the user who wrote the code
    required: true,
  },
  language: { 
    type: String,
    required: true,
    enum: ['cpp', 'java', 'python', 'javascript', 'c', 'go', 'ruby', 'php'], // extend as needed
    default: 'javascript',
  },
  // theme: {
  //   type: String,
  //   default: 'light', // or 'dark' based on your editor
  //   required:true,
  // },
  code: {
    type: String,
    required: true,
    default: '',
  },
  input: {
    type: String,
    default: '',
    // required:true,
  },
  output: {
    type: String,
    default: '',
  },
},{timestamps: true});

const CodeEditor = mongoose.model('CodeEditor', CodeEditorSchema);

export default CodeEditor;
