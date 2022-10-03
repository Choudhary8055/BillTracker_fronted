import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateLable() {
	const [data, setData] = useState({});
	const navigate = useNavigate();
	const { id } = useParams();
	

	const storeData = async () => {
		const url = `http://localhost:3500/update/${id}`;
		const updated = await axios.put(url, data);
		if (updated.data.success) {
			console.log(updated);
			navigate('/');
		}
	};
	
	const getData = async () => {
		const url = `http://localhost:3500/getDataById/${id}`;
		const response = await axios.get(url);
		if (response.data.success) {
			setData({ ...response.data.data });
		}
	};
	
	useEffect(() => {
		getData();
	}, []);

	return (
		<div className='product'>
			Lable:
			<input
				placeholder="Enter the label name"
				value={data.lable}
				onChange={e => setData({ ...data, lable: e.target.value })}
				className="inputBox"
			/>
			<br />
			<br />
			Amount:
			<input
				placeholder="Enter the label amount"
				value={data.amount}
				onChange={e => setData({ ...data, amount: e.target.value })}
				className="inputBox"
			/>
			{/* <input
				value={data.date}
				onChange={e => setData({ ...data, date: e.target.value })}
			/> */}
			<button onClick={storeData}>Submit</button>
		</div>
	);
}

export default UpdateLable;
