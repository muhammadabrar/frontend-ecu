
import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Nav from '../comp/nav'
import Intro from '../comp/intro'
import Footer from '../comp/footer'
import Faq from '../comp/faq'


export default function FAQ_page() {
  
  const [links, setlinks]=useState([{link: 'Home' , active: false, url: '/'}, {link: 'FAQ' , active: true, url: '/faq'}])

  return (
      <>
     <Nav value={0} page={'How'} /> 
    <Intro links={links} title={"FREQUENTLY ASKED QUESTIONS"}/>
    <div className="main">
    <Faq />
    <Footer />
    </div>
  </>
);
}