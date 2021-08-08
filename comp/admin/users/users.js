import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {MDBContainer,
        MDBBtn,} from 'mdb-react-ui-kit';
export default function User(props) {
  const [data, setdata] = useState([]);
    const [basicModal, setBasicModal] = useState(false);
    const [showPass, setshowPass] = useState(false);
    const [showdeletemsg, setshowdeletemsg] = useState(false);

    const [Name, setName] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [refresh, setrefresh] = useState();


    const [confirmPassmsg, setConfirmPassmsg] = useState(false);

    useEffect(() => {
      const msg = async()=>{
        const req = await axios.get(`${process.env.NEXT_PUBLIC_API}users`)
        .then(res => {
            setdata(res.data.user)
        }).catch(err => {
            // what now?
      
            console.log("get user error");
            console.log(err);
        })
      }
     
      msg()
      
  }, [refresh]);
  const toggleShow = () => setBasicModal(true);
  const toggleClose = () => setBasicModal(false);
  
  const checkpass = (e) =>{
    setConfirmPass(e.target.value)
    if (pass == confirmPass){
        setConfirmPassmsg(false)
        console.log(confirmPass)
    }else{
        setConfirmPassmsg(true)
        console.log(confirmPass)

    }
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: Name,
      email: email,
      pass: pass
    };
    const req = await axios.post(`http://localhost:8000/user`, {data})
      .then(res => {
        console.log(res);
        setrefresh(old => old + 1)
      })
  }

const deleteUser = async(id)=>{
  const req = await axios.delete(`http://localhost:8000/deleteUser/${id}`)
  .then(res => {
    if(res.data.success){
      setshowdeletemsg(true)
      setrefresh(old => old + 1)

    }
    setTimeout(() => {
      setshowdeletemsg(false)
    }, 10000);
  })
}



   return( 
   <MDBContainer>
   <div className="table-title mt-5 pt-5">
   <h4 className="text-title">Users </h4>
   <MDBBtn size='sm' onClick={toggleShow} className='text-dark mb-1' color='light'><i className="fas fa-plus"></i> Add</MDBBtn>
  
  

    </div>
    {showdeletemsg && <p className="text-danger p-4">User has been deleted</p>}
    <div className=" overflow-auto">
<table className="table">
  <tr className="bg-info">
    <th>#</th>
    <th>Name</th>
    <th>Email</th>
    <th>delete</th>
  </tr>

  {data.map((data, index)=>
  <tr>
  <td>1</td>
  <td>{data.name}</td>
  <td>{data.email}</td>
  <td className="m-0"><a href="#" onClick={()=> deleteUser(data.id)}><button className="btn btn-sm bg-danger btn-dark"><i className="fas fa-trash-alt" aria-hidden="true"></i></button></a></td>


</tr>
  
  )}
  
 
</table>
</div>
{basicModal? <div className="model">
        <div className="model-content">
        
            <div className="model-header ">
            
            <h1>warka dang</h1>
<a onClick={toggleClose} href="#" className="close-icon "><i class="fa fa-close"></i></a>
            </div>
            
            <form onSubmit={handleSubmit}  className="form">
              <div className="row">
                <div className="col-md-12 form-group">
                  <input type="text" name="name" value={Name} onChange={(e)=> setName(e.target.value)} className="form-control" id="name" placeholder="Name" required />
                </div>
                <div className="col-md-12 form-group mt-3 ">
                  <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)} name="email" id="email" placeholder="Email" required />
                </div>
                <div className="col-md-12 form-group mt-3 ">
                  <input type={showPass? "text":"password"} value={pass} onChange={(e)=> setPass(e.target.value)} className="form-control" name="Password" id="Password" placeholder="Password" required />
                  <input type="checkbox" onClick={()=> setshowPass(!showPass)} />Show Password
                </div>
                <div className="col-md-12 form-group mt-3 ">
                  <input type={showPass? "text":"password"} value={confirmPass} onChange={checkpass} className={confirmPassmsg? "form-control text-danger": "form-control"} name="Password" id="Password" placeholder="Confirm Password" required />
                  
                </div>
              </div>
              
              
              
              <div className="text-center mt-3"><button type="submit" disabled={confirmPassmsg}>Send Message</button></div>
            </form>
            

        </div>
    </div>: null}

 </MDBContainer>
      )
}