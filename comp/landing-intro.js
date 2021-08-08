import {MDBIcon} from 'mdb-react-ui-kit';

export default function Intro(props) {
   return( <div className="landing-page" >
    <div className="bg" style={{ backgroundImage: "url('./l-bg.jpg')"}} ></div>
        <div className="page-content" >
          <h1>ONLINE SERVICE FOR CUSTOM TUNING FILES</h1>
          <p>
          Tested-ECU Solutions is supplier of high quality custom remapped tuning software files for almost all the popular petrol and diesel vehicles.
          
          </p>
          <a className="call-to-action pl-2" id="testing" href="#">ECU files</a>
          <a className="call-to-action" href="#">tuning files</a>
       
          
        </div>
        <a href="#services" className="scroll-down-btn ">
          <MDBIcon fas icon='angle-double-down' />
        </a>
        
      </div>)
}