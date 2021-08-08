import AddTuningfile from './addtuningfile'
import EditTuningfile from './edittuningfile'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {MDBContainer,MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBTable, MDBTableHead, MDBTableBody} from 'mdb-react-ui-kit';

export default function TuningFiles(props) {
  const [cats, setcats] = useState([]);
  const [tuningfiles, settuningfiles] = useState([]);
  const [seletedtuningfiles, setseletedtuningfiles] = useState([]);
const [form, setform] = useState('');
  const [refreshdata, setrefreshdata] = useState('');

  const [seletedcat, setseletedcat] = useState('');
  const [seletedid, setseletedid] = useState('');
  const [editid, seteditid] = useState('');
  const [Isdelete, setIsdelete] = useState(false);




    useEffect(() => {
        const getcat = async()=>{
          const req = await axios.get(`${process.env.NEXT_PUBLIC_API}getcats/`)
          .then(res => {
              setcats(res.data.cat)
              settuningfiles(res.data.tuningfiles)
              setseletedcat(res.data.cat[0].cat)
              setseletedid(res.data.cat[0].id)
              setseletedtuningfiles(res.data.firsttuningfiles)
          })
        }
        getcat()
    }, [refreshdata]);
    const selectcat=(id, cat)=>{
        setseletedcat(cat)
        setseletedid(id)
        const filter = tuningfiles.filter(tuningfile => tuningfile.cat_id == id)
        setseletedtuningfiles(filter)
      }

    const deleteFile= async (id)=>{
      const req = await axios.delete(`${process.env.NEXT_PUBLIC_API}edittuningfile/${id}`)
      .then(res => {
        if(res.data.err){
          setrefreshdata(oldKey => oldKey + 1)
          }else{
            setIsdelete(true)
            setrefreshdata(oldKey => oldKey + 1)
        }
      })
    }
    const refresh=()=>{
        setrefreshdata(oldKey => oldKey + 1)
      }
    return( 
   <>
   <div className="table-title mb-1 pb-1">
   <h4 className="text-title mb-1 pb-1">Tuning Files </h4>
   <MDBDropdown>
      <MDBDropdownToggle color='light' className="btn btn-sm ">{seletedcat}</MDBDropdownToggle>
      <MDBDropdownMenu>
        {cats.map((cat, index)=>
        <MDBDropdownItem key={index}>
          <MDBDropdownLink href="#" onClick={()=> selectcat(cat.id, cat.cat) }>{cat.cat}</MDBDropdownLink>
        </MDBDropdownItem>)}
        
      </MDBDropdownMenu>
    </MDBDropdown>
    </div>
    <div className="row">
        <div className="col-md-7">
        <div className=" overflow-auto">
        {Isdelete && <p className="text-danger">File deleted</p>}

<table className="table">
  <tr className="bg-info">
    <th>#</th>
    <th>Title</th>
    <th>Price</th>
    <th>edit</th>
    <th>delete</th>
  </tr>
{ seletedtuningfiles.map((data, index)=> <tr>
    <td>{index + 1}</td>
    <td>{data.title}</td>
    <td>{data.price} €</td>
    <td className="m-0"><a href={`/admin/edittuningfile/${data.id}`} ><button className="btn btn-sm bg-warning btn-dark"><i className="fas fa-edit" aria-hidden="true"></i></button></a></td>
    <td className="m-0"><a href="#" onClick={()=> deleteFile(data.id)}><button className="btn btn-sm bg-danger btn-dark"><i className="fas fa-trash-alt" aria-hidden="true"></i></button></a></td>
              

  </tr>)}

</table>
</div>
        </div>
        <div className="col-md-5">
            
            <AddTuningfile refresh={refresh}/>
        </div>

    </div>
    
 </>
      )
}