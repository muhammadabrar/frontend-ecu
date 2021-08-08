import React, { useState, useEffect } from 'react';
import axios from 'axios';


import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse, 
  } from 'mdb-react-ui-kit';

export default function Nav(props) {
    const [showBasic, setShowBasic] = useState(false);
    const [navBG, setnavBG] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setnavBG(position);
    };
    useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    const [data, setData] = useState([]);


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
      
      contacts()
    }, []);
    
    return(
<>
<section id="topbar" className="d-flex align-items-center">
    <div className="container d-flex justify-content-center justify-content-md-between">
      <div className="contact-info d-flex align-items-center">
      <MDBIcon icon='at' fas /> <a href={"mailto:"+data.email} className="email">{data.email}</a>
      </div>
      <div className="social-links d-none d-md-block">
        <a href={data.tweeter} className="twitter"><MDBIcon icon='twitter' fab /></a>
        <a href={data.facebook} className="facebook"><MDBIcon icon='facebook' fab /></a>
        <a href={data.instagram} className="instagram"><MDBIcon icon='instagram' fab /></a>
        <a href={data.whatsapp} className="linkedin"><MDBIcon icon='whatsapp' fab /></a>
      </div>
      </div>
    
  </section>
        <header className="sticky-top ">
        <MDBNavbar  expand='lg' bgColor="primary"  dark className="l_nav">
          <MDBContainer container>
            <MDBNavbarBrand href='#'><img src="./logo.png" className="logo"/><b>Tested ECU Solutions</b> 
        </MDBNavbarBrand>
    
            <MDBNavbarToggler
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setShowBasic(!showBasic)}
            >
              <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
    
            <MDBCollapse navbar show={showBasic}>
              <MDBNavbarNav className='justify-content-end'>
                <MDBNavbarItem>
                  <MDBNavbarLink className={props.page == 'Home'? "active nav_link": "text-white nav_link"}  href='/'>
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink  className={props.page == 'ECU'? "active nav_link": "text-white nav_link"} href='/file'>ECU FILES</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink className={props.page == 'TUNING'? "active nav_link": "text-white nav_link"} href='/tuning'>TUNING FILES</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink className={props.page == 'How'? "active nav_link": "text-white nav_link"} href='/faq'>How to?</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink className={props.page == 'about'? "active nav_link": "text-white nav_link"} href='/about'>About US</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink className={props.page == 'Contact'? "active nav_link": "text-white nav_link"} href='/contact'>Contact US</MDBNavbarLink>
                </MDBNavbarItem>
              
    
                
    
               
              </MDBNavbarNav>
    
              
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        
        </header>
   
    </>)
}