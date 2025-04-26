import User from '../models/userModel.js';
import Faculty from '../models/FacultyModel.js';

 const approveUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { isApproved: true },
      { new: true, runValidators: true }
    ).select('-password -confirmPassword');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User approved successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error approving user',
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

export {approveUser , approveFaculty};
