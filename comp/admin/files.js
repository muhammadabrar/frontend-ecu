import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import {MDBInputGroup, MDBInputGroupElement, MDBBtn, } from 'mdb-react-ui-kit';
import axios from 'axios';
import { DisappearedLoading } from 'react-loadingg';
import Addfile from './addfile'
import EditFile from './editfile';

export default function Files(props) {
  // data
  const [data, setdata] = useState([]);
  const [refreshdata, setrefreshdata] = useState('');
  const [Title, setTitle] = useState("Lattest added");

  //search states
  const [Isdata, setIsdata] = useState(true);
  const [Isdelete, setIsdelete] = useState(false);

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
const deleteFile = async (id)=>{
    const req = await axios.delete(`${process.env.NEXT_PUBLIC_API}deletefile/${id}`)
    .then(res => {
      setrefreshdata(oldKey => oldKey + 1)

      if(res.data.err){
      setrefreshdata(oldKey => oldKey + 1)
      }else{
        setIsdelete(true)
        setrefreshdata(oldKey => oldKey + 1)
    }
    })
}
const downloadfile = async (name)=>{
  await axios.get(`${process.env.NEXT_PUBLIC_API}downloadfile/${name}`)
  
}


const refresh=()=>{
  console.log("refreesasadas")
  setrefreshdata(oldKey => oldKey + 1)
}

  return (
  <section className=" pt-5" id="file">
    <>
     
   <div className="table-title">
   <h4 className="text-title mt-1">Files </h4>
   {/*model inputs*/}

   <button  className="btn btn-sm btn-light"><a href="#addfile"><i className="fas fa-plus"></i> Add File</a></button>

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
            <h2> Lattest added </h2>
          </div>
          <div className="align-right ">
            <div className="search">
              <MDBInputGroup>

                <MDBInputGroupElement className="form-control" onChange={getsearchdata} style={{ borderRadius: "0px", borderColor: "#000" }} placeholder="Search by HW or SW number:" type='text' />
                
              </MDBInputGroup>
            </div>
          </div>
        </div>
        {Isdelete && <p className="text-warning">File deleted</p>}
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
          <th >Edit</th>
          <th >Delete</th>
          <th >Download</th>

        </tr>
        
        {data.map((data, index)=>
            <tr key={index + 1}>
              <td>{index +1}</td>
              <td>{data.make} {data.model}</td>
              <td>{data.engine}</td>
              <td>{data.power}	</td>
              <td>{data.hw}	</td>
              <td>{data.sw}	</td>
              <td>{data.ecu}	</td>
              <td>{data.Tool_read}</td>
              <td>{data.size}</td>
              <td>{data.price} €</td>
              <td className="m-0"><a href={"/admin/edit/"+data.id}><button className="btn btn-sm bg-warning btn-dark"><i className="fas fa-edit" aria-hidden="true"></i></button></a></td>
              <td className="m-0"><a href="#" onClick={()=> deleteFile(data.id)}><button className="btn btn-sm bg-warning btn-dark"><i className="fas fa-trash-alt" aria-hidden="true"></i></button></a></td>
              <td className="m-0"><a href="#" onClick={()=> downloadfile(data.id)}><button className="btn btn-sm bg-warning btn-dark"><i className="fas fa-download" aria-hidden="true"></i></button></a></td>
            </tr>
        )
        }
    
        
</table>}

        </div>
      </div>
      <div className="col-md-8 p-5 justify-content-center bg-ligth" id="addfile">
   <Addfile refresh={refresh} />
   </div>
    </>

  </section>
  )
}
