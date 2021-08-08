
import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Nav from '../comp/nav'
import Intro from '../comp/intro'
import Footer from '../comp/footer'
import Files from '../comp/files'


export default function file_page() {
  
  const [links, setlinks]=useState([{link: 'Home' , active: false, url: '/'}, {link: 'ECu' , active: true, url: ''}])

  return (
      <>
     
     <Nav value={0} page={'ECU'} /> 
    <Intro links={links} title={"ECU FILES"}/>
    
    <div className="main">
<Files />
<Footer />
    </div>

  
  </>




);
}