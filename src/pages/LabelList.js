import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function LabelList() {
	const [products, setProducts] = useState([]);
	const [searchBy, setSearchBy] = useState({
		searchFor: 'lable',
		searchValue: ''
	});
	const [pages, setPages] = useState([]);
	

	const getData = async () => {
		const url = 'http://localhost:3500/getData';
		const response = await axios.get(url);

		setProducts([...response.data]);
	};

	useEffect(() => {
		getData();
	}, []);

	const searchLable = async () => {
		if (searchBy.searchFor === 'lable') {
			const url = `http://localhost:3500/serach/${searchBy.searchValue}`;
			const response = await axios.get(url);

			if (response.data.searchData.length === 0) {
			} else {
				setProducts([...response.data.searchData]);
			}
		}
		if (searchBy.searchFor === 'date') {
			const url = `http://localhost:3500/serachbydate/${searchBy.searchValue}`;
			const response = await axios.get(url);

			if (response.data.searchData.length === 0) {
			} else {
				setProducts([...response.data.searchData]);
			}
		}
	};
	console.log(products);
	return (
		<div className="Lable-list">
			<h3>Product List</h3>
			<input
				type={searchBy.searchFor === 'lable' ? 'text' : 'date'}
				className="search-product"
				placeholder="Search Product"
				onChange={e => {
					setSearchBy({ ...searchBy, searchValue: e.target.value });
				}}
			/>
			<select
				name="select"
				id=""
				value={searchBy.searchFor}
				onChange={e => setSearchBy({ ...searchBy, searchFor: e.target.value })}>
				<option value="lable">Search by Lable</option>
				<option value="date">Search by Date</option>
			</select>
			<button onClick={searchLable}>Search</button>
			<div className="product">
				{products &&
					products.map((value, index) => {
						return (
							<ul key={value.amount + index}>
								<li>
									{index + 1}
								</li>
								<li>
									{value.lable}
								</li>
								<li>
									{value.amount}
								</li>
								<li>
									{moment().format("MMM Do YY")}
								</li>
								<button>
									<Link to={`/updatelist/${value._id}`}>Update Bill</Link>
								</button>
							</ul>
						);
					})}
			</div>
		</div>
	);
}

export default LabelList;
