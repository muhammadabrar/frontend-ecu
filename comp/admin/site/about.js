
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WaveLoading } from 'react-loadingg';


export default function About(props) {

  //loading states
  //err states
  const [datacreationErr, setdatacreationErr] = useState(false);
  const [datacreationSuccess, setdatacreationSuccess] = useState(false);
  const [Isimage, setIsimage] = useState(false);
  const [progresssbar, setprogresssbar] = useState(0);
  const [Isprogresssbar, setIsprogresssbar] = useState(false);
  const [id, setid] = useState(1);
const [refresh, setrefresh] = useState(1);

  const [Isedit, setIsedit] = useState(false);


  //inputs states
  const [input_p, setinput_p] = useState();
  const [input_p2, setinput_p2] = useState();
  const [input_title, setinput_title] = useState();
  const [image, setimage] = useState();//file
  const [input_image, setinput_image] = useState();
  
  //datalist
  const [data, setdata] = useState([]);




  //get option for inputs
    useEffect(() => {
      const getdata = async()=>{
        const req = await axios.get(`${process.env.NEXT_PUBLIC_API}about/`)
        .then(res => {
            setdata(res.data.about)
            setinput_p (res.data.about.p)
            setinput_p2 (res.data.about.p2)
            setinput_title (res.data.about.title)
            setid(res.data.about.id)
        })
      }
      getdata()
  }, [refresh]);

  console.log(data)

  const imagehandler = async (event)=>{
    if(!event.target.files[0]){
     event.target.files = null
    }else{
        setimage(event.target.files[0])
        setinput_image(event.target.files[0].name)
 }
 
 }


const createfile = async(event)=>{
  event.preventDefault();

    if(input_image){
  const data = {
    p : input_p,
    title : input_title,
    p2 : input_p2,
    image : input_image,
  }
  const file = new FormData()

  file.append('file', image)
  await axios.post(`${process.env.NEXT_PUBLIC_API}upload_aboutimage`, file, { data,// receive two parameter endpoint url ,form data 
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

      const req = axios.put(`${process.env.NEXT_PUBLIC_API}about/${id}`, {data})
          .then(res => {
            console.log(res)
            if(res){
            setdatacreationSuccess(true)
            setdatacreationErr(false)
            setrefresh(old => old + 1)
            setIsedit(false);
            setTimeout(() => {
            setIsprogresssbar(false)

              setdatacreationSuccess(false)
            }, 10000);

          }else{
            setdatacreationSuccess(false)
            setdatacreationErr(true)
            setTimeout(() => {
              setdatacreationErr(false)
            }, 10000);
          }
          }).catch(err => {
            // what now?
      
            console.log("save file error");
            console.log(err);
        })
    }

}


  return (
  
    
     
    <>
<div className="table-title">
   <h4 className="text-title mt-1 ">About Content </h4>
   {/*model inputs*/}

   <button  className="btn btn-sm btn-warning" onClick={()=> setIsedit(!Isedit)}><><i className="fas fa-edit"></i> </></button>

</div>
{Isprogresssbar&& <progress value={progresssbar} max="100"> {progresssbar}% </progress>}

{datacreationErr && <p className="text-danger">some thing is wrong please try again!</p>}
            {datacreationSuccess && <p className="text-success">your data has been added!</p>}
<div className="row mt-3 ">
    <div className="col-md-6">
    <img src={"http://localhost:8000/images/"+data.image} className="about-image"/>
    </div>
    <div className="col-md-6">
    <h4 className="">{data.title}</h4>
        <p>{data.p}</p>
        <p>{data.p2}</p>
    </div>

</div>
       

        
           
           
        {Isedit && <form onSubmit={createfile} className="form mb-5">
        <h2>Edit</h2>
            <div className="row">
            <div className="col-md-12 form-group Inputfile" >
                <h4 className="file_text" >drag and drop your onl Image here</h4>
            <input class="form-control form-control"
                type="file" onChange={imagehandler} accept="image/png, image/gif, image/jpeg" style={{height: "150px"}} filename={''}  required/><br></br>
            </div>
            
            
            
            <div className="col-md-12 form-group mt-3 ">
                <label>Title</label>
            <input type="text" 
            value={input_title} 
            onChange={(e)=> setinput_title(e.target.value)} 
            className="form-control" placeholder="Enter Title" required />
            </div>
            
            
            <div className="col-md-12 form-group mt-3 ">
            <label>paragraph 1</label>

            <textarea
            value={input_p} 
            onChange={(e)=> setinput_p(e.target.value)} 
            className="form-control" placeholder="Enter Price" required />
            </div>
            <div className="col-md-12 form-group mt-3 ">
            <label>paragraph 2</label>
            <textarea 
            value={input_p2} 
            onChange={(e)=> setinput_p2(e.target.value)} 
            className="form-control" list="cat" placeholder="Enter cat" required />
            </div>
            
            </div>
            
            
            
            <div className="text-center mt-3"><button type="submit" >Add</button></div>
        </form>
        
}
   {/*model inputs*/}
    
    </>
    

 

  
  )
}
