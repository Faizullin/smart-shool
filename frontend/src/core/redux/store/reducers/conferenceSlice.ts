import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ILoadingState } from "@/core/models/ILoadingState";
import { IConference } from "@/core/models/IConference";
import ConferenceService from "@/core/services/ConferenceService";

interface IInitialState {
  conferences: IConference[];
  conference_payload: IConference | null;
  loading: ILoadingState;
  errors: any;
  success: boolean;
}

const initialState: IInitialState = {
  conferences: [],
  conference_payload: null,
  loading: {
    list: false,
    detail: false,
  },
  errors: {},
  success: false,
};

export const fetchConferenceList = createAsyncThunk(
  "conference/fetchConferenceList",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await ConferenceService.getAll(params);
      return response.data;
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  }
);

export const fetchConferenceDetail = createAsyncThunk(
  "conference/fetchConferenceDetail",
  async (item_id: number, { rejectWithValue }) => {
    try {
      const response = await ConferenceService.getById(item_id);
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

const conferenceSlice = createSlice({
  name: "conference",
  initialState,
  reducers: {
    setConference(state, action) {
      state.conference_payload = { ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchConferenceList.fulfilled, (state, { payload }) => {
      state.loading.list = false;
      state.conferences = payload;
      state.errors = initialState.errors;
      state.success = true;
    });
    builder.addCase(fetchConferenceList.pending, (state, _) => {
      state.loading.list = true;
      state.success = false;
    });
    builder.addCase(fetchConferenceList.rejected, (state, { payload }) => {
      state.loading.list = false;
      state.conferences = [];
      state.errors = payload;
      state.success = false;
    });
    builder.addCase(fetchConferenceDetail.fulfilled, (state, { payload }) => {
      state.loading.detail = false;
      state.success = true;
      state.conference_payload = payload;
      state.errors = initialState.errors;
    });
    builder.addCase(fetchConferenceDetail.pending, (state, _) => {
      state.loading.detail = true;
      state.success = false;
    });
    builder.addCase(fetchConferenceDetail.rejected, (state, { payload }) => {
      state.loading.detail = false;
      state.errors = payload;
      state.success = false;
    });
  },
});

export default conferenceSlice.reducer;

export const { setConference } = conferenceSlice.actions;
