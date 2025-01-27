import React from 'react';
import { CategoriesProps } from '../@types/types';

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {
	const arrayCategory = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
	return (
		<div className='categories'>
			<ul>
				{arrayCategory.map((nameCategory, index) => {
					return (
						<li
							key={index}
							className={value === index ? 'active' : ''}
							onClick={() => {
								onClickCategory(index);
							}}>
							{nameCategory}
						</li>
					);
				})}
			</ul>
		</div>
	);
});

export default Categories;
