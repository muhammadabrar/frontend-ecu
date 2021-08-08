import React from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBadge,
  MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBDropdownMenu
} from 'mdb-react-ui-kit';

export default function NavTop() {
  return (
    <>
      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer >
          <MDBNavbarNav className="justify-content-end" >
            <div class="avater-dropdown">
              <img src="./avater.jpg" alt="Avatar" className="nav-avatar" />
              <div class="avater-dropdown-content">
                <ul class="dropdown-list-items">
                  <li><a href="/admin/users"><i class="fas fa-user"></i>User</a></li>
                  <li><a href="/admin/setting"><i class="fas fa-cog"></i>Settings</a></li>
                  <li><a href="/admin/login"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
                </ul>
              </div>
            </div>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
      

    </>
  );
}