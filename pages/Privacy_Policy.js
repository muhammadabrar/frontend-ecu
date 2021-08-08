
import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Nav from '../comp/nav'
import Intro from '../comp/intro'
import Footer from '../comp/footer'
import Privacy from '../comp/Privacy'


export default function TF_page() {
  
  const [links, setlinks]=useState([{link: 'Home' , active: false, url: '/'}, {link: 'Privacy Policy' , active: true, url: '/PrivacyPolicy'}])

  return (
      <>
     
     <Nav value={0} page={'home'} /> 
    <Intro links={links} title={"Privacy Policy"}/>
    
    <div className="main">


<Privacy />
<Footer />
    </div>

  
  </>




);
}