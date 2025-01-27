import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemCart, selectorCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { CartItemProps, PizzaBlockProps } from '../../@types/types';

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
	const [activeSizePizza, setActiveSizePizza] = useState(0);
	const [activeTypesPizza, setActiveTypesPizza] = useState(0);

	const { items } = useSelector(selectorCart);
	const objItem = items.find((obj: CartItemProps) => obj.id === id);
	const countItem = objItem ? objItem.count : 0;
	const dispatch = useDispatch();
	const arrayTypes = ['тонкое', 'традиционное'];

	const onClickCart = () => {
		const item: CartItemProps = {
			id,
			title,
			price,
			imageUrl,
			sizePizza: sizes[activeSizePizza],
			typePizza: arrayTypes[activeTypesPizza],
			count: 0,
			delete: false,
		};
		dispatch(addItemCart(item));
	};

	return (
		<div className='pizza-block-wrapper'>
			<div className='pizza-block'>
				<Link to={`/pizza/${id}`}>
					<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
					<h4 className='pizza-block__title'>{title}</h4>
				</Link>
				<div className='pizza-block__selector'>
					<ul>
						{types.map((value, index) => (
							<li
								key={index}
								className={activeTypesPizza === value || types.length === 1 ? 'active' : ''}
								onClick={() => setActiveTypesPizza(value)}>
								{arrayTypes[value]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((value, index) => (
							<li
								key={index}
								className={activeSizePizza === index ? 'active' : ''}
								onClick={() => setActiveSizePizza(index)}>
								{value} см.
							</li>
						))}
					</ul>
				</div>
				<div className='pizza-block__bottom'>
					<div className='pizza-block__price'>от {price} ₽</div>
					<button className='button button--outline button--add' onClick={() => onClickCart()}>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span>Добавить</span>
						<i>{countItem}</i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default PizzaBlock;
