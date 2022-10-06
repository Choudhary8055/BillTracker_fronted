import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddLable() {
    const [lable, setLable] = useState("");
    const [amount, setAmount]=useState("");
  const [file, setFile] = useState();

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

//Handle csv file data
const fileReader = new FileReader();
const handleOnChange = (e)=>{
  setFile({file :e.target.file[0]});
};

const handleSubmit = (e) =>{
  e.preventDefault();
  if(file){
    fileReader.onload = async (e)=>{
    
        console.warn("file data", e.target.result);
        const url = "http://localhost:3500/upload-csv";
        const csvOutput = e.target.result ;
        const csvData = await axios.post(url, csvOutput)
        console.log(csvData);
        
      }
      fileReader.readAsDataURL(file);
    

    }
  }



  // const onload = (e)=>{
  //   console.warn("file data", e.target.result)
  //   const url = "http://localhost:3500/upload-csv";
  //   const formData = { file : e.target.result }
  //   return post(url, formData).then(response => console.warn("result", response))
  // }

  // let result = await axios.post(url);
  // console.log(result);
  // navigate('/');

return (
    <>
     <div className='product'>
        Lable:
      <input placeholder='Enter the label name' value={lable} onChange = {(e)=> setLable(e.target.value)} className="inputBox"/>
      Amount:
      <input placeholder='Enter the label amount' value={amount} onChange = {(e)=> setAmount(e.target.value)} className="inputBox"/>
      <button onClick={storeData} className="appButton">Save</button>
      </div>
    <div>
      <form>
      <h1>Bulk Csv</h1>
      <div className="input-group">
                <label for='files'>Select files</label>
                {/* <input id='files' type="file" onChange = {(e)=>setCsvData({csv: e.target.files[0]})}/> */}
              <input type ={"file"} accept={'.csv'} onChange ={handleOnChange}/>
            </div>
            <button className="submit-btn" onClick={(e)=>{handleSubmit(e)}}>Upload</button>
      </form>
  </div>
    </>
   
  )
}

export default AddLable;
