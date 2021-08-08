import {MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem} from 'mdb-react-ui-kit';

export default function Intro(props) {
   return( 
   <div className="other-page" >
    <div className="other-bg" style={{ backgroundImage: "url('./l-bg.jpg')"}} ></div>
        <div className="other-page-content" >
            <h1>{props.title}</h1>
            <h3>
        <MDBBreadcrumb className="text-light">
            {props.links.map((link)=>
            <>{link.active?<MDBBreadcrumbItem >{link.link}</MDBBreadcrumbItem>: <MDBBreadcrumbItem>
                <a className="text-light" href={link.url}>{link.link}</a>
              </MDBBreadcrumbItem>}
        </>
        )}
      </MDBBreadcrumb>
      </h3>
       
          
        </div>
      
      </div>)
}