import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ILoadingState } from "@/core/models/ILoadingState";
import ProjectWorkFileService from "@/core/services/ProjectWorkFileService";
import { IFile } from "@/core/models/IFile";

interface IInitialState {
  code: string;
  loading: ILoadingState;
  errors: any;
  current_file_payload: IFile;
  success: boolean;
}

const initialState: IInitialState = {
  code: null,
  errors: {},
  success: false,
  loading: {
    detail: false,
    post: false,
    list: false,
  },
  current_file_payload: null,
};

interface IFetchFileData {
  id: number;
  values: any;
}
interface IFetchProjectFileData {
  project_id: number;
  file_id: number;
  values?: any;
}

export const fetchProjectScriptUpdate = createAsyncThunk(
  "projectScript/fetchProjectScriptUpdate",
  async (
    { project_id, file_id, values }: IFetchProjectFileData,
    { rejectWithValue }
  ) => {
    try {
      const response = await ProjectWorkFileService.fetchProjectWorkCodeUpdate(
        project_id,
        file_id,
        {
          code: values,
        }
      );
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

export const fetchProjectScriptDetail = createAsyncThunk(
  "projectScript/fetchProjectScriptDetail",
  async (
    { project_id, file_id }: IFetchProjectFileData,
    { rejectWithValue }
  ) => {
    try {
      const response = await ProjectWorkFileService.fetchProjectWorkCode(
        project_id,
        file_id
      );
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

const projectScriptSlice = createSlice({
  name: "projectScript",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setCode: (state, { payload }) => {
      state.code = payload;
    },
    setCurrentFilePayload: (state, { payload }) => {
      state.current_file_payload = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchProjectScriptUpdate.fulfilled,
      (state, { payload }) => {
        state.loading.post = false;
        state.errors = initialState.errors;
        state.success = true;
      }
    );
    builder.addCase(fetchProjectScriptUpdate.pending, (state, _) => {
      state.loading.post = true;
      state.errors = {};
      state.success = false;
    });
    builder.addCase(fetchProjectScriptUpdate.rejected, (state, { payload }) => {
      state.loading.post = false;
      state.errors = payload;
      state.success = false;
    });
    builder.addCase(
      fetchProjectScriptDetail.fulfilled,
      (state, { payload }) => {
        state.loading.detail = false;
        state.success = true;
        state.errors = initialState.errors;
        if (payload.code !== undefined) {
          state.code = payload.code;
        }
      }
    );
    builder.addCase(fetchProjectScriptDetail.pending, (state, _) => {
      state.loading.detail = true;
      state.success = false;
    });
    builder.addCase(fetchProjectScriptDetail.rejected, (state, { payload }) => {
      state.loading.detail = false;
      state.errors = payload;
      state.success = false;
    });
  },
});

export default projectScriptSlice.reducer;
export const { setLoading, setCode, setCurrentFilePayload } =
  projectScriptSlice.actions;
