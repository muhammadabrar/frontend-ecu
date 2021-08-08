import {MDBContainer} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';

import useWindowDimensions from '../hooks/useWindowDimensions';
export default function Services(props) {
    
  const { height, width } = useWindowDimensions();
   return( 
   <>
 
   <section id="services" className="services">
      <div className="container">

        <div className="section-title">
          <span>Services</span>
          <h2>Services</h2>
          <p>Tested-ecusolutions.com providing Best & fastest web service for tuning tools</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up">
            <div className="icon-box">
              <div className="icon"><i className="fas fa-file-code"></i></div>
              <h4><a href="">Original ECU files</a></h4>
              <p>Download the original files for your ECU. Search by hardware or software number</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch " data-aos="fade-up" data-aos-delay="150">
            <div className="icon-box">
              <div className="icon"><i className="fas fa-file-upload"></i></div>
              <h4><a href="">Customized tuning files</a></h4>  
               <p>Tested-ecusolutions.com supplies custom remapped tuning files. Just send Your file and contact</p>

            </div>
          </div>

         
        </div>

      </div>
    </section>
   
   </>)
}