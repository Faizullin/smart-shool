import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ILoadingState } from "@/core/models/ILoadingState";
import { IProjectWork } from "@/core/models/IProjectWork";
import ProjectWorkService from "@/core/services/ProjectWorkService";
import ProjectWorkFileService from "@/core/services/ProjectWorkFileService";

interface IInitialState {
  projectData: IProjectWork;
  project_loading: ILoadingState;
  file_loading: ILoadingState;
  errors: any;
  success: boolean;
}

const initialState: IInitialState = {
  projectData: null,
  errors: {},
  success: false,
  project_loading: {
    detail: false,
    post: false,
  },
  file_loading: {
    detail: false,
    post: false,
    list: false,
  },
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

export const fetchProjectWorkDetail = createAsyncThunk(
  "project/fetchProjectWorkDetail",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await ProjectWorkService.fetchProjectWorkDetail(id);
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

export const fetchProjectFileUpload = createAsyncThunk(
  "project/fetchProjectFileUpload",
  async ({ id, values }: IFetchFileData, { rejectWithValue }) => {
    try {
      const response = await ProjectWorkFileService.fetchUploadProjectWorkFile(
        id,
        values
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

export const fetchProjectFileDelete = createAsyncThunk(
  "project/fetchProjectFileDelete",
  async (
    { project_id, file_id }: IFetchProjectFileData,
    { rejectWithValue }
  ) => {
    try {
      const response = await ProjectWorkFileService.fetchProjectWorkFileDelete(
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

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setFileLoading: (state, { payload }) => {
      state.file_loading = payload;
    },
    setProjectData: (state, { payload }) => {
      state.projectData = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProjectWorkDetail.fulfilled, (state, { payload }) => {
      state.project_loading.detail = false;
      state.errors = initialState.errors;
      state.success = true;
      state.projectData = payload;
    });
    builder.addCase(fetchProjectWorkDetail.pending, (state, _) => {
      state.project_loading.detail = true;
      state.success = false;
    });
    builder.addCase(fetchProjectWorkDetail.rejected, (state, { payload }) => {
      state.project_loading.detail = false;
      state.success = false;
      state.errors = payload;
    });
    builder.addCase(fetchProjectFileUpload.fulfilled, (state, { payload }) => {
      state.file_loading.post = false;
      state.errors = initialState.errors;
      state.success = true;
    });
    builder.addCase(fetchProjectFileUpload.pending, (state, _) => {
      state.file_loading.post = true;
      state.success = false;
    });
    builder.addCase(fetchProjectFileUpload.rejected, (state, { payload }) => {
      state.file_loading.post = false;
      state.success = false;
      state.errors = payload;
    });
    builder.addCase(fetchProjectFileDelete.fulfilled, (state, _) => {
      state.file_loading.post = false;
      state.success = true;
    });
    builder.addCase(fetchProjectFileDelete.pending, (state, _) => {
      state.file_loading.post = true;
      state.success = false;
    });
    builder.addCase(fetchProjectFileDelete.rejected, (state, { payload }) => {
      state.file_loading.post = false;
      state.success = false;
      state.errors = payload;
    });
  },
});

export default projectSlice.reducer;
export const { setFileLoading, setProjectData } = projectSlice.actions;
