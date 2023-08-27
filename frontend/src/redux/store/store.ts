import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import articleSlice from "./reducers/articleSlice";
import userSlice from "./reducers/userSlice";
import studentSlice from "./reducers/studentSlice";
import articleFilterSlice from "./reducers/articleFilterSlice";
import errorModalSlice from "./reducers/errorModalSlice";

export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,
    article: articleSlice,
    articleFilter: articleFilterSlice,
    student: studentSlice,
    errorModal: errorModalSlice
})
  
const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.NODE_ENV !== 'production',
});

export default store;
export type RootState = ReturnType<typeof rootReducer>
