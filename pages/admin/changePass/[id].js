
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';

import Sidebar from '../../../comp/admin/sidebar'

import Msg from '../../../comp/admin/msg';
import useAuth from "../../../hooks/useAuth";
import { SemipolarLoading  } from 'react-loadingg';

  
  axios.defaults.withCredentials = true




export default function Index() {

  const router = useRouter()
  const { id } = router.query
const [Isverify, setIsverify] = useState(false)
const [token, settoken] = useState()
const [pass, setpass] = useState()
const [ispass, setispass] = useState(false)

const [loading, setLoading] = useState(true)
useEffect(() => {
    const verify = async()=>{
      const req = await axios.get(`${process.env.NEXT_PUBLIC_API}sendtoken/${id}`)
      .then(res => {
          if(res.data.success){
 
            setLoading(false)
  
          
          }else{
            router.push(`/admin/users`)
          }
      })
    }
    verify()

  }, []);


const verify = async()=>{
  if(token){
    const data ={
      token : token
    }
    const req = await axios.put(`http://localhost:8000/tokenverification/${id}`, {data})
        .then(res => {
          console.log(res);
          if(res.data.success){
            setIsverify(true)
          }
        })
  }
}

const changepass = async()=>{
  if(pass){
    const data ={
      pass : pass
    }
    const req = await axios.put(`http://localhost:8000/changepass/${id}`, {data})
        .then(res => {
          console.log(res);
          if(res.data.success){
            setispass(true)
          }
        })
  }
}

if(loading){
  return(<SemipolarLoading  size="large"  color="#000"/>
  )
}else{
  return (
      <div className="admin">
       
<Sidebar />
     
      <div className="container  pt-5">
      <div className="row">
        
          {!Isverify ?<div className="col-md-6 p-5 m-5">
          <form onSubmit={verify} className="form">  

          <div className="row form-group mt-3 ">
                <input type="number" 
                value={token}
                onChange={(e)=> settoken(e.target.value)}
                className="form-control" list="model" placeholder="Enter OTP" required />
                </div>
                <div className="text-center mt-3"><button type="submit" >verify</button></div>
</form>
          </div>:
          <>
          {!ispass ? <div className="col-md-6 p-5 m-5">
          <form onSubmit={changepass} className="form">  
          <div className="row form-group mt-3 ">
                
                <input type="text" 
                value={pass}
                onChange={(e)=> setpass(e.target.value)}
                className="form-control" list="model" placeholder="Enter Pass" required />
                </div>
                <div className="text-center mt-3"><button type="submit" >change</button></div>
                </form>

          </div>:
          <h3 className="text-black">Your Pass has been changed goto <a href="/admin/users">User page</a> or <a href="/admin/">DashBoard</a></h3>
        }
          
          </>
          
        }
          



          </div>
      </div>
     
  
  
  </div>
)}}
