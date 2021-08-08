
import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Nav from '../comp/nav'
import Intro from '../comp/intro'
import About from '../comp/about'
import States from '../comp/stats'
import Footer from '../comp/footer'
import Contact from '../comp/contact'
import Feedback from '../comp/feedback'


export default function About_page() {
  
  const [links, setlinks]=useState([{link: 'Home' , active: false, url: '/'}, {link: 'About' , active: true, url: ''}])

let Options1 = [{value: 1, label: "warka sdsdang"}, {value: 2, label: "dsad dang"} ,{value: 3, label: "warka ddddang"},{value: 4, label: "warkdsda dang"}]
  return (
      <>
     
     <Nav value={0} page={'about'}/> 
    <Intro links={links} title={"About Us"}/>
    
    <div className="main">

<About />
<States />
<Feedback />
<Contact />
<Footer />
    </div>

  
  </>




);
}