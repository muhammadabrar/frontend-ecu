
import React, { useState, useEffect, useContext} from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';

import Sidebar from '../../../comp/admin/sidebar'

import Breadcrumb from '../../../comp/admin/breadcrumb';
import useAuth from "../../../hooks/useAuth";
import { SemipolarLoading  } from 'react-loadingg';
import EditTuningfile from '../../../comp/admin/edittuningfile';




axios.defaults.withCredentials = true


export default function Index() {
  const [name, setname] = useState('')

  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { id } = router.query
console.log("id: "+ id)
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
  }, 2500);
  return () => clearTimeout(timer);
}, []);



if(loading){
  return(<SemipolarLoading  size="large"  color="#000"/>
  )
}else{
  return (
      <div className="admin">
       
<Sidebar name={name}/>
      <Breadcrumb />
     
      <div className="container mt-5 pt-5">
      <div className="row">
        
          <div className="col-md-12"><EditTuningfile id={id}/></div>
          



          </div>
      </div>
     
  
  
  </div>
)}
}