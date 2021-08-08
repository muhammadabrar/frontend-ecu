
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { WaveLoading } from 'react-loadingg';


export default function Contacts(props) {
  const [data, setData] = useState([]);

  //loading states
  //err states
  const [datacreationErr, setdatacreationErr] = useState(false);
  const [datacreationSuccess, setdatacreationSuccess] = useState(false);

  //IS states
  const [IsAdd, setIsAdd] = useState(false);
  const [refresh, setrefresh] = useState(1);
  const [id, setid] = useState(false);


  //inputs states
  const [input_F, setinput_F] = useState();
  const [input_W, setinput_W] = useState();
  const [input_E, setinput_E] = useState();
  const [input_I, setinput_I] = useState();
  const [input_T, setinput_T] = useState();







  //get option for inputs
  useEffect(() => {
    const contacts = async () => {
      const req = await axios.get(`${process.env.NEXT_PUBLIC_API}contact/`)
        .then(res => {
          setData(res.data.contact)
          setid(res.data.contact.id)
          setinput_F(res.data.contact.facebook)
          setinput_W(res.data.contact.whatsapp)
          setinput_E(res.data.contact.email)
          setinput_I(res.data.contact.insta)
          setinput_T(res.data.contact.tweeter)
        }).catch(err => {
          // what now?

          console.log("get contact error");
          console.log(err);
        })
    }
    contacts()
  }, [refresh]);





  const createfile = async (event) => {

    event.preventDefault();
    const data = {
      f: input_F,
      w: input_W,
      e: input_E,
      i: input_I,
      t: input_T,
    }

    const req = axios.put(`${process.env.NEXT_PUBLIC_API}contact/${id}`, { data })
      .then(res => {
        console.log(res)
        if (res) {
          setIsAdd(false)
          setdatacreationSuccess(true)
          setdatacreationErr(false)
          setrefresh(old => old + 1)
          setIsAdd(false)
          setTimeout(() => {
            setdatacreationSuccess(false)
          }, 10000);

        } else {
          setdatacreationSuccess(false)
          setdatacreationErr(true)
          setTimeout(() => {
            setdatacreationErr(false)
          }, 10000);
        }
      }).catch(err => {
        // what now?

        console.log("save faq error");
        console.log(err);
      })
  }


  return (



    <>
      <div className="table-title mt-3">
        <h4 className="text-title ">Contacts </h4>
        {/*model inputs*/}

        <button className="btn btn-sm btn-warning" onClick={() => setIsAdd(!IsAdd)}><><i className="fas fa-edit"></i> </></button>

      </div>
      {datacreationSuccess && <p className="text-success">contacts updated</p>}
      <MDBListGroup style={{ minWidth: '22rem' }} className="mt-3 mb-3">

        <MDBListGroupItem><i class="fas fa-envelope"></i> {input_E}</MDBListGroupItem>
        <MDBListGroupItem><i class="fab fa-facebook"></i> {input_F}</MDBListGroupItem>
        <MDBListGroupItem><i class="fab fa-whatsapp"></i> {input_W}</MDBListGroupItem>
        <MDBListGroupItem><i class="fab fa-instagram"></i> {input_I}</MDBListGroupItem>
        <MDBListGroupItem><i class="fab fa-twitter"></i> {input_T}</MDBListGroupItem>
      </MDBListGroup>
      {IsAdd && <form onSubmit={createfile} className="form mb-5">
        <h2>Edit</h2>
        <div className="row">



          <div className="col-md-12 form-group mt-3 ">
            <label>Email</label>
            <input type="email"
              value={input_E}
              onChange={(e) => setinput_E(e.target.value)}
              className="form-control" placeholder="Enter Question" required />
          </div>


          <div className="col-md-12 form-group mt-3 ">
            <label>WhatsApp</label>

            <input
              value={input_W}
              onChange={(e) => setinput_W(e.target.value)}
              className="form-control" placeholder="Enter Answer" required />
          </div>
          <div className="col-md-12 form-group mt-3 ">
            <label>Facebook</label>

            <input
              value={input_F}
              onChange={(e) => setinput_F(e.target.value)}
              className="form-control" placeholder="Enter Answer" required />
          </div>
          <div className="col-md-12 form-group mt-3 ">
            <label>Insta</label>

            <input
              value={input_I}
              onChange={(e) => setinput_I(e.target.value)}
              className="form-control" placeholder="Enter Answer" required />
          </div>
          <div className="col-md-12 form-group mt-3 ">
            <label>Tweeter</label>

            <input
              value={input_T}
              onChange={(e) => setinput_T(e.target.value)}
              className="form-control" placeholder="Enter Answer" required />
          </div>
        </div>



        <div className="text-center mt-3"><button type="submit" >Add</button></div>
      </form>

      }

    </>





  )
}
