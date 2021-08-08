import {MDBIcon,MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';

export default function feedback(props) {
  const [data, setData] = useState([]);

    const [input_name, setinput_name] = useState();
    const [input_company, setinput_company] = useState();
    const [input_feedback, setinput_feedback] = useState();
    const [input_stars, setinput_stars] = useState();
    const [datacreationErr, setdatacreationErr] = useState(false);
    const [datacreationSuccess, setdatacreationSuccess] = useState(false);
    const [refresh, setrefresh] = useState(1);
  
    const ratingChanged = (newRating) => {
        setinput_stars(newRating);
      };
  //get option for inputs
  useEffect(() => {
    const feedback = async () => {
      const req = await axios.get(`${process.env.NEXT_PUBLIC_API}feedback/`)
        .then(res => {
          setData(res.data.data)
        }).catch(err => {
          // what now?

          console.log("get feeedback error");
          console.log(err);
        })
    }
    feedback()
  }, [refresh]);
  console.log(data);

      const addfeedback = async (event) => {

        event.preventDefault();
        const data = {
          name: input_name,
          company: input_company,
          feedback: input_feedback,
          stars: input_stars,
        }
    
        const req = axios.post(`${process.env.NEXT_PUBLIC_API}feedback/`, { data })
          .then(res => {
            console.log(res)
            if (res) {
                setinput_name ('')
                setinput_company ('')
                setinput_feedback ('')
                setinput_stars ('')
              setdatacreationSuccess(true)
              setdatacreationErr(false)
              setrefresh(old => old + 1)
              setIsAdd(false)
              setTimeout(() => {
                setdatacreationSuccess(false)
              }, 10000);
    
            } else {
              setdatacreationSuccess(false)
              setdatacreationErr(true)
              setTimeout(() => {
                setdatacreationErr(false)
              }, 10000);
            }
          }).catch(err => {
            // what now?
    
            console.log("save faq error");
            console.log(err);
          })
      }
   return( <>
   

    
<section className="feedback">
<div className="section-title">
          <span>What our clients say</span>
          <h2>What our clients say</h2>
        </div>
           <MDBContainer >
               <div className="row justify-content-center">
               <div className="col-md-6">
                   <form onSubmit={addfeedback} className="form mb-5">

                   <h2>Give Us your Feedback</h2>

        <div className="row">
          <div className="col-md-12 form-group mt-3 ">
            <label>Name</label>
            <input type="text"
              value={input_name}
              onChange={(e) => setinput_name(e.target.value)}
              className="form-control" placeholder="Enter Question" required />
          </div>
          <div className="col-md-12 form-group mt-3 ">
            <label>Company Name</label>
            <input
              value={input_company}
              onChange={(e) => setinput_company(e.target.value)}
              className="form-control" placeholder="Enter Answer" required />
          </div>
          <ReactStars
            count={5}
            value={input_stars}
            onChange={ratingChanged}
            size={50}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
            />
          <div className="col-md-12 form-group mt-3 ">
            <label>Feedback</label>

            <textarea
              value={input_feedback}
              onChange={(e) => setinput_feedback(e.target.value)}
              className="form-control" placeholder="Enter Answer" required />
          </div>
        </div>



        <div className="text-center mt-3"><button type="submit" >Add</button></div>
      </form>
                   </div>
           
                   <div className="col-md-6">
                   {datacreationSuccess && <p className="text-success">Dear Customer Thank you so much For your feedback</p>}

                   {data.map((data)=>
                   <MDBCard className="col-md-12 m-1">
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
             </div>
                   

            </div>
           </MDBContainer>

           </section>
     
      
   </>)
}