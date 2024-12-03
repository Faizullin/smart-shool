import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ArticleService from "@/core/services/ArticleService";
import { IArticle } from "@/core/models/IArticle";
import { ILoadingState } from "@/core/models/ILoadingState";

interface IInitialState {
  articles: IArticle[];
  pagination_data: {
    totalItems: number;
  };
  article_payload: IArticle | null;
  loading: ILoadingState;
  errors: any;
  success: boolean;
}

const initialState: IInitialState = {
  articles: [],
  pagination_data: {
    totalItems: 0,
  },
  article_payload: null,
  loading: {
    list: false,
    detail: false,
  },
  errors: {},
  success: false,
};

export const fetchArticleList = createAsyncThunk(
  "article/fetchArticleList",
  async (params: unknown, { rejectWithValue }) => {
    try {
      const response = await ArticleService.getAll(params);
      return response.data;
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  }
);

export const fetchArticleDetail = createAsyncThunk(
  "article/fetchArticleDetail",
  async (item_id: number, { rejectWithValue }) => {
    try {
      const response = await ArticleService.getById(item_id);
      return {
        ...response.data,
      };
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticle(state, action) {
      state.article_payload = { ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchArticleList.fulfilled, (state, { payload }) => {
      state.loading.list = false;
      state.articles = payload.results;
      state.pagination_data.totalItems = payload.count;
      state.errors = initialState.errors;
      state.success = true;
    });
    builder.addCase(fetchArticleList.pending, (state, _) => {
      state.loading.list = true;
      state.success = false;
    });
    builder.addCase(fetchArticleList.rejected, (state, { payload }) => {
      state.loading.list = false;
      state.articles = [];
      state.errors = payload;
      state.success = false;
    });
    builder.addCase(fetchArticleDetail.fulfilled, (state, { payload }) => {
      state.loading.detail = false;
      state.success = true;
      state.article_payload = payload;
      state.errors = initialState.errors;
    });
    builder.addCase(fetchArticleDetail.pending, (state, _) => {
      state.loading.detail = true;
      state.success = false;
    });
    builder.addCase(fetchArticleDetail.rejected, (state, { payload }) => {
      state.loading.detail = false;
      state.errors = payload;
      state.success = false;
    });
  },
});

export default articleSlice.reducer;

export const { setArticle } = articleSlice.actions;
