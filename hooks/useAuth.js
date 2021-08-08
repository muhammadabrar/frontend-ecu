import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'

export default function useAuth(goto) {
    const router = useRouter()



  useEffect(() => {
      const verify = async()=>{
        const req = await axios.get(`${process.env.NEXT_PUBLIC_API}verifyAuth`)
        .then(res => {
            if(res.data.login){
              console.log("you are login")

            }else{
              router.push(`/admin/login`)
            }
          console.log(res.data);
        })
      }
      verify()
  }, []);

}