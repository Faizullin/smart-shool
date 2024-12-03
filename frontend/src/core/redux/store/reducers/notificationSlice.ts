import { ILoadingState } from "@/core/models/ILoadingState";
import { INotification } from "@/core/models/INotification";
import NotificationService from "@/core/services/NotificationService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface IInitialState {
  notifications_list: INotification[];
  loaded: boolean;
  pagination_data: {
    totalItems: number;
  };
  loading: ILoadingState;
  success: boolean;
}

const initialState: IInitialState = {
  loaded: false,
  notifications_list: [],
  pagination_data: {
    totalItems: 0,
  },
  loading: {
    list: false,
  },
  success: false,
};

export const fetchNotificationList = createAsyncThunk(
  "auth/fetchNotificationList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await NotificationService.fetchNotificationsList();
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
export const fetchNotificationMarkAsRead = createAsyncThunk(
  "auth/fetchNotificationMarkAsRead",
  async (item_id: number, { rejectWithValue }) => {
    try {
      const response = await NotificationService.fetchNotificationMarkAsRead(item_id);
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

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNotificationList.fulfilled, (state, { payload }) => {
      state.loading.list = false;
      state.notifications_list = payload.results;
      state.pagination_data.totalItems = payload.count;
      state.success = true;
      state.loaded = true;
    });
    builder.addCase(fetchNotificationList.pending, (state, _) => {
      state.loading.list = true;
      state.success = false;
      state.loaded = false;
    });
    builder.addCase(fetchNotificationList.rejected, (state, _) => {
      state.loading.list = false;
      state.success = false;
      state.loaded = false;
    });
    builder.addCase(fetchNotificationMarkAsRead.fulfilled, (state, { payload }) => {
      state.loading.post = false;
      state.success = true;
    });
    builder.addCase(fetchNotificationMarkAsRead.pending, (state, _) => {
      state.loading.post = true;
      state.success = false;
    });
    builder.addCase(fetchNotificationMarkAsRead.rejected, (state, _) => {
      state.loading.post = false;
      state.success = false;
    });
  },
});

export default notificationSlice.reducer;
