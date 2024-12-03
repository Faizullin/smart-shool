import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import articleSlice from "./reducers/articleSlice";
import userSlice from "./reducers/userSlice";
import notificationSlice from "./reducers/notificationSlice";
import modalSlice from "./reducers/modalSlice";
import conferenceSlice from "./reducers/conferenceSlice";
import projectSlice from "./reducers/projectSlice";
import projectScriptSlice from "./reducers/projectScriptSlice";
import chatSlice from "./reducers/chatSlice";

export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  article: articleSlice,
  conference: conferenceSlice,
  modal: modalSlice,
  notification: notificationSlice,
  project: projectSlice,
  projectScript: projectScriptSlice,
  chat: chatSlice,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
// export type RootState = ReturnType<typeof rootReducer>;
