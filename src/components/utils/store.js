import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice'
import chatSliceReducer from './chatSlice'

export default configureStore({
  reducer: {
    user: userSliceReducer,
    chat: chatSliceReducer
    }
});

