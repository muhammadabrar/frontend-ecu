import { MDBIcon, MDBContainer, MDBCheckbox, MDBInputGroup, MDBInputGroupElement, MDBBtn, } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import Pay from './pay'
export default function TfNext(props) {
  const router = useRouter()

  var today = new Date()

var fulldate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const [tuningfiles, settuningfiles] = useState(props.selecteditem);
  const [price, setprice] = useState(props.price);
  //err states
  const [datacreationSuccess, setdatacreationSuccess] = useState(false);
  const [progresssbar, setprogresssbar] = useState(0);
  const [Isprogresssbar, setIsprogresssbar] = useState(false);

  //search states
  const [Ismake, setIsmake] = useState(true);
  const [Isfileuploaded, setIsfileuploaded] = useState(false);


  //inputs states
  const [input_file, setinput_file] = useState();
  const [input_size, setinput_size] = useState();
  const [input_fileName, setinput_fileName] = useState();
  const [input_notes, setinput_notes] = useState();
  const [input_name, setinput_name] = useState();
  const [input_email, setinput_email] = useState();
  const [id, setid] = useState();


  //datalist



  useEffect(() => {


  }, []);

  const onChangeHandler = async (event) => {
    if (!event.target.files[0]) {
      event.target.files = null
    } else {
      setinput_file(event.target.files[0])
      setinput_fileName(event.target.files[0].name)

      const size = event.target.files[0].size / 1024
      if (size >= 1024) {
        setinput_size(size / 1024 + "MB")
        event.target.files = null

      } else {
        setinput_size(size + "KB")
      }
    }

  }

  const order = async(event)=>{
    event.preventDefault();

    if(input_file){
    const data = {
      size: input_size,
      des: input_notes,
      fileName: input_fileName,
      name: input_name,
      email: input_email,
      tuningfiles: tuningfiles,
      price: price
    }
    const newFile = new File([input_file], fulldate+"_"+input_name+"_"+input_file.name, { type: input_file.type, lastModified: Date.now()})

    const file = new FormData()
    file.append('file', newFile) 
  
    await axios.post(`${process.env.NEXT_PUBLIC_API}upload_tuningfile`, file, {// receive two parameter endpoint url ,form data 
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: ProgressEvent => {
      setIsprogresssbar(true)
      setprogresssbar(ProgressEvent.loaded / ProgressEvent.total*100)
    }    
    })
        .then(res => { // then print response status
          console.log(res)
        })
        const req = axios.post(`${process.env.NEXT_PUBLIC_API}sendOrder`, {data})
            .then(res => {
              console.log(res)
              if(res){  
              setIsprogresssbar(false)
              setdatacreationSuccess(true)
              setdatacreationErr(false)
              setid(res.data.order.id)
  
            }else{
              setIsprogresssbar(false)
              setdatacreationSuccess(false)
              setdatacreationErr(true)
              setTimeout(() => {
                setdatacreationErr(false)
              }, 10000);
            }
            }).catch(err => {
              // what now?
        
              console.log("saving tuningfile file error");
              console.log(err);
          })
        }
  
  }
  

  return (<>



    {datacreationSuccess? <Pay price={price} id={id} email={input_email} /> : <section className="faq">

      <div className="section-title">
        <h2>Fill This Form</h2>
      </div>
      <MDBContainer >

        {Isprogresssbar && <progress value={progresssbar} max="100"> {progresssbar}% </progress>}


        <form onSubmit={(event)=> order(event)} className="form">
          <h2>Place Your Order</h2>
          <div className="row">

            <div className="col-md-12 form-group Inputfile" >
            <label>Upload original ECU bin file </label>

              <div className="file_text" >
                {Isfileuploaded ? 
                <> {input_fileName} </>:
                <h4>drag and drop your file here</h4>}
                </div>
              <input class="form-control form-control"
                onChange={onChangeHandler} type="file"  style={{ height: "300px" }} filename={''} required />
              <small>no backup! no encrypted files! ** ORIGINAL BIN FILES ONLY ** if mod, upload ori too (upload both files in zip)
              </small>
            </div>
            
            <div className="col-md-12 form-group mt-3 ">
              <label>car brand, ecu models and your notes </label> 

              <textarea type="text"
                value={input_notes}
                onChange={(e) => setinput_notes(e.target.value)}
                className="form-control" placeholder="write some notes about your car (car brand, ecu models and your notes)" required />
            </div>

            <div className="col-md-12 form-group mt-3 ">
              <label>your E-mail address </label>

              <input type="email"
                value={input_email}
                onChange={(e) => setinput_email(e.target.value)}
                className="form-control" list="model" placeholder="Enter Your Email" required />
            </div>

            <div className="col-md-12 form-group mt-3 ">
              <label>Your Name or Company name </label>

              <input type="text"
                value={input_name}
                onChange={(e) => setinput_name(e.target.value)}
                className="form-control" list="engine" placeholder="Enter Your Name or Company Name" required />
            </div>


          </div>



          <div className="text-center mt-3"><button type="submit" >Next <i class="fas fa-chevron-right"></i></button></div>
        </form>



      </MDBContainer>

    </section>}



  </>)
}





