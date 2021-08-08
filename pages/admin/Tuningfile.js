
import React, { useState, useEffect, useContext } from 'react';


import Sidebar from '../../comp/admin/sidebar'

import Breadcrumb from '../../comp/admin/breadcrumb';
import Orders from '../../comp/admin/orders';
import TuningFiles from '../../comp/admin/tuningfiles';

import { SemipolarLoading  } from 'react-loadingg';
import { useRouter } from 'next/router'
import axios from 'axios';
axios.defaults.withCredentials = true




export default function Index() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [name, setname] = useState('')
// useAuth()
useEffect(() => {
//   const verify = async()=>{
//     const req = await axios.get(`${process.env.NEXT_PUBLIC_API}verifyAuth`)
//     .then(res => {
//         if(res.data.user){
// console.log("user is: "+res.data.user)
//             setname(res.data.user.name)

//           if(res.data.user.id == auth){
//             console.log(res.data.user.name + "your are in")
//           }else{
//           router.push(`/admin/login`)
//         }
//         }else{
//           router.push(`/admin/login`)
//         }
//       console.log(res.data);
//     })
//   }
//   verify()
  const timer = setTimeout(() => {
    setLoading(false)
  }, 1000);
  return () => clearTimeout(timer);
}, []);



if(loading){
  return(<SemipolarLoading  size="large"  color="#000"/>
  )
}else{
  return (
      <div className="admin pt-5">
       
<Sidebar name={name} />
      <Breadcrumb />
     
      <div className="container mt-5 pt-5">
      <div className="row">
      <div className="col-md-12"><TuningFiles /></div>
        
          <div className="col-md-12"><Orders /></div>
   
          {/* <div className="col-md-12 mt-5 pt-3"><Files /></div> */}



          </div>
      </div>
     
  
  
  </div>
)}
}