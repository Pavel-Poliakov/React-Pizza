import { CartItemProps } from '../@types/types';

export const calcCountItems = (items: CartItemProps[]) => {
	return items.reduce((sum, item) => sum + item.count, 0);
};
