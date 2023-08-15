import { IStudent } from './../../../models/IStudent';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StudentService from '../../../services/StudentService';
import { AxiosError } from 'axios';
import { RootState } from '../store';

interface IInitialState {
  student_payload: IStudent | null,
  loading: boolean,
  error: string | null,
  errors: any,
  success: boolean,
}

const initStudent = localStorage.getItem('student') ?? ''
const defStudentData = initStudent ? JSON.parse(initStudent) : null
const initialState: IInitialState = {
  student_payload: defStudentData && defStudentData.expiresAt > Date.now() ? defStudentData : null,
  loading: false,
  error: null,
  errors: [],
  success: false,
};

export const fetchStudentData = createAsyncThunk(
  'student/fetchStudentData',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await StudentService.fetchStudentMe();
      const EXPIRE_TIME = 60 // in seconds
      const expiresAt = Date.now() + EXPIRE_TIME * 1000;
      
      dispatch(setStudent({
        ...response.data,
        expiresAt,
      }))
      return {
        ...response.data,
      }
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const fetchUpdateProfile = createAsyncThunk(
  "student/fetchUpdateProfile",
  async (values: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { student } = getState() as RootState
      let response = null;
      if (student.student_payload) {
        response = await StudentService.changeProfile(values);
      } else {
        response = await StudentService.createProfile(values);
      }
      dispatch(setStudent(response.data))
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

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudent(state, action) {
      const i_data = { ...action.payload }
      const data = JSON.stringify(i_data)
      state.student_payload = i_data
      localStorage.setItem('student', data)
    },
    clearStudent(state) {
      state.student_payload = initialState.student_payload
      localStorage.removeItem('student')
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudentData.fulfilled, (state, { payload }) => {
      state.loading = false
      state.student_payload = payload as IStudent
      state.errors = initialState.errors
      state.success = true
    })
    builder.addCase(fetchStudentData.pending, (state, _) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(fetchStudentData.rejected, (state, { payload }) => {
      state.loading = false
      state.student_payload = null
      localStorage.removeItem("student")
      state.errors = payload
      state.success = false
    })
    builder.addCase(fetchUpdateProfile.fulfilled, (state, { payload }) => {
      state.loading = false
      state.student_payload = payload as IStudent // !!!
      state.errors = initialState.errors
      state.success = true
    })
    builder.addCase(fetchUpdateProfile.pending, (state, _) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(fetchUpdateProfile.rejected, (state, { payload }) => {
      state.loading = false
      state.student_payload = null
      state.errors = payload
      state.success = false
    })
  },
});

export default studentSlice.reducer;

export const { setStudent, clearStudent } = studentSlice.actions;