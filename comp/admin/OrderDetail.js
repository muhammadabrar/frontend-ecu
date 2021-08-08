
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WaveLoading } from 'react-loadingg';
import { useRouter } from 'next/router'



export default function OrderDetail(props) {
  const [order, setorder] = useState();
  const [reorder, setreorder] = useState();

  const router = useRouter()

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  

  //get option for inputs
    useEffect(() => {
      const order = async()=>{
        const req = await axios.get(`${process.env.NEXT_PUBLIC_API}OrderDetail/${props.id}`)
        .then(res => {
            setorder(res.data.data)
        }).catch(err => {
            // what now?
      
            console.log("get OrderDetail error");
            console.log(err);
        })
      }
     
      order()
      
  }, [reorder]);



  console.log(order);

  const deleteorder = async (id)=>{
    const req = await axios.delete(`${process.env.NEXT_PUBLIC_API}deleteorder/${id}`)
    .then(res => {
      router.push(`/admin/Tuningfile`)

  
    })
}
const UpdateOrder = async (id)=>{
  const req = await axios.put(`${process.env.NEXT_PUBLIC_API}UpdateOrder/${id}`)
  .then(res => {
    setreorder(oldKey => oldKey + 1)

    if(res.data.err){
      setreorder(oldKey => oldKey + 1)
    }else{
      setIsdelete(true)
      setreorder(oldKey => oldKey + 1)
  }
  })
}
const downloadorder = async (name)=>{
  await axios.get(`${process.env.NEXT_PUBLIC_API}downloadorder/${name}`)
  
}



  return (
  
    <>
     
 {order && <><p><b>Name:</b> {order[0].name}</p>
  <p><b>Email:</b> {order[0].email}</p>
  <p><b>Date:</b> {days[order[0].day]}, {order[0].date} {months[order[0].month]} {order[0].year} {' '}<br></br>{order[0].time}</p>
  <p><b>Price:</b> $ {order[0].price}</p>
  <p><b>Payment Status:</b>{order[0].paid? "Paid" : "Unpaid"}</p>
  <h2 className="text-black pt-4 pb-3">Files Detail:</h2>
  <div className="row">
  {order[0].ordersID.map((data, index)=>
<div className="col-md-3 bd-white">
<p><b>Title:</b> {data.tuningfile.title}</p>
<p><b>Price:</b> {data.tuningfile.price}</p>
<p><b>Category:</b> {data.tuningfile.cat.cat}</p>
</div>
)}
  </div>
  <div className="row mt-5">
  <div className="col-md-3"><><button onClick={()=> deleteorder(order[0].id)} className="btn btn-sm bg-danger text-white">Delete</button></></div>
  <div className="col-md-3"><><button onClick={()=> downloadorder(order[0].file1)}  className="btn btn-sm bg-info text-white">Download</button></></div>
  {order[0].status?   <div className="col-md-3"><><button disabled className="btn btn-sm bg-success text-white">Done</button></></div>
 : <div className="col-md-3"><><button onClick={()=> UpdateOrder(order[0].id)} className="btn btn-sm bg-success text-white">Update (done)</button></></div>
}

  </div>
    
    </>} 
  </>

 

  
  )
}
