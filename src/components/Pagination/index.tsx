import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

type PaginationProps = {
	currentPage: number;
	setCurrentPage: (i:number)=>void;
};
const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage }) => {
	const totalPages = 3;

	return (
		<ResponsivePagination current={currentPage} total={totalPages} onPageChange={setCurrentPage} />
	);
};
export default Pagination;
