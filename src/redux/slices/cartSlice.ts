import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcCountItems } from '../../utils/calcCountItems';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { CartItemProps, ICartSliceState } from '../../@types/types';

const { items, totalPrice, countItems } = getCartFromLS();

const initialState: ICartSliceState = {
	totalPrice,
	countItems,
	items,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemCart(state, action: PayloadAction<CartItemProps>) {
			const obj = state.items.find(obj => (obj.id === action.payload.id ? obj : false));

			if (obj) {
				obj.count += 1;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}

			state.totalPrice = calcTotalPrice(state.items);
			state.countItems = calcCountItems(state.items);
		},

		removeItemCart(state, action: PayloadAction<CartItemProps>) {
			const obj = state.items.find(obj => (obj.id === action.payload.id ? obj : false));

			if (obj && obj.count > 0) {
				obj.count -= 1;
				if (obj.count === 0 || action.payload.delete) {
					const indexItem = state.items.indexOf(obj);
					state.items.splice(indexItem, 1);
				}
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return sum + obj.price * obj.count;
			}, 0);
			state.countItems = state.items.reduce((sum, item) => sum + item.count, 0);
		},
		clearItemCart(state) {
			state.items = [];
			state.countItems = 0;
			state.totalPrice = 0;
		},
	},
});

export const selectorCart = (state: RootState) => state.cart;
export const { addItemCart, removeItemCart, clearItemCart } = cartSlice.actions;

export default cartSlice.reducer;
