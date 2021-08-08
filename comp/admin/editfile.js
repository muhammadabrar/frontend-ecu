
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WaveLoading } from 'react-loadingg';
import { useRouter } from 'next/router'



export default function EditFile(props) {
  const [data, setdata] = useState([]);
  const router = useRouter()

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
  const [Ismake, setIsmake] = useState(false);


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
  const [old_file, setold_file] = useState();

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
        }).catch(err => {
            // what now?
      
            console.log("get getinputoptions error");
            console.log(err);
        })
      }
      const getdata = async()=>{
        const req = await axios.get(`${process.env.NEXT_PUBLIC_API}file/${props.id}`)
        .then(res => {
            setdata(res.data.data)
            setinput_model(res.data.data.model)
        setinput_make(res.data.data.make)
        setinput_engine(res.data.data.engine)
        setinput_hw(res.data.data.hw)
        setinput_sw(res.data.data.sw)
        setinput_ecu(res.data.data.ecu)
        setinput_price(res.data.data.price)
        setinput_power(res.data.data.power)
        setinput_Tool_read(res.data.data.Tool_read)
        setold_file(res.data.data.file)
            console.log(res.data.data);

        }).catch(err => {
            // what now?
      
            console.log("get data error");
            console.log(err);
        })
      }
      getdata()
      getinputoptions()
      
  }, []);






const editfile = async(event)=>{
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
    old_file : old_file
  }
 
     const req = await axios.put(`${process.env.NEXT_PUBLIC_API}updatefile/${props.id}`, {data})
          .then(res => {
            console.log(res)
            if(res){
                console.log("warkasdsad");

            router.push("/admin/files")
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
            router.push("/admin/login")
      
            console.log("edit api error");
            console.log(err);
        })
}


  return (
  
    
     
    <>
   {/*model inputs*/}

   
   
   
  
        
            

            <form onSubmit={editfile} className="form">
              <div className="row">
              
                
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
              
              
              
              <div className="text-center mt-3"><button type="submit" >Edit</button></div>
            </form>

   {/*model inputs*/}
    
    
    
    
    </>

 

  
  )
}
