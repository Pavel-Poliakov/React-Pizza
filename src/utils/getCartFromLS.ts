import { calcCountItems } from './calcCountItems';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
	const data = localStorage.getItem('cart');
	const items = data ? JSON.parse(data) : [];
	const totalPrice = calcTotalPrice(items);
	const countItems = calcCountItems(items);
	return {
		items,
		totalPrice,
		countItems,
	};
};

