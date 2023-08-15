import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'
import { IAuthUser, IForgotPasswordConfirmProps, IForgotPasswordProps, ILoginProps, IRegisterProps } from '../../../models/IAuthUser'
import AuthService from '../../../services/AuthService';
import { AxiosError } from 'axios';
import UserService from '../../../services/UserService';

interface IInitialState {
  token: string | null,
  user: IAuthUser,
  loading: boolean,
  errors: any,
  success: boolean,
}

const initToken = localStorage.getItem('token') ?? ''
const initialState: IInitialState = {
  token: initToken,
  user: {
    id: '',
    username: '',
    email: '',
    isStudent: false,
    isAuthenticated: Boolean(initToken),
  },
  loading: false,
  errors: {},
  success: false,
}

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.fetchUser();
      return {
        ...response.data
      };
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error)
    }
  }
);

export const registerUser = createAsyncThunk("auth/registerUser",
  async (values: IRegisterProps, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(values)
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      return {
        ...response.data,
      };
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error)
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values: ILoginProps, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(values);
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      return {
        ...response.data,
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error)
    }
  }
);

export const forgotUserPassword = createAsyncThunk(
  "auth/forgotUserPassword",
  async (values: IForgotPasswordProps, { rejectWithValue }) => {
    try {
      const response = await AuthService.forgotUserPassword(values);
      return {
        ...response.data,
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error)
    }
  }
);

export const forgotUserPasswordConfirm = createAsyncThunk(
  "auth/forgotUserPasswordConfirm",
  async (values: IForgotPasswordConfirmProps, { rejectWithValue }) => {
    try {
      const response = await AuthService.forgotUserPasswordConfirm(values);
      return {
        ...response.data,
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error)
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("student");
      localStorage.removeItem("user");
      state.user.isAuthenticated = false
      state.loading = false
      state.errors = initialState.errors
    },
    setCredentials: (state, { payload }) => {
      state.user = payload
    },
    setTokens: (_, { payload }) => {
      localStorage.setItem("token", payload.access);
      localStorage.setItem("refreshToken", payload.refresh);
    }
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = {
        ...action.payload.user,
        isAuthenticated: true,
      } as IAuthUser
      state.success = true
    })
    builder.addCase(loginUser.pending, (state, _) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.user = {
        isAuthenticated: false,
      } as IAuthUser
      state.errors = action.payload
      state.success = false
    })

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = {
        ...action.payload.user,
        isAuthenticated: true,
      } as IAuthUser
      state.success = true
    })
    builder.addCase(registerUser.pending, (state, _) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false
      state.user = {
        isAuthenticated: false,
      } as IAuthUser
      state.errors = action.payload
      state.success = false
    })
    builder.addCase(fetchUserData.pending, (state, _) => {
      state.loading = true;
      state.success = false
    })
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true
      state.user = {
        ...action.payload,
        isAuthenticated: true,
      }
    })
    builder.addCase(forgotUserPassword.pending, (state, _) => {
      state.loading = true;
      state.success = false
    })
    builder.addCase(forgotUserPassword.fulfilled, (state, _) => {
      state.loading = false;
      state.success = true
      state.errors = initialState.errors
    })
    builder.addCase(forgotUserPassword.rejected, (state, action) => {
      state.loading = false;
      state.success = false
      state.errors = action.payload
    })
    builder.addCase(forgotUserPasswordConfirm.pending, (state, _) => {
      state.loading = true;
      state.success = false
    })
    builder.addCase(forgotUserPasswordConfirm.fulfilled, (state, _) => {
      state.loading = false;
      state.success = true
      state.errors = initialState.errors
    })
    builder.addCase(forgotUserPasswordConfirm.rejected, (state, action) => {
      state.loading = false;
      state.success = false
      state.errors = action.payload
    })
  },
});

export default authSlice.reducer;
export const { logout, setCredentials, setTokens } = authSlice.actions