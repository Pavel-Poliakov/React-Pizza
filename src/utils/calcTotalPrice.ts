import { CartItemProps } from '../@types/types';

export const calcTotalPrice = (items: CartItemProps[]) => {
	return items.reduce((sum: number, obj: CartItemProps) => {
		return sum + obj.price * obj.count;
	}, 0);
};
