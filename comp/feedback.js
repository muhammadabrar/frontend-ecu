import {MDBIcon,MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";

export default function feedback(props) {
const [feedback, setfeedback] = useState([])
    useEffect(() => {
        const feedback = async () => {
          const req = await axios.get(`${process.env.NEXT_PUBLIC_API}feedback/2`)
            .then(res => {
                setfeedback(res.data.data)
            }).catch(err => {
              // what now?
    
              console.log("get feeedback error");
              console.log(err);
            })
        }
        feedback()
      }, []);
   return( <>
   
{feedback.length > 1 ? 

<section className="feedback">
<div className="section-title">
          <span>What our clients say</span>
          <h2>What our clients say</h2>
        </div>
           <MDBContainer >
               <div className="row justify-content-center">
           {feedback.map((data)=>
                   <MDBCard className="col-md-5 m-1">
            <MDBCardBody>
            <ReactStars
            count={5}
            value={data.stars}
            edit={false}
            size={50}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
            />
                <MDBCardText>
                {data.feedback}
                </MDBCardText>
                <MDBCardTitle>{data.name}</MDBCardTitle>
                <p>{data.company}</p>
            </MDBCardBody>
            </MDBCard>)}
            <a className="Button mt-3 col-md-2" style={{width:"300px"}} href="/feedback">view All <i class="fas fa-chevron-right"></i> </a>
            <a className="Button mt-3 col-md-2" style={{width:"300px"}} href="/feedback">Give Feedback<i class="fas fa-chevron-right"></i> </a>

            </div>
           </MDBContainer>

           </section>
     : <></>}
    

      
   </>)
}