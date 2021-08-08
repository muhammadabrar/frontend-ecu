
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WaveLoading } from 'react-loadingg';
import { useRouter } from 'next/router'



export default function Msg(props) {
  const [data, setdata] = useState([]);
  const router = useRouter()

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  

  //get option for inputs
    useEffect(() => {
      const msg = async()=>{
        const req = await axios.get(`${process.env.NEXT_PUBLIC_API}msg/${props.id}`)
        .then(res => {
            setdata(res.data.data)
        }).catch(err => {
            // what now?
      
            console.log("get msg error");
            console.log(err);
        })
      }
     
      msg()
      
  }, []);








  return (
  
    
     
    <>
    <h2>Message Detail</h2>
    <h3>Sender: {data.name}</h3>
  <p><a href ={`mailto:${data.email}`}>{data.email}</a></p>

    <p>Time: {days[data.day]}, {data.date} {months[data.month]} {data.year} {' '} {data.time}</p>
    <h4>Subject: {data.subject}</h4>
  <p>{data.msg}</p>
  <a href ={`mailto:${data.email}`} className="btn btn-primary">Replay</a>
    
    
    
    
    </>

 

  
  )
}
