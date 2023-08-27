import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'
import ArticleService from '../../../services/ArticleService'
import { AxiosError } from 'axios'
import { IArticleFilters, IArticleFiltersSortProps } from '../../../models/IArticleFIlters'

interface IInitialState {
  success: boolean
  loading: boolean
  appliedFilters: IArticleFilters
  filters: IArticleFilters
  pagination: {
    page: number,
    pageSize: number,
    totalPages: number | null,
    totalItems: number | null,
  }
  errors?: any,
}

const initialState: IInitialState = {
  success: false,
  loading: false,
  appliedFilters: {
    search: '',
  },
  filters: {
    search: '',
  },
  pagination: {
    page: 0,
    pageSize: 10,
    totalPages: null,
    totalItems: null,
  }
}

export const getSortField = (data?: IArticleFiltersSortProps) => {
  if (!data) return ''
  if (data.field && data.type) {
    return data.type === 'desc' ? '-' + data.field : data.field
  }
  return ''
}


export const fetchArticleFilters = createAsyncThunk(
  'articleFilter/fetchArticleFilters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ArticleService.getFilters();
      return response.data
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error)
    }
  }
);

const articleFilterSlice = createSlice({
  name: "articleFilter",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pagination.pageSize = action.payload;
    },
    setTotalPages: (state, action) => {
      state.pagination.totalPages = action.payload;
    },
    setTotalItems: (state, action) => {
      state.pagination.totalItems = action.payload;
    },
    setSorting: (state, action) => {
      state.appliedFilters.sort = action.payload;
    },
    setFilters: (state, action) => {
      state.appliedFilters = {
        ...state.appliedFilters,
        ...action.payload,
      }
    },
    clearFilters: (state, _) => {
      state.appliedFilters = {
        ...state.appliedFilters,
        ...initialState.appliedFilters
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchArticleFilters.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true
      state.filters = { ...state.filters, ...payload }
      state.errors = initialState.errors
    })
    builder.addCase(fetchArticleFilters.pending, (state, _) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(fetchArticleFilters.rejected, (state, { payload }) => {
      state.loading = false
      state.errors = payload
      state.success = false
    })
  }
});

export default articleFilterSlice.reducer;

export const { setPage, setPageSize, setTotalPages, setTotalItems, setSorting, setFilters, clearFilters } = articleFilterSlice.actions;