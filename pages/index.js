
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Nav from '../comp/nav'
import Intro from '../comp/landing-intro'
import Services from '../comp/services'
import Files from '../comp/files'
import About from '../comp/about'
import States from '../comp/stats'
import Footer from '../comp/footer'
import Contact from '../comp/contact'
import Feedback from '../comp/feedback'


export default function App() {
  const [ip, setip] = useState()
  useEffect(() => {
    const verify = async()=>{
      const req = await axios.get(`https://geoip-db.com/json/`)
      .then(res => {
        setip(res.data.IPv4);
      })
    }
    verify()
}, []);
useEffect(() => {
  const saveverify = async()=>{
    const req = await axios.put(`${process.env.NEXT_PUBLIC_API}visiters/${ip}`)
    .then(res => {
      console.log(res.data);
    })
  }
  saveverify()
}, [ip]);
  // https://geoip-db.com/jsonp/

  return (
      <>
     
     <Nav value={200} page={"Home"}/> 
    <Intro />
    
    <div className="main">
<Services />
<span className="line border"></span>
<Files />
<About />
<States />
<Feedback />
<Contact />
<Footer />
    </div>

  
  </>




);
}