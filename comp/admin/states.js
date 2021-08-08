import {MDBContainer,MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBTable, MDBTableHead, MDBTableBody} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function States(props) {
  //states's states
  const [visiters, setvisiters] = useState(0);
  const [file, setfiles] = useState(0);
  const [orders, setorders] = useState(0);
  const [Earning, setEarning] = useState(0);
//btn states
const [fileTime, setfileTime] = useState('Today');
const [EarningTime, setEarningTime] = useState('Today');
const [visiterTime, setvisiterTime] = useState('Today');



//call by file
useEffect(() => {
  const fileState = async()=>{
    const req = await axios.get(`${process.env.NEXT_PUBLIC_API}fileState/${fileTime}`)
    .then(res => {
      setfiles(res.data.data)
    })
  }
  fileState()
}, [fileTime]);

//call by orders
useEffect(() => {
  const orderState = async()=>{
    const req = await axios.get(`${process.env.NEXT_PUBLIC_API}orderState`)
    .then(res => {
      setorders(res.data.data)
    })
  }
  orderState()
}, []);

//call by visiter
useEffect(() => {
  const visiterState = async()=>{
    const req = await axios.get(`${process.env.NEXT_PUBLIC_API}visiterState/${visiterTime}`)
    .then(res => {
      setvisiters(res.data.data)
    })
  }
  visiterState()
}, [visiterTime]);

//call by earn
useEffect(() => {
  const earnState = async()=>{
    const req = await axios.get(`${process.env.NEXT_PUBLIC_API}earnState/${EarningTime}`)
    .then(res => {
      setEarning(res.data.data._sum.earn)
    })
  }
  earnState()
}, [EarningTime]);

   return( 
   <MDBContainer>
   <div className="states_admin row mt-2">
     <div className="col-md-3">
     <div className="state_item">
         <h2 className="info"><i className="fas fa-file-code text-info"></i> {file}</h2>
         <p className="title text-black">Sold files</p>
         <MDBDropdown>
      <MDBDropdownToggle color='dark' className="btn-sm states_btn">{fileTime}</MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem>
          <MDBDropdownLink href="#" onClick={()=>setfileTime('Today')}>Today</MDBDropdownLink>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <MDBDropdownLink href="#" onClick={()=>setfileTime('This month')}>This Month</MDBDropdownLink>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <MDBDropdownLink href="#" onClick={()=>setfileTime('All time')}>All Time</MDBDropdownLink>
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
     </div>
     </div>


     <div className="col-md-3">
     <div className="state_item">
         <h2 className="info"><i className="fas fa-tasks text-danger"></i> {orders}</h2>
         <p className="title text-black">pending Order</p>
     </div>
     </div>



     <div className="col-md-3">
     <div className="state_item">
         <h2 className="info"><i className="fas fa-dollar-sign text-success"></i> {Earning}</h2>
         <p className="title text-black">Earning</p>
         <MDBDropdown>
      <MDBDropdownToggle color='dark' className="btn-sm states_btn">{EarningTime}</MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem>
          <MDBDropdownLink href="#" onClick={()=>setEarningTime('Today')}>Today</MDBDropdownLink>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <MDBDropdownLink href="#" onClick={()=>setEarningTime('This month')}>This Month</MDBDropdownLink>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <MDBDropdownLink href="#" onClick={()=>setEarningTime('All time')}>All Time</MDBDropdownLink>
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
     </div>
     </div>
     <div className="col-md-3">
     <div className="state_item">
         <h2 className="info"><i className="fas fa-eye text-secondary "></i>  {visiters}</h2>
         <p className="title text-black">Visiters</p>
         <MDBDropdown>
      <MDBDropdownToggle color='dark' className="btn-sm states_btn">{visiterTime}</MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem>
          <MDBDropdownLink href="#" onClick={()=>setvisiterTime('Today')}>Today</MDBDropdownLink>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <MDBDropdownLink href="#" onClick={()=>setvisiterTime('This month')}>Last Month</MDBDropdownLink>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <MDBDropdownLink href="#" onClick={()=>setvisiterTime('All time')}>All Time</MDBDropdownLink>
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
     </div>
     </div>

   </div>
 </MDBContainer>
        
      )
}