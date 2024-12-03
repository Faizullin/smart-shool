import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IChangePasswordProps, IStudentData, IUserData } from "@/core/models/IAuthUser";
import { AxiosError } from "axios";
import UserService from "@/core/services/UserService";
import { ILoadingState } from "@/core/models/ILoadingState";

interface IInitialState {
  userData: IUserData;
  studentData: IStudentData;
  loading: ILoadingState;
  errors: any;
  success: boolean;
}

const initialState: IInitialState = {
  userData: null,
  studentData: null,
  loading: {
    post: false,
    detail: false,
  },
  errors: {},
  success: false,
};

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.fetchUserData();
      return {
        ...response.data,
      };
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  }
);

export const fetchStudentData = createAsyncThunk(
  "auth/fetchStudentData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.fetchStudentData();
      return {
        ...response.data,
      };
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
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
      };
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
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
      };
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchChangePassword.fulfilled, (state, _) => {
      state.loading.post = false;
      state.errors = initialState.errors;
      state.success = true;
    });
    builder.addCase(fetchChangePassword.pending, (state, _) => {
      state.loading.post = true;
      state.success = false;
    });
    builder.addCase(fetchChangePassword.rejected, (state, { payload }) => {
      state.loading.post = false;
      state.success = false;
      state.errors = payload;
    });
    builder.addCase(fetchUpdateProfile.fulfilled, (state, { payload }) => {
      state.loading.post = false;
      state.userData = payload;
      state.errors = initialState.errors;
      state.success = true;
    });
    builder.addCase(fetchUpdateProfile.pending, (state, _) => {
      state.loading.post = true;
      state.success = false;
    });
    builder.addCase(fetchUpdateProfile.rejected, (state, { payload }) => {
      state.loading.post = false;
      state.success = false;
      state.errors = payload;
    });
    builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
      state.loading.detail = false;
      state.userData = payload;
      state.success = true;
    });
    builder.addCase(fetchUserData.pending, (state, _) => {
      state.loading.detail = true;
      state.success = false;
    });
    builder.addCase(fetchUserData.rejected, (state, _) => {
      state.loading.detail = false;
      state.userData = null;
      state.success = false;
    });
    builder.addCase(fetchStudentData.fulfilled, (state, { payload }) => {
      state.loading.detail = false;
      state.studentData = payload;
      state.success = true;
    });
    builder.addCase(fetchStudentData.pending, (state, _) => {
      state.loading.detail = true;
      state.success = false;
    });
    builder.addCase(fetchStudentData.rejected, (state, _) => {
      state.loading.detail = false;
      state.studentData = null;
      state.success = false;
    });
  },
});

export default userSlice.reducer;
