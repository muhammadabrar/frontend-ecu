import React from 'react';
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer } from 'mdb-react-ui-kit';
export default function breadcrumb() {
  return (
    <MDBContainer className="p-2">
    <nav className='navbar navbar-light'>
      <MDBContainer >
        <MDBBreadcrumb>
          <MDBBreadcrumbItem>
            <a href='/admin'>Admin</a>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem >
            <a >DashBoard</a>
          </MDBBreadcrumbItem>
        </MDBBreadcrumb>
      </MDBContainer>
    </nav>
    </MDBContainer>
  );
}