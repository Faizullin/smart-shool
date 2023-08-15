import { createSlice, } from '@reduxjs/toolkit'

export type ISortProps = {
   type?: 'asc' | 'desc'
   field?: string
}

interface IInitialState {
    success: false,
    appliedFilters: {
        search: string
        sort?: ISortProps
    },
    filters: {
        search: string
        sort?: ISortProps
    },
    pagination: {
      page: number,
      pageSize: number,
      totalPages: number | null,
      totalItems: number | null,
    }
}

const initialState: IInitialState = {
    success: false,
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

export const getSortField = (data?: ISortProps) => {
  if(!data) return ''
  if(data.field && data.type) {
    return data.type === 'desc' ? '-' + data.field : data.field
  }
  return ''
}

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
      state.filters.sort = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      } 
    },
    clearFilters: (state, _) => {
      state.filters = {
        ...state.filters,
        ...initialState.filters
      } 
    },
  },
});

export default articleFilterSlice.reducer;

export const { setPage, setPageSize, setTotalPages, setTotalItems, setSorting, setFilters, clearFilters } = articleFilterSlice.actions;