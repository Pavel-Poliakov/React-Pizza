import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzasArgs, IPizzaSliceState, PizzaBlockProps, Status } from '../../@types/types';

export const fetchPizzas = createAsyncThunk<PizzaBlockProps[], FetchPizzasArgs>(
	'pizza/fetchPizzasStatus',
	async (params: FetchPizzasArgs) => {
		const { categoryId, currentPage, sort } = params;
		const { data } = await axios.get<PizzaBlockProps[]>(
			`https://6783ac4d8b6c7a1316f52f2d.mockapi.io/items?page=${currentPage}&limit=4&${
				categoryId !== 0 ? `category=${categoryId}` : ''
			}&sortBy=${sort}`,
		);
		return data as PizzaBlockProps[];
	},
);

const initialState: IPizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, state => {
			state.status = Status.LOADING;
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaBlockProps[]>) => {
			state.status = Status.SUCCES;
			state.items = action.payload;
		});
		builder.addCase(fetchPizzas.rejected, state => {
			state.status = Status.ERROR;
		});
	},
});

export default pizzaSlice.reducer;
