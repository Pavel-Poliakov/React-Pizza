export type PizzaBlockProps = {
	id: string;
	price: number;
	title: string;
	imageUrl: string;
	sizes: number[];
	types: number[];
};

export type CartItemProps = {
	id: string;
	price: number;
	title: string;
	imageUrl: string;
	sizePizza: number;
	typePizza: string;
	count: number;
	delete: boolean;
};

export type CategoriesProps = {
	value: number;
	onClickCategory: (i: number) => void;
};
export type SortProps = {
	value: number;
};

export interface ICartSliceState {
	totalPrice: number;
	countItems: number;
	items: CartItemProps[];
}

export interface IFilterSliceState {
	searchValue: string;
	sortType: number;
	categoryId: number;
	currentPage: number;
}

export type FetchPizzasArgs = {
	categoryId: number;
	currentPage: number;
	sort: string;
};

export interface IPizzaSliceState {
	items: PizzaBlockProps[];
	status: Status;
}

export enum Status {
	LOADING = 'loading',
	SUCCES = 'success',
	ERROR = 'error',
}
