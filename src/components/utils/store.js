import { configureStore } from '@reduxjs/toolkit';
import reactionAdded from './userSlice'

export default configureStore({
  reducer: {
    user: reactionAdded
  }
});

