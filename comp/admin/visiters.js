import {MDBContainer,MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBTable, MDBTableHead, MDBTableBody} from 'mdb-react-ui-kit';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Todos(props) {
const [data, setdata] =useState([])
const [label, setlabel] =useState('This Week')
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let datalist=[]
  useEffect(() => {
    const visiters = async()=>{
      const req = await axios.get(`${process.env.NEXT_PUBLIC_API}visiter/${label}`)
      .then(res => {
        setdata(res.data.data);
      })
    }
    visiters()
  }, [label]);



   return( 
   <>
   <div className="table-title">
   <h4 className="text-title">Visiter </h4>
   <MDBDropdown>
      <MDBDropdownToggle color='light' className="btn btn-sm ">{label}</MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem>
          <MDBDropdownLink href="#!" onClick={()=> setlabel('This Week')}>This Week</MDBDropdownLink>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <MDBDropdownLink href="#!" onClick={()=> setlabel('This Month')}>This Month</MDBDropdownLink>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <MDBDropdownLink href="#!" onClick={()=> setlabel('This Year')}>This Year</MDBDropdownLink>
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
    </div>
    <ResponsiveContainer width="100%" height={200} className="earning-chart">
          <AreaChart
            width={400}
            height={200}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#39C0ED" stopOpacity={1} />
                  <stop offset="75%" stopColor="#39C0ED" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            <CartesianGrid opacity={0.3} />
            <XAxis dataKey={"date"} />
            <YAxis />
            <Tooltip content={<CustomTooltip />}/>
            <Area type="monotone" dataKey="_count.date" fill="url(#color)"/>
          </AreaChart>
        </ResponsiveContainer>
   </>
      )
}

const style = {
    borderRadius: "0.25rem",
    background: '#26313c',
    color: '#fff',
    padding: '5px',
    boxShadow: '15px 30px 40px 5px rgba(0, 0, 0, 0.5)',
    textAlign: 'left',
  }
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={style}>
          <p>{payload[0].value}</p>
  
        </div>
      );
    }
  
    return null;
  };