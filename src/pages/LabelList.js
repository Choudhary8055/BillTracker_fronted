import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function LabelList() {
	const [products, setProducts] = useState([]);
	const [searchBy, setSearchBy] = useState({
		searchFor: 'lable',
		searchValue: ''
	});
const [pageNum, setPageNum] = useState(1);
const [buttons, setButtons] = useState([1,2,3,4,5]);
  const getData = async () => {
		const url = `http://localhost:3500/getData?page=${pageNum}&limit=5`
		const response = await axios.get(url);
         setProducts([...response.data]);
	};

	const updatePagNum=(num)=>{
      setPageNum(num);
	}

	useEffect(() => {
    getData();
    }, []);


	useEffect(() => {
        getData();
    }, [pageNum]);
	
	const deleteFn = async (id)=>{
     
	 const url =`http://localhost:3500/delete/${id}`;
	 const deleted = await axios.delete(url);
	 console.log(deleted);
	 const filteredData = products.filter(value => {
		if (value._id !== id) {
			return value;
		}
	});
	setProducts([...filteredData]);

	}

const searchLable = async (searchValue) => {
	
		if(searchValue){
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
		}else{
			getData();
		}
		
	};
	
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
				<table>
                    <tbody>
			 {products && products.map((value, index) => {
			
						return (
						
							<tr key={value.amount + index}>
								<td>
									{index + 1}
								</td>
								<td>
									{value.lable}
								</td>
								<td>
									{value.amount}
								</td>
								<td>
									{value.createdAt}
								</td>
								
								<td><button>
									<Link to={`/updatelist/${value._id}`}>Update Bill</Link>
								</button></td> 
								<td><button onClick={()=>deleteFn(value._id)}>
									Delete
								</button></td> 
							</tr>
								
						);
					})}
					</tbody>
						</table>
			</div> 
			<div>
  {/* <h3>Pagination</h3> */}
		{
			buttons && buttons.map((item)=>(
				<button className='btn btn-sm btn-primary' onClick={()=> updatePagNum(item)}>{item}</button>
			))
		}
		
	</div> 
		</div>
	);
}

export default LabelList;
