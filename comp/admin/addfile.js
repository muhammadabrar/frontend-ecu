
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WaveLoading } from 'react-loadingg';


export default function Addfile(props) {
  //model off on state
  const [basicModal, setBasicModal] = useState(false);
  //model off on function
  const toggleShow = () => setBasicModal(true);
  const toggleClose = () => setBasicModal(false);
  //loading states
  //err states
  const [datacreationErr, setdatacreationErr] = useState(false);
  const [datacreationSuccess, setdatacreationSuccess] = useState(false);
  const [progresssbar, setprogresssbar] = useState(0);
  const [Isprogresssbar, setIsprogresssbar] = useState(false);

  //search states
  const [Ismake, setIsmake] = useState(1);


  //inputs states
  const [input_model, setinput_model] = useState();
  const [input_make, setinput_make] = useState();
  const [input_engine, setinput_engine] = useState();
  const [input_hw, setinput_hw] = useState();
  const [input_sw, setinput_sw] = useState();
  const [input_ecu, setinput_ecu] = useState();
  const [input_price, setinput_price] = useState();
  const [input_size, setinput_size] = useState();
  const [input_file, setinput_file] = useState();
  const [input_fileName, setinput_fileName] = useState();
  const [input_Tool_read, setinput_Tool_read] = useState();
  const [input_power, setinput_power] = useState();
  //datalist
  const [input_options_engine, setinput_options_engine] = useState([]);
  const [input_options_make, setinput_options_make] = useState([]);
  const [input_options_model, setinput_options_model] = useState([]);




  //get option for inputs
    useEffect(() => {
      const getinputoptions = async()=>{
        const req = await axios.get(`${process.env.NEXT_PUBLIC_API}filedatalist/`)
        .then(res => {
            setinput_options_engine(res.data.engine)
            setinput_options_make(res.data.make)
            setinput_options_model(res.data.model)
        })
      }
      getinputoptions()
  }, [Ismake]);




 const onChangeHandler = async (event)=>{
   if(!event.target.files[0]){
    event.target.files = null
   }else{
  setinput_file(event.target.files[0])
  setinput_fileName(event.target.files[0].name)

  const size = event.target.files[0].size / 1024
  if(size >= 1024){
  setinput_size(size/1024 + "MB")
  event.target.files = null

  }else{
    setinput_size(size+ "KB")
  }
}

}

const createfile = async(event)=>{
  if(input_file){
  event.preventDefault();
  const data = {
    model : input_model,
    make : input_make,
    engine : input_engine,
    power : input_power,
    hw : input_hw,
    sw : input_sw,
    ecu : input_ecu,
    price : input_price,
    size : input_size,
    fileName : input_fileName,
    Tool_read : input_Tool_read,
  }
  const newFile = new File([input_file], input_model+"_"+input_make+"_"+input_sw+"_"+input_file.name, { type: input_file.type, lastModified: Date.now()})

  const file = new FormData()
  file.append('file', newFile) 
  file.append('name', "warkadang") 

  await axios.post(`${process.env.NEXT_PUBLIC_API}upload_ecufile`, file, { data,// receive two parameter endpoint url ,form data 
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: ProgressEvent => {
    setIsprogresssbar(true)
    setprogresssbar(ProgressEvent.loaded / ProgressEvent.total*100)
  }    
  })
      .then(res => { // then print response status
        console.log(res)
      })
      const req = axios.post(`${process.env.NEXT_PUBLIC_API}savefile`, {data})
          .then(res => {
            console.log(res)
            if(res){
            setBasicModal(false)
            setinput_model('')
            setinput_make('')
            setinput_engine('')
            setinput_hw('')
            setinput_sw('')
            setinput_ecu('')
            setinput_price('')
            setinput_size('')
            setinput_fileName('')
            setinput_power('')
            setinput_file(null)
            setinput_Tool_read('')
            setprogresssbar(0)
          setIsmake(oldKey => oldKey + 1)
            setIsprogresssbar(false)
            setdatacreationSuccess(true)
            setdatacreationErr(false)
        props.refresh()

            setTimeout(() => {
              setdatacreationSuccess(false)
            }, 10000);

          }else{
            setIsprogresssbar(false)
            setdatacreationSuccess(false)
            setdatacreationErr(true)
            setTimeout(() => {
              setdatacreationErr(false)
            }, 10000);
          }
          }).catch(err => {
            // what now?
      
            console.log("save file error");
            console.log(err);
        })
      }

}


  return (
  
    
     
    <>

   
  
        
        
           
            {Isprogresssbar&& <progress value={progresssbar} max="100"> {progresssbar}% </progress>}
            {datacreationErr && <p className="text-danger">some thing is wrong please try again!</p>}
            {datacreationSuccess && <p className="text-success">your data has been added!</p>}

            <form onSubmit={createfile} className="form">
<h2>Add File</h2>
              <div className="row">

                <div className="col-md-12 form-group Inputfile" >
                  <h4 className="file_text" >drag and drop your file here</h4>
                <input class="form-control form-control"
                 onChange={onChangeHandler} type="file" style={{height: "300px"}} filename={''}  required/><br></br>
                </div>
                
                <div className="col-md-12 form-group mt-3 ">
                <label>Make</label>
                
                <input type="text" 
                value={input_make} 
                onChange={(e)=> setinput_make(e.target.value)} 
                className="form-control" list="make" placeholder="Enter Make" required />
                </div>
                <datalist id="make">
                  {input_options_make.map((data, index)=><option value={data.make}></option>)}
                </datalist>
                
                <div className="col-md-12 form-group mt-3 ">
                <label>Model</label>
                
                <input type="text" 
                value={input_model} 
                onChange={(e)=> setinput_model(e.target.value)} 
                className="form-control" list="model" placeholder="Enter Model" required />
                </div>
                <datalist id="model">
                {input_options_model.map((data, index)=><option value={data.model}></option>)}
                </datalist>
                
                <div className="col-md-12 form-group mt-3 ">
                <label>Engine</label>
                
                <input type="text" 
                value={input_engine} 
                onChange={(e)=> setinput_engine(e.target.value)} 
                className="form-control" list="engine" placeholder="Enter engine" required />
                </div>
                <datalist id="engine">
                {input_options_engine.map((data, index)=><option value={data.engine}></option>)}
                </datalist>
                
                <div className="col-md-12 form-group mt-3 ">
                <label>Power</label>
                
                <input type="text" 
                value={input_power} 
                onChange={(e)=> setinput_power(e.target.value)} 
                className="form-control" placeholder="Enter power" required />
                </div>

                <div className="col-md-12 form-group mt-3 ">
                <label>HW</label>
                
                <input type="text" 
                value={input_hw} 
                onChange={(e)=> setinput_hw(e.target.value)} 
                className="form-control" placeholder="Enter HW" required />
                </div>
                
                <div className="col-md-12 form-group mt-3 ">
                <label>SW</label>
                
                <input type="text" 
                value={input_sw} 
                onChange={(e)=> setinput_sw(e.target.value)} 
                className="form-control" placeholder="Enter SW" required />
                </div>
                
                <div className="col-md-12 form-group mt-3 ">
                <label>ECU</label>
                
                <input type="text" 
                value={input_ecu} 
                onChange={(e)=> setinput_ecu(e.target.value)} 
                className="form-control" placeholder="Enter ECU" required />
                </div>
                
                <div className="col-md-12 form-group mt-3 ">
                <label>Price</label>
                
                <input type="number" 
                value={input_price} 
                onChange={(e)=> setinput_price(e.target.value)} 
                className="form-control" placeholder="Enter Price" required />
                </div>
                
                <div className="col-md-12 form-group mt-3 ">
                <label>Tool Read</label>
                
                <input type="text" 
                value={input_Tool_read} 
                onChange={(e)=> setinput_Tool_read(e.target.value)} 
                className="form-control" placeholder="Enter Tool Read" required />
                </div>
                
              </div>
              
              
              
              <div className="text-center mt-3"><button type="submit" >Save File</button></div>
            </form>
            

   {/*model inputs*/}
    
    </>
    

 

  
  )
}
