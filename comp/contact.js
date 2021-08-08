import { MDBIcon } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Intro(props) {
  const [input_name, setinput_name] = useState();
  // const [input_, setinput_] = useState();
  const [input_email, setinput_email] = useState();
  const [input_subject, setinput_subject] = useState();
  const [input_msg, setinput_msg] = useState();
  const [datacreationSuccess, setdatacreationSuccess] = useState(false);
  const [datacreationErr, setdatacreationErr] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const contacts = async () => {
      const req = await axios.get(`${process.env.NEXT_PUBLIC_API}contact/`)
        .then(res => {
          setData(res.data.contact)
        }).catch(err => {
          // what now?

          console.log("get contact error");
          console.log(err);
        })
    }
    
    contacts()
  }, []);


  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: input_name,
      email: input_email,
      subject: input_subject,
      msg: input_msg,
    }
    const req = axios.post(`${process.env.NEXT_PUBLIC_API}postmsg`, {data})
    .then(res => {
      console.log(res)
      if(res){
      
        setinput_name ('')
        setinput_email ('')
        setinput_subject ('')
        setinput_msg ('')
        setdatacreationSuccess(true)

      setTimeout(() => {
        setdatacreationSuccess(false)
      }, 10000);

    }else{
      setdatacreationSuccess(false)
      setdatacreationErr(true)
      setTimeout(() => {
        setdatacreationErr(false)
      }, 10000);
    }
    }).catch(err => {
      // what now?

      console.log("save file error");
      console.log(err);
  })
}
  

  return (<>


    <section id="contact" className="contact bg-white">
      <div className="container">

        <div className="section-title">
          <span>Contact</span>
          <h2>Contact</h2>
          <p>feel Free To contact</p>
        </div>

        <div className="row" data-aos="fade-up">
          {/* <div className="col-lg-6">
            <div className="info-box mb-4">
              <i className="fas fa-map"></i>
              <h3>Our Address</h3>
              <p>A108 Adam Street, New York, NY 535022</p>
            </div>
          </div> */}

          <div className="col-lg-12 col-md-12">
            <div className="info-box  mb-4">
              <i className="fas fa-envelope"></i>
              <h3>Email Us</h3>
              <p>{data.email}</p>
            </div>
          </div>

          {/* <div className="col-lg-3 col-md-6">
            <div className="info-box  mb-4">
              <i className="fas fa-phone"></i>
              <h3>Call Us</h3>
              <p>+1 5589 55488 55</p>
            </div>
          </div> */}

        </div>

        <div className="row" data-aos="fade-up">

          {/* <div className="col-lg-6 ">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26425.264212015438!2d72.5897166970005!3d34.116703907642865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38defa191164fbc7%3A0x51780d9082757ca7!2sMaini%2C%20Swabi%2C%20Khyber%20Pakhtunkhwa!5e0!3m2!1sen!2s!4v1624433192737!5m2!1sen!2s" frameborder="0" style={{border:0, width: "100%", height: "384px"}} allowfullscreen></iframe>
            
          </div> */}

          <div className="col-lg-12">
            <form onSubmit={handlesubmit} role="form" className="php-email-form">
              {datacreationErr && <p className="text-danger">please try again</p>}
              {datacreationSuccess && <p className="text-success">Your message has been sent. Thanks for contact us You will get email as soon as possible</p>}

              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="text" className="form-control" value={input_name}
                    onChange={(e) => setinput_name(e.target.value)}
                    placeholder="Your Name" required />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" className="form-control" value={input_email}
                    onChange={(e) => setinput_email(e.target.value)} placeholder="Your Email" required />
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" className="form-control" value={input_subject}
                  onChange={(e) => setinput_subject(e.target.value)} placeholder="Subject" required />
              </div>
              <div className="form-group mt-3">
                <textarea className="form-control" value={input_msg}
                  onChange={(e) => setinput_msg(e.target.value)} rows="5" placeholder="Message" required></textarea>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center"><button type="submit">Send Message</button></div>
            </form>
          </div>

        </div>

      </div>
    </section>

  </>)
}