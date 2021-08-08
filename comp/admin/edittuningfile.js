
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WaveLoading } from 'react-loadingg';
import { useRouter } from 'next/router'


export default function EditTuningfile(props) {
    const [data, setdata] = useState([]);
    const router = useRouter()

  //loading states
  //err states
  const [datacreationErr, setdatacreationErr] = useState(false);
  const [datacreationSuccess, setdatacreationSuccess] = useState(false);

  //search states
  const [Ismake, setIsmake] = useState(false);


  //inputs states
  const [input_cat, setinput_cat] = useState();
  const [input_title, setinput_title] = useState();
  const [input_price, setinput_price] = useState();
  
  //datalist
  const [input_options_cat, setinput_options_cat] = useState([]);
  const [catid, setcatid] = useState();




  //get option for inputs
    useEffect(() => {
      const getcat = async()=>{
        const req = await axios.get(`${process.env.NEXT_PUBLIC_API}getcats/`)
        .then(res => {
            setinput_options_cat(res.data.cat)
        })
      }
      const gettuningfile = async()=>{
        const req = await axios.get(`${process.env.NEXT_PUBLIC_API}gettuningfile/${props.id}`)
        .then(res => {
            setdata(res.data.tuningfile)
            setinput_title (res.data.tuningfile.title)
            setinput_price (res.data.tuningfile.price)
            
            setinput_cat(res.data.tuningfile.cat.cat)
        })
      }
      gettuningfile()
      getcat()
  }, []);





const createfile = async(event)=>{
  
  event.preventDefault();
  const data = {
    cat : input_cat,
    title : input_title,
    price : input_price,
  }

      const req = axios.put(`${process.env.NEXT_PUBLIC_API}edittuningfile/${props.id}`, {data})
          .then(res => {
            console.log(res)
            if(res){
                setTimeout(() => {
                    router.push("/admin/Tuningfile")
                    setdatacreationSuccess(false)
                  }, 1500);
        props.refresh()

            setTimeout(() => {
              setdatacreationSuccess(false)
            }, 10000);

          }else{
            setdatacreationSuccess(false)
            setdatacreationErr(true)
            setTimeout(() => {
              setdatacreationErr(false)
            }, 10000);
          }
          }).catch(err => {
            // what now?
      
            console.log("edit file error");
            console.log(err);
        })
      

}


  return (
  
    
     
    <>

   
  
        
        
           
            {datacreationErr && <p className="text-danger">some thing is wrong please try again!</p>}
            {datacreationSuccess && <p className="text-success">your data has been added!</p>}

            <form onSubmit={createfile} className="form mb-5">
            <h2>Edit File</h2>
              <div className="row">
                <div className="col-md-12 form-group mt-3 ">
                <label>Category</label>
                <input type="text" 
                value={input_cat} 
                onChange={(e)=> setinput_cat(e.target.value)} 
                className="form-control" list="cat" placeholder="Enter cat" required />
                </div>
                <datalist id="cat">
                  {input_options_cat.map((data, index)=><option value={data.cat}></option>)}
                </datalist>
                
                <div className="col-md-12 form-group mt-3 ">
                    <label>Title</label>
                <input type="text" 
                value={input_title} 
                onChange={(e)=> setinput_title(e.target.value)} 
                className="form-control" placeholder="Enter Title" required />
                </div>
                
                
                <div className="col-md-12 form-group mt-3 ">
                <label>Price</label>

                <input type="number" 
                value={input_price} 
                onChange={(e)=> setinput_price(e.target.value)} 
                className="form-control" placeholder="Enter Price" required />
                </div>
                
              </div>
              
              
              
              <div className="text-center mt-3"><button type="submit" >Add</button></div>
            </form>
            

   {/*model inputs*/}
    
    </>
    

 

  
  )
}
