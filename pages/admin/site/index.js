
import React, { useState, useEffect, useContext } from 'react';

import Sidebar from '../../../comp/admin/sidebar'

import { SemipolarLoading  } from 'react-loadingg';
import About from '../../../comp/admin/site/about';
import FQ from '../../../comp/admin/site/fq';
import Contacts from '../../../comp/admin/site/contacts';
import { useRouter } from 'next/router'









export default function Sitemanager() {
  const [loading, setLoading] = useState(true)
  const [pages, setpages] = useState('about')
  const router = useRouter()

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false)
  }, 2000);
  return () => clearTimeout(timer);
}, []);



if(loading){
  return(<SemipolarLoading  size="large"  color="#000"/>
  )
}else{
  return (
      <div className="admin">
       
<Sidebar />
<div className="container pt-5 mt-5">
  <div className="row">
    <div className="col-md-3">
    <div class="list-group">
  
      <a class="list-group-item list-group-item-action" onClick={()=> setpages("about")}>about</a>
      
      <a class="list-group-item list-group-item-action" onClick={()=> setpages("contact")}>Contacts</a>
<a href="#" class="list-group-item list-group-item-action" onClick={()=> setpages("Fq")}>F&Q</a>
</div>
    </div>
    <div className="col-md-8">
      {(() => {

         switch (pages) {
            case 'about':
                return (
                  <About />

                  )
                  case 'contact':
                    return (
                      <Contacts />
    
                      )
               
                
                case 'Fq':
                return (
                  <FQ />

                )
            default:
                return (
                  <div>You are a User.</div>
                )
         }

      })()}
    </div>

  </div>

</div>

  
  
  </div>
)}
}