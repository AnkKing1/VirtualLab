import mongoose from 'mongoose';

const CodeEditorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',   // reference to the user who wrote the code
    required: true,
  },
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lab',   // reference to the lab title
    required: true,
  },
  description:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lab', // refrence to lab description
    required:true,
  },
  duration:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lab', // refrence to lab duration
    required:true,
  },
  language: {
    type: String,
    required: true,
    enum: ['cpp', 'java', 'python', 'javascript', 'c', 'go', 'ruby', 'php'], // extend as needed
    default: 'javascript',
  },
  theme: {
    type: String,
    default: 'light', // or 'dark' based on your editor
  },
  code: {
    type: String,
    required: true,
    default: '',
  },
  input: {
    type: String,
    default: '',
  },
  output: {
    type: String,
    default: '',
  },
},{timestamps: true});

const CodeEditor = mongoose.model('CodeEditor', CodeEditorSchema);

export default CodeEditor;
