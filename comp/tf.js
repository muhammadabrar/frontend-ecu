import {MDBIcon, MDBContainer, MDBCheckbox , MDBInputGroup, MDBInputGroupElement, MDBBtn,} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TfNext from './tfnext'
export default function Tf(props) {
  const [cats, setcats] = useState([]);
  const [tuningfiles, settuningfiles] = useState([]);
  const [price, setprice] = useState(0);
  const [items, setitems] = useState([]);
  const [selecteditem, setselecteditem] = useState([]);
  const [step2, setstep2] = useState(false);
  const [next, setnext] = useState(false);
  const [Iscat, setIscat] = useState();





console.log(price)
  useEffect(() => {
    const getcat = async()=>{
      const req = await axios.get(`${process.env.NEXT_PUBLIC_API}getcats/`)
      .then(res => {
          setcats(res.data.cat)
          settuningfiles(res.data.tuningfiles)
          setitems(res.data.tuningfiles.map((item)=>{
            return {
              select: false,
              id: item.id,
              cat_id: item.cat_id,
              title: item.title,
              price: item.price,

            }
          }))
      })
    }
    getcat()

}, []);
let i = 0;
let s = [];

useEffect(() => {
  if(items.length>0){
   const filter = items.filter(item=> item.select)
   setselecteditem([]);
   
   filter.map((item)=>{
    i = i +item.price
    setnext(true)
    setselecteditem(oldArray => [...oldArray, item]);
    setprice(i)
   })
   setprice(i)

  }

}, [items]);
function offon(ccat){
  setselecteditem([])
  setprice(0)
  setIscat(ccat)
  setnext(false)

  setitems(tuningfiles.map((item)=>{
    return {
      select: false,
      id: item.id,
      cat_id: item.cat_id,
      title: item.title,
      price: item.price,

    }
  }))
}

if(step2){
 return <TfNext selecteditem={selecteditem} price={price} />
}else{
   return( <>
   
   
  
    
<section className="faq">
<div className="section-title">
          <span>TUNE YOUR FILE</span>
          <h2>TUNE YOUR FILE</h2>
        </div>
           <MDBContainer >

{cats.map((cat, index)=>
<details key={cat.id}  onClick={() => offon(cat.cat)}>
<summary>{cat.cat}</summary>

{cat.cat == Iscat? <div class="faq__content">
<div className="row bg-white p-3 m-3">

{items.filter(file => file.cat_id == cat.id).map((file)=>
      <>
      <div className="col-md-3"><MDBCheckbox name='flexCheck' 
      value={file.price} 
      onChange={event => {
        let checked = event.target.checked;
        setitems(
          items.map(data => {
            if (file.id === data.id) {
              data.select = checked;
            }
            return data;
          })
        );
      }}
      checked={file.select}
      label={file.title + " " + "€. "+file.price} /></div>
      </>)}
      </div>

</div>
: ''}
</details>)}

<div className="row justify-content-end">
<div className="col-md-4  pt-0"> 
<div className="search">
<MDBInputGroup className='' >
  
  <MDBInputGroupElement className="form-control " value={price + "€"} disable style={{borderRadius: "0px", borderColor: "#000"}} placeholder="Total Payment:" type='text' />
  <button outline className="text-white border border-black bg-black" disabled={!next} onClick={()=> setstep2(true)} style={{borderRadius: "0px"}}>Next <i class="fas fa-chevron-right"></i></button>
</MDBInputGroup>
</div>
</div>
</div>

     
           </MDBContainer>

           </section>
           
      
      
   </>)
}


}




  
