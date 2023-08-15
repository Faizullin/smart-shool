import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import ArticleService from '../../../services/ArticleService';
import { IArticle } from '../../../models/IArticle';
import { RootState } from '../store';
import { getSortField, setTotalItems } from './articleFilterSlice';

interface IInitialState {
  articles: IArticle[],
  article_payload: IArticle | null,
  loading: boolean,
  error: string | null,
  errors: any,
  success: boolean,
}

const initialState: IInitialState = {
  articles: [],
  article_payload: null,
  loading: false,
  error: null,
  errors: {},
  success: false,
}

export const fetchArticleList = createAsyncThunk(
  'article/fetchArticleList',
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { articleFilter } = getState() as RootState
    let params = { ...articleFilter.filters } as any
    if (params.sort) {
      delete params['sort']
    }
    params.ordering = getSortField(articleFilter.filters.sort)
    params = {
      ...params,
      page: articleFilter.pagination.page + 1,
      limit: articleFilter.pagination.pageSize,
    }
    try {
      const response = await ArticleService.getAll(params);
      dispatch(setTotalItems(response.data.count))
      return response.data.results
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error)
    }
  }
);

export const fetchArticleDetail = createAsyncThunk(
  'article/fetchArticleDetail',
  async (props: { id: string }, { rejectWithValue }) => {
    try {
      const response = await ArticleService.getById(props.id);
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

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticle(state, action) {
      state.article_payload = { ...action.payload }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchArticleList.fulfilled, (state, { payload }) => {
      state.loading = false
      state.articles = payload
      state.errors = initialState.errors
      state.success = true
    })
    builder.addCase(fetchArticleList.pending, (state, _) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(fetchArticleList.rejected, (state, { payload }) => {
      state.loading = false
      state.articles = []
      state.errors = payload
      state.success = false
    })
    builder.addCase(fetchArticleDetail.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true
      state.article_payload = payload
      state.errors = initialState.errors
    })
    builder.addCase(fetchArticleDetail.pending, (state, _) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(fetchArticleDetail.rejected, (state, { payload }) => {
      state.loading = false
      state.errors = payload
      state.success = false
    })
  },
});

export default articleSlice.reducer;

export const { setArticle } = articleSlice.actions;