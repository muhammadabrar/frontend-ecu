
import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Nav from '../comp/nav'
import Intro from '../comp/intro'
import Footer from '../comp/footer'
import Faq from '../comp/faq'
import Feedback from '../comp/allfeedbacks';


export default function FAQ_page() {
  
  const [links, setlinks]=useState([{link: 'Home' , active: false, url: '/'}, {link: 'feedback' , active: true, url: '/feedback'}])

  return (
      <>
     
     <Nav value={0} page={'How'} /> 
    <Intro links={links} title={"FEED BACKS"}/>
    
    <div className="main">


<Feedback />
<Footer />
    </div>

  
  </>




);
}