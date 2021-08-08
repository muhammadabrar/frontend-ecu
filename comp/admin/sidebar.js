import {MDBIcon, MDBContainer,MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBCardFooter, MDBCardHeader, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn} from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
export default function Sidebar(props) {
const [title, settitle] = useState("loading..")
   const router = useRouter()
   // useEffect(() => {
   //    const verify = async()=>{
   //      const req = await axios.get(`${process.env.NEXT_PUBLIC_API}verifyAuth`)
   //      .then(res => {
   //          if(res.data.user){
   //            if(res.data.user.id == auth){
   //             settitle(res.data.user.name)
   //              console.log("your are in")
   //            }else{
   //            router.push(`/admin/login`)
   //          }
   //          }
   //        console.log(res.data);
   //      })
   //    }
   //    verify()
   //  }, []);

   const logout = async()=>{
      const req = await axios.get(`${process.env.NEXT_PUBLIC_API}logout`)
      .then(res => {
         router.push(`/admin/login`)
      })
    }

   return( 
 <>
 <div class="wrapper">
                <input type="checkbox" id="btn" hidden />
         <label for="btn" class="menu-btn">
         <i class="fas fa-bars"></i>
         <i class="fas fa-times"></i>
         </label>
         <nav id="sidebar">
            <div class="title">
               Menu
            </div>
            <ul class="list-items">
               <li><a href="/admin"><i class="fas fa-home"></i>DashBoard</a></li>
               <li><a href="/admin/files"><i class="fas fa-file-code"></i>ECU Files</a></li>
               <li><a href="/admin/Tuningfile"><i class="fas fa-user"></i>Tuning File</a></li>
               <li><a href="/admin/orders"><i class="fas fa-address-book"></i>Orders</a></li>
               <li><a href="/admin/site"><i class="fas fa-cog"></i>Site Manager</a></li>
               <li><a href="/admin/users"><i class="fas fa-user"></i>Users</a></li>
               
               <li><a href="#" onClick={()=>logout()}><i class="fas fa-stream"></i>Logout</a></li>
               
               
            </ul>
         </nav>
         </div>
         
</>
        
      )
}