import {MDBIcon, MDBContainer, MDBCollapse, MDBBtn, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Faq(props) {

  const [data, setData] = useState([]);
  //get option for inputs
  useEffect(() => {
    const getfaq = async()=>{
      const req = await axios.get(`${process.env.NEXT_PUBLIC_API}faq/`)
      .then(res => {
        setData(res.data.data)
      }).catch(err => {
        // what now?
  
        console.log("save faq error");
        console.log(err);
    })
    }
    getfaq()
}, []);


   return( <>
   
   
  
    
<section className="faq">

           <MDBContainer >
{data.map((data)=><details>
<summary>{data.Q} 
</summary>
<div class="faq__content">
<p>{data.p}</p>
</div>

</details>)
}
     
           </MDBContainer>

           </section>
           
      
      
   </>)
}







  
