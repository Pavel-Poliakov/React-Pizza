import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import React from 'react';

const Cart = React.lazy(() => import(/*webpackChunkName: "Cart" */ './pages/Cart'));

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route
					path='cart'
					element={
						<React.Suspense fallback={<div>Идет загрузка корзины...</div>}>
							<Cart />
						</React.Suspense>
					}
				/>
				<Route path='pizza/:id' element={<FullPizza />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
