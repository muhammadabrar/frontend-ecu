import {MDBIcon, MDBContainer} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';

export default function Intro(props) {
   return( <>
   
   
    <div className="about mt-0 p-5 " style={{ backgroundImage: "url('./cta-bg.jpg')"}}>
    
<section className="about-section">
<div className="section-title">
          <span>About Us</span>
          <h2>About Us</h2>
        </div>
           <MDBContainer >
               
           <div className="about-content">
           <div className="row justify-content-center">
               <div className="col-md-4">
                <img src="./l-bg.jpg" className="about-image"/>
               </div>
               <div className="about-text text-black p-3 col-md-6">
                   <h2><u><b>Tested-ECU Solutions</b></u></h2>
                   <p><b>Tested-ECU Solutions</b> is supplier of high quality custom remapped tuning software files for almost all the popular petrol and diesel vehicles.</p>
                   <p><b>Tested-ECU Solutions</b> has its own R&D department for continuous product development. We supply custom remapped files in only 4 steps. That's what we call easy!</p>

               </div>
           </div>
           </div>
           </MDBContainer>

           </section>
       </div>
      
   </>)
}