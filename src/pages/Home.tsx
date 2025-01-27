import React, { useRef } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import qs from 'qs';
import { useState, useEffect } from 'react';
import Sceleton from '../components/Sceleton';
import Pagination from '../components/Pagination/index';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../redux/store';
import { PizzaBlockProps, Status } from '../@types/types';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const { categoryId, sortType, searchValue } = useSelector((state: RootState) => state.filter);
	const { items, status } = useSelector((state: RootState) => state.pizza);
	const dispatch = useAppDispatch();

	const [currentPage, setCurrentPage] = useState(1);
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const arrSortType = ['rating', 'price', 'title'];

	const getPizzas = async () => {
		dispatch(
			fetchPizzas({
				categoryId,
				currentPage,
				sort: arrSortType[sortType],
			}),
		);
	};

	const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);
	const pizzas = items
		.filter((obj: PizzaBlockProps) => {
			if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
				return true;
			}
			return false;
		})
		.map((obj: PizzaBlockProps, index: number) => <PizzaBlock key={index} {...obj} />);

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: arrSortType[sortType],
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sortType, currentPage]);

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sortType = arrSortType.indexOf(String(params.sortProperty));
			dispatch(
				setFilters({
					...params,
					sortType,
				}),
			);
			isSearch.current = true;
		}
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		getPizzas();
		isSearch.current = false;
	}, [categoryId, sortType, currentPage, searchValue]);

	const onClickCategory = React.useCallback((id: number) => dispatch(setCategoryId(id)), []);

	return (
		<>
			<div className='content__top'>
				<Categories value={categoryId} onClickCategory={onClickCategory} />
				<Sort value={sortType} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === Status.ERROR ? (
				<div className='content__error-info'>
					<h2>Error</h2>
					<p>Произошла ошибка получения данных.</p>
				</div>
			) : (
				<div className='content__items'>{status === Status.LOADING ? sceletons : pizzas}</div>
			)}
			<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</>
	);
};

export default Home;
