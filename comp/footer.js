import {MDBIcon, MDBContainer} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Footer(props) {
  const [data, setData] = useState([]);
  const [about, setabout] = useState([]);

    //get option for inputs
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
      const getdata = async()=>{
        const req = await axios.get(`${process.env.NEXT_PUBLIC_API}about/`)
        .then(res => {
          setabout(res.data.about)
        })
      }
      getdata()
      contacts()
    }, []);
   return( <>
   
   
   <footer id="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-md-6">
            <div class="footer-info">
              <a href="/" className="text-white"><h3><u><b>Tested-ECU Solutions</b></u></h3></a>
<p>{about.p}</p>
              <div class="social-links mt-3">
                <a href={data.tweeter} class="twitter"><i class="fab fa-twitter"></i></a>
                <a href={data.facebook} class="facebook"><i class="fab fa-facebook"></i></a>
                <a href={data.insta} class="instagram"><i class="fab fa-instagram"></i></a>
                <a href={data.whatsapp} class="google-plus"><i class="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </div>

          <div class="col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i class="fas fa-chevron-right"></i> <a href="/">Home</a></li>
              <li><i class="fas fa-chevron-right"></i> <a href="/about">About us</a></li>
              <li><i class="fas fa-chevron-right"></i> <a href="/contact">Contact us</a></li>
              <li><i class="fas fa-chevron-right"></i> <a href="/Privacy_Policy">Privacy policy</a></li>
              <li><i class="fas fa-chevron-right"></i> <a href="/faq">FAQ</a></li>

            </ul>
          </div>

          <div class="col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><i class="fas fa-chevron-right"></i> <a href="/file">ECU FILES</a></li>
              <li><i class="fas fa-chevron-right"></i> <a href="/tuning">TUNING FILES</a></li>
             
            </ul>
          </div>


        </div>
      </div>
    </div>

    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong><span>Day</span></strong>. All Rights Reserved
      </div>
      <div class="credits">
        Designed by <a href="https://bootstrapmade.com/">Muhammad Abrar</a>
      </div>
    </div>
  </footer>
      
      
   </>)
}