import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddLable() {
    const [lable, setLable] = useState("");
    const [amount, setAmount]=useState("");
    const navigate = useNavigate();
    
    const storeData = async ()=>{
        const data = {
            lable,
             amount
        };
       
		const url = 'http://localhost:3500/addlable';

		let result = await axios.post(url, data);
    navigate('/');
} 

  return (
    <>
     <div className='product'>
        Lable:
      <input placeholder='Enter the label name' value={lable} onChange = {(e)=> setLable(e.target.value)} className="inputBox"/>
      Amount:
      <input placeholder='Enter the label amount' value={amount} onChange = {(e)=> setAmount(e.target.value)} className="inputBox"/>
      <button onClick={storeData} className="appButton">Save</button>
      </div>
    
    </>
   
  )
}

export default AddLable;
