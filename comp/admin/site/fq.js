
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WaveLoading } from 'react-loadingg';


export default function FAQ(props) {
  const [data, setData] = useState([]);

  //loading states
  //err states
  const [datacreationErr, setdatacreationErr] = useState(false);
  const [datacreationSuccess, setdatacreationSuccess] = useState(false);

  //IS states
  const [IsAdd, setIsAdd] = useState(false);
  const [refresh, setrefresh] = useState(1);
  const [Isdelete, setIsdelete] = useState(false);


  //inputs states
  const [input_p, setinput_p] = useState();
  const [input_Q, setinput_Q] = useState();

  




  //get option for inputs
    useEffect(() => {
      const getfaq = async()=>{
        const req = await axios.get(`${process.env.NEXT_PUBLIC_API}faq/`)
        .then(res => {
          setData(res.data.data)
        }).catch(err => {
          // what now?
    
          console.log("save faq error");
          console.log(err);
      })
      }
      getfaq()
  }, [refresh]);





const createfile = async(event)=>{
  
  event.preventDefault();
  const data = {
    p:input_p,
    Q:input_Q
  }

      const req = axios.post(`${process.env.NEXT_PUBLIC_API}faq`, {data})
          .then(res => {
            console.log(res)
            if(res){
              setinput_p ('')
              setinput_Q ('')
            setdatacreationSuccess(true)
            setdatacreationErr(false)
            setrefresh(old => old+1)
        setIsAdd(false)
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
      
            console.log("save faq error");
            console.log(err);
        })
      

}
const deleteFaq = async (id)=>{
  const req = await axios.delete(`${process.env.NEXT_PUBLIC_API}faq/${id}`)
  .then(res => {
    if(res.data.err){
      setrefresh(old => old+1)
    }else{
      setIsdelete(true)
      setrefresh(old => old+1)

  }
  }).catch(err => {
    // what now?

    console.log("delete faq error");
    console.log(err);
})

}


  return (
  
    
     
    <>
<div className="table-title">
   <h4 className="text-title mt-1">F&Qs </h4>
   {/*model inputs*/}

   <button  className="btn btn-sm btn-warning" onClick={()=> setIsAdd(!IsAdd)}><><i className="fas fa-plus"></i> </></button>

</div>
<section className="faq">

<div className="contanier" >
{Isdelete && <p className="text-warning">File deleted</p>}

{data.map((data)=><details>
<summary>{data.Q} <button  className="btn btn-sm btn-warning" onClick={()=> deleteFaq(data.id)}><><i className="fas fa-trash-alt"></i> </></button>
</summary>
<div class="faq__content">
<p>{data.p}</p>
</div>

</details>)
}

</div>

</section>

{IsAdd && <form onSubmit={createfile} className="form mb-5">
        <h2>Edit</h2>
            <div className="row">
            
            
            
            <div className="col-md-12 form-group mt-3 ">
                <label>Question</label>
            <input type="text" 
            value={input_Q} 
            onChange={(e)=> setinput_Q(e.target.value)} 
            className="form-control" placeholder="Enter Question" required />
            </div>
            
            
            <div className="col-md-12 form-group mt-3 ">
            <label>Answer</label>

            <textarea
            value={input_p} 
            onChange={(e)=> setinput_p(e.target.value)} 
            className="form-control" placeholder="Enter Answer" required />
            </div>
            
            
            </div>
            
            
            
            <div className="text-center mt-3"><button type="submit" >Add</button></div>
        </form>
        
}
    
    </>
    

 

  
  )
}
