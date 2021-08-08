
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Nav from '../comp/nav'
import Intro from '../comp/intro'
import Footer from '../comp/footer'
import Contact from '../comp/contact'



export default function Contact_page() {
  const [links, setlinks]=useState([{link: 'Home' , active: false, url: '/'}, {link: 'Contact' , active: true, url: ''}])

  return (
      <>
     
     <Nav value={0} page={'Contact'} /> 
    <Intro links={links} title={"Contact Us"}/>
    
    <div className="main">

<Contact />
<Footer />
    </div>

  

  </>




);
}