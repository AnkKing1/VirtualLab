import mongoose from 'mongoose';

const CodeEditorSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  labId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab',
    required: true,
  },
  language: {
    type: String,
    required: true,
    enum: ['cpp', 'java', 'python', 'javascript', 'c', 'go', 'ruby', 'bash'],
    default: 'javascript',
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
}, { timestamps: true });

const CodeEditor = mongoose.model('CodeEditor', CodeEditorSchema);

export default CodeEditor;
