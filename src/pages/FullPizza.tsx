import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const FullPizza: React.FC = () => {
	const { id } = useParams();
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: string | number;
	}>();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPizza = async () => {
			try {
				const { data } = await axios.get(`https://6783ac4d8b6c7a1316f52f2d.mockapi.io/items/` + id);
				setPizza(data);
			} catch (error) {
				alert('Произошла ошибка получения пиццы.');
				navigate('/');
			}
		};
		fetchPizza();
	}, []);

	if (!pizza) {
		return <div>Loading</div>;
	}

	return (
		<div className='container-pizza-block'>
			<div className='pizza-block'>
				<img className='pizza-block__image' src={pizza.imageUrl} />
				<h4 className='pizza-block__title'>{pizza.title}</h4>
				<div className='pizza-block__price'>от {pizza.price} ₽</div>
			</div>
			<Link to='/' className='button button--black'>
				<span>Вернуться назад</span>
			</Link>
		</div>
	);
};
export default FullPizza;
