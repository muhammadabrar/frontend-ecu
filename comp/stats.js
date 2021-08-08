import {MDBContainer} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
export default function States(props) {
    const [counter, setCounter] = useState(400)
  
  return( <>
   
   
   
    
    <section id="services" className="services">
    <div className="section-title">
              <span>Why choose us?</span>
              <h2>Why choose us?</h2>
            </div>
               <MDBContainer >
               <div className="row pb-5 justify-content-center">
                <div className="col-md-4" data-aos="fade-up">
                    <div className="icon-box">
                    <div className="icon"><i className="fas fa-check-circle"></i></div>
                    <p>High quality, safe and Dyno-tested remapped files</p>
                    </div>
                </div>
                <div className="col-md-4 " data-aos="fade-up" data-aos-delay="150">
                    <div className="icon-box">
                    <div className="icon"><i className="fas fa-check-circle"></i></div>
                    <p>Tested-ecusolutions.com supplies custom remapped tuning files. Just send Your file and contact</p>
                    </div>
                </div>
                <div className="col-md-4" data-aos="fade-up" data-aos-delay="150">
                    <div className="icon-box">
                    <div className="icon"><i className="fas fa-check-circle"></i></div>
                    <p>Custom made tuning files with the best perfomance results for your car</p>
                    </div>
                </div>
                </div>
                </MDBContainer>
                    <div className="states" style={{ backgroundImage: "url('./cta-bg.jpg')"}}>
                        <div className="states-bg p-5"> 
                            <MDBContainer>
                            <div className="row justify-content-center">
                        <div className="col-md-4 " data-aos="fade-up">
                            <h1 className="text-white text-bold"><CountUp end={100} />+</h1>
                        <p className="text-white text-bold">
                        FILES</p>
                        </div>
                        <div className="col-md-4 " data-aos="fade-up" data-aos-delay="150">
                        <h1 className="text-white text-bold"><CountUp end={100} />+</h1>
                        <p className="text-white text-bold">
                        DEALERS</p>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="150">
                        <h1 className="text-white text-bold"><CountUp end={15} /></h1>
                        <p className="text-white text-bold">
                        MINUTES TURNAROUND TIME</p>
                        </div>
                        </div>
                    </MDBContainer>
                </div>
               </div>
   
               </section>
           
          
   </>)
}