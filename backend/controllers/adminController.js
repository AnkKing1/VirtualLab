import User from '../models/userModel.js';

export const approveUser = async (req, res) => {
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
};
