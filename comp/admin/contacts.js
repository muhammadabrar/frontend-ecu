import {MDBContainer,MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBTable, MDBTableHead, MDBTableBody} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Contacts(props) {
  const [data, setdata] = useState([]);
  const [displaydata, setdisplaydata] = useState('today');

  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //get msgs 
    useEffect(() => {
      const getmsgs = async()=>{
        const req = await axios.get(`${process.env.NEXT_PUBLIC_API}msgs/${displaydata}`)
        .then(res => {
          setdata(res.data.data)
            
        })
      }
      getmsgs()
  }, [displaydata]);
   return( 
   <>
   <div className="table-title">
   <h4 className="text-title">Contacts </h4>
   <MDBDropdown>
      <MDBDropdownToggle color='light' className="btn btn-sm ">{displaydata}</MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem>
          <MDBDropdownLink  onClick={()=> setdisplaydata('today')}>today</MDBDropdownLink>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <MDBDropdownLink  onClick={()=> setdisplaydata('month')}>last Month</MDBDropdownLink>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <MDBDropdownLink  onClick={()=> setdisplaydata('all')}>All</MDBDropdownLink>
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
    </div>
    <div className=" overflow-auto">
<table className="table">
  <tr className="bg-info">
    <th>#</th>
    <th>Name</th>
    <th>Email</th>
    <th>Date</th>
    <th>Subject</th>
    <th>Message</th>



  </tr>
{data.map((data, index)=>
<tr>
  <td>{index + 1}</td>
  <td>{data.name}</td>
  <td><a href ={`mailto:${data.email}`}>{data.email}</a></td>
  <td>{days[data.day]}, {data.date} {months[data.month]} {data.year}</td>
  <td>{data.subject}</td>
  <td><button className="btn btn-sm text-white bg-info"><a href={"/admin/contact/"+data.id}><i className="fas fa-envelope"></i> Detail</a></button>
</td>

</tr>)}
  
</table>
</div>
 </>
      )
}