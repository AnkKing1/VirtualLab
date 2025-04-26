import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/signup', registerUser);

userRouter.post('/login', loginUser);
userRouter.get('/get-users', getAllUsers);

export default userRouter;
