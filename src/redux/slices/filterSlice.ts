import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IFilterSliceState } from '../../@types/types';

const initialState: IFilterSliceState = {
	searchValue: '',
	sortType: 0,
	categoryId: 0,
	currentPage: 1,
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSortType(state, action: PayloadAction<number>) {
			state.sortType = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setFilters(state, action) {
			state.sortType = Number(action.payload.sortType);
			state.categoryId = Number(action.payload.categoryId);
			state.currentPage = Number(action.payload.currentPage);
		},
	},
});

export const selectorSortType = (state:RootState) => state.filter.sortType;
export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
	filterSlice.actions;

export default filterSlice.reducer;
