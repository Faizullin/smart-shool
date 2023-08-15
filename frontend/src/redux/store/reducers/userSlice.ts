import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IChangePasswordProps, IUserData } from '../../../models/IAuthUser';
import { AxiosError } from 'axios';
import UserService from '../../../services/UserService';


interface IInitialState {
  userData: IUserData,
  loading: boolean,
  error: string | null ,
  errors: any,
  success: boolean,
}

const initialState: IInitialState = {
  userData: {
    id: '',
    username: '',
    email: '',
    isStudent: false,
    created_at: '',
    updated_at: '',
  },
  loading: false,
  error: null ,
  errors: {},
  success: false,
}

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.fetchUserData();
      return {
        ...response.data
      };
    } catch (error: AxiosError | any) {
      if(error instanceof AxiosError && error.response ){
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error)
    }
  }
);

export const fetchChangePassword = createAsyncThunk(
  "auth/fetchChangePassword",
  async (values: IChangePasswordProps, { rejectWithValue }) => {
    try {
      const response = await UserService.changePassword(values);
      return {
        ...response.data,
      }
    } catch (error) {
      if(error instanceof AxiosError && error.response ){
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error)
    }
  }
);

export const fetchUpdateProfile = createAsyncThunk(
  "auth/fetchUpdateProfile",
  async (values: any, { rejectWithValue }) => {
    try {
      const response = await UserService.changeProfile(values);
      return {
        ...response.data,
      }
    } catch (error) {
      if(error instanceof AxiosError && error.response){
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error)
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = initialState.userData;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchChangePassword.fulfilled, (state, _) => {
      state.loading = false
      state.errors = initialState.errors
      state.success = true
    })
    builder.addCase(fetchChangePassword.pending, (state,_) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(fetchChangePassword.rejected, (state, {payload,}) => {
      state.loading = false
      state.success = false
      state.errors = payload
    })
    builder.addCase(fetchUpdateProfile.fulfilled, (state, {payload}) => {
      state.loading = false
      state.userData = payload
      state.errors = initialState.errors
      state.success = true
    })
    builder.addCase(fetchUpdateProfile.pending, (state, _) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(fetchUpdateProfile.rejected, (state, {payload}) => {
      state.loading = false
      state.success = false
      state.errors = payload
    })
    builder.addCase(fetchUserData.fulfilled, (state, {payload}) => {
      state.loading = false
      state.userData = payload
      state.success = true
    })
    builder.addCase(fetchUserData.pending, (state, _) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(fetchUserData.rejected, (state, _) => {
      state.loading = false
      state.success = false
    })
  }
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;