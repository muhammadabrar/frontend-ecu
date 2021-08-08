import {MDBIcon,MDBContainer} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function About(props) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const getdata = async()=>{
      const req = await axios.get(`${process.env.NEXT_PUBLIC_API}about/`)
      .then(res => {
          setdata(res.data.about)
      })
    }
    getdata()
}, []);
   return( 
       
<section className="about-section">
<div className="section-title">
          <span>About Us</span>
          <h2>About Us</h2>
        </div>
           <MDBContainer >
               
           <div className="about-content">
           <div className="row justify-content-center">
               <div className="col-md-4">
                <img src={"http://localhost:8000/images/"+data.image} className="about-image"/>
               </div>
               <div className="about-text text-primary p-3 col-md-6">
                   <h2><u><b>{data.title}</b></u></h2>
                   <p>{data.p}</p>
        <p>{data.p2}</p>
               </div>
           </div>
           </div>
           </MDBContainer>

           </section>
   
      
   


   )
}