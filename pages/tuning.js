
import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Nav from '../comp/nav'
import Intro from '../comp/intro'
import Footer from '../comp/footer'
import Tf from '../comp/tf'


export default function TF_page() {
  
  const [links, setlinks]=useState([{link: 'Home' , active: false, url: '/'}, {link: 'TUNING FILES' , active: true, url: '/faq'}])

  return (
      <>
     
     <Nav value={0} page={'TUNING'} /> 
    <Intro links={links} title={"TUNING FILE"}/>
    
    <div className="main">


<Tf />
<Footer />
    </div>

  
  </>




);
}