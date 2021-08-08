import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBInputGroup, MDBInputGroupElement, MDBBtn, } from 'mdb-react-ui-kit';
import axios from 'axios';
import PayDownload from './pay&download';


export default function Files(props) {
// data
const [data, setdata] = useState([]);
const [refreshdata, setrefreshdata] = useState('');
const [Title, setTitle] = useState("Lattest added");

//search states
const [Isdata, setIsdata] = useState(true);
//inputs states
const [search_model, setsearch_model] = useState();
const [search_make, setsearch_make] = useState();
const [search_engine, setsearch_engine] = useState();


//datalist
const [options_engine, setinput_options_engine] = useState([]);
const [options_make, setoptions_make] = useState([]);
const [options_model, setoptions_model] = useState([]);

 //push models
 let models = [];
 let makes = [];
 let engine = [];


 if(options_make.length > 0){
   for(var i=0; i<options_make.length; i++){
    makes.push({value: options_make[i].make, label:options_make[i].make})
  }
 }
 if(options_model.length > 0){
  for(var i=0; i<options_model.length; i++){
  models.push({value: options_model[i].model, label:options_model[i].model})
 }
}
if(options_engine.length > 0){
  for(var i=0; i<options_engine.length; i++){
    engine.push({value: options_engine[i].engine, label:options_engine[i].engine})
 }
}




  //get option for search
  useEffect(() => {
    const getinputoptions = async()=>{
      const req = await axios.get(`${process.env.NEXT_PUBLIC_API}make/`)
      .then(res => {
        setoptions_make(res.data.make)
      })
    }
    const getdata = async()=>{
      const req = await axios.get(`${process.env.NEXT_PUBLIC_API}files/`)
      .then(res => {
        setdata(res.data.data)
        setIsdata(false)
    setTitle("Lattest added")

      })
    }
    getinputoptions()
    getdata()
    console.log("refreshdata")
}, [refreshdata]);



//get makes
const getmodel = async (e)=>{
setsearch_make(e.value)
const req = await axios.get(`${process.env.NEXT_PUBLIC_API}model/${e.value}`)
      .then(res => {
        setoptions_model(res.data.model)
      })
}
const getengine = async (e)=>{
setsearch_model(e.value)
const req = await axios.get(`${process.env.NEXT_PUBLIC_API}engine/${search_make}/${e.value}`)
      .then(res => {
        setinput_options_engine(res.data.engine)
      })
}
const getdata = async (e)=>{
setsearch_engine(e.value)
const req = await axios.get(`${process.env.NEXT_PUBLIC_API}files/${search_make}/${search_model}/${e.value}`)
      .then(res => {
        setdata(res.data.data)
    setTitle("Filter Data")

      })
}
const getsearchdata = async (e)=>{
if(e.target.value){
  const req = await axios.get(`${process.env.NEXT_PUBLIC_API}search/${e.target.value}`)
  .then(res => {
    if(res.data.err){
    setrefreshdata(oldKey => oldKey + 1)

      console.log("there are no files")
    }else{
    setdata(res.data.result)
    setTitle("Search Result of "+e.target.value)
  }
  })
}else{
  setrefreshdata(oldKey => oldKey + 1)

}

}


  return (<section className="files pt-5" >
    <MDBContainer>
      <div className="section-title">
        <span>Original ECU files</span>
        <h2>Original ECU files</h2>
        <p>Find original ECU file by make, model and engine or HW and SW number</p>
      </div>


      <div className='select-car mt-3 '>
          <div className="select-car-item">
            <label className="seletion-label">Choose Make</label>

            <Select
              label="Single select"
              options={makes}
              onChange={getmodel}


              theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: 'orange',
                  primary: 'black',
                },
              })}
            />
          </div>
          <div className="select-car-item">
            <label className="seletion-label">Choose Model</label>


            <Select
              label="Single select"
              options={models}
              onChange={getengine}
              

              theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: 'orange',
                  primary: 'black',
                },
              })}
            />
          </div>
          <div className="select-car-item">
            <label className="seletion-label">Choose Engine</label>

            <Select
              label="Single select"
              options={engine}
              onChange={getdata}
              theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: 'orange',
                  primary: 'black',
                },
              })}
            />
          </div>
          
        </div>





   
      <div>
        <div className="about-table">
          <div className="align-right text-black">
            <h2> {Title} </h2>
          </div>
          <div className="align-right ">
            <div className="search">
              <MDBInputGroup>
                <MDBInputGroupElement className="form-control " onChange={getsearchdata} style={{ borderRadius: "0px", borderColor: "#000" }} placeholder="Search by HW or SW number:" type='text' />
              </MDBInputGroup>
            </div>
          </div>
        </div>
        <div className=" overflow-auto">
        {Isdata? <div><h1>there are zero files yet</h1></div>: 
        <table className="table " >

        <tr className="bg-primary">
          <th >#</th>
          <th >Make and model</th>
          <th >Engine</th>
          <th >Power</th>
          <th >HW</th>
          <th >SW</th>
          <th >ECU</th>
          <th >Tool Read</th>
          <th >Size</th>
          <th >Price</th>
          <th >Download</th>
        </tr>
        
        {data.map((data, index)=>
            <tr key={data.id}>
              <td>{index +1}</td>
              <td>{data.make} {data.model}</td>
              <td>{data.engine}</td>
              <td>{data.power}	</td>
              <td>{data.hw}	</td>
              <td>{data.sw}	</td>
              <td>{data.ecu}	</td>
              <td>{data.Tool_read}</td>
              <td>{data.size}</td>
              <td>{data.price} $</td>
              <td className="m-0"><PayDownload id={data.id} total={data.price} /></td>
            </tr>
        )
        }
    
        
</table>}
        </div>
      </div>
    </MDBContainer>

  </section>
  )
}
