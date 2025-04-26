import Student from '../models/studentModel.js';
import Faculty from '../models/facultyModel.js';

 const approveStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findByIdAndUpdate(
      studentId,
      { isApproved: true },
      { new: true, runValidators: true }
    ).select('-password -confirmPassword');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Student approved successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error approving Student',
      error: error.message,
    });
  }
}

const approveFaculty = async (req, res) => {
    try {
      const facultyId = req.params.id;
  
      const faculty = await Faculty.findByIdAndUpdate(
        facultyId,
        { isApproved: true },
        { new: true, runValidators: true }
      ).select('-password -confirmPassword');
  
      if (!faculty) {
        return res.status(404).json({ message: 'Faculty not found' });
      }
  
      res.status(200).json({
        message: 'Faculty approved successfully',
        faculty,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error approving faculty',
        error: error.message,
      });
    }
  }

export {approveStudent , approveFaculty};
