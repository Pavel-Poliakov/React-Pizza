import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton: React.FC = () => (
	<ContentLoader
		className='pizza-block'
		speed={2}
		width={280}
		height={466.4}
		viewBox='0 0 280 466.4'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'> 
		<circle cx='124' cy='144' r='122' />
		<circle cx='245' cy='208' r='2' />
		<rect x='0' y='336' rx='10' ry='10' width='280' height='76' />
		<rect x='0' y='289' rx='10' ry='10' width='280' height='27' />
		<rect x='11' y='432' rx='10' ry='10' width='90' height='27' />
		<rect x='130' y='427' rx='20' ry='20' width='148' height='35' />
	</ContentLoader>
);

export default Sceleton;
