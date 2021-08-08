
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Select from 'react-select';
import Nav from '../../comp/admin/navtop'
import Sidebar from '../../comp/admin/sidebar'

import States from '../../comp/admin/states';
import Breadcrumb from '../../comp/admin/breadcrumb';
import Orders from '../../comp/admin/orders';
import Earnings from '../../comp/admin/earnings';
import Contacts from '../../comp/admin/contacts';
import Visiter from '../../comp/admin/visiters';
import Files from '../../comp/admin/files';
import useAuth from "../../hooks/useAuth";
import { SemipolarLoading  } from 'react-loadingg';
import { useRouter } from 'next/router'

import { AuthContext } from '../../hooks/auth';


axios.defaults.withCredentials = true



export default function Index() {
  const router = useRouter()

  const [auth, setAuth] = useContext(AuthContext)
  console.log("this is your id: "+auth)
  const [name, setname] = useState('')
  const [loading, setLoading] = useState(true)


useEffect(() => {
  const verify = async()=>{
    const req = await axios.get(`${process.env.NEXT_PUBLIC_API}verifyAuth`)
    .then(res => {
        if(res.data.user){
console.log("user is: "+res.data.user)
            setname(res.data.user.name)
            console.log(res.data.user.name + "your are in")

          
        }else{
          router.push(`/admin/login`)
        }
      console.log(res.data);
    })
  }
  verify()
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
      <div className="admin pb-5 mb-5">
       
<Sidebar name={name} />
      <Breadcrumb />
     
      <States />
      <div className="container mt-5 pt-5">
      <div className="row">
        
          <div className="col-md-8"><Orders /></div>
          <div className="col-md-4"><Earnings /></div>
          <div className="col-md-8 mt-5 pt-3"><Contacts /></div>
          <div className="col-md-4 mt-5 pt-3"><Visiter /></div>
          {/* <div className="col-md-12 mt-5 pt-3"><Files /></div> */}



          </div>
      </div>
     
  
  
  </div>
)}
}