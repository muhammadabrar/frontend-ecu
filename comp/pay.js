import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PayDownload from './pay&download';
import { useRouter } from 'next/router'

export default function Pay(props) {
  const router = useRouter()
const [Ispaid, setIspaid] = useState(false)

// data
const id = props.id
const  price = props.price
const  email = props.email



const paid=()=>{
  setIspaid(true)
  setTimeout(() => {
    router.push(`/paymentsuccess`)

  }, 30000);
}

  //get option for search
//   useEffect(() => {
// }, [refreshdata]);





  return (
  <div className="successMsg " >
    {!Ispaid ?   <div className="content" >

<p>
Your Files his been successfully submited
</p>
<p>
Total Payment is {price} $
</p>
<PayDownload total={price} id={id} paid={paid}/>
</div> :<div className="content" > <p>Thank You so much for choosing Tested ECU Solution</p>
    <p>We Will send your response on {email} as soon as possible</p>
    <p>you Will auto reture to <a href="/" className="text-white"><u>Home</u></a> page after 30 sec</p>
    </div>}

  </div>

  )
}
