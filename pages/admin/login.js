
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../hooks/auth';
import styles from "../../style/login.module.css";
import { useRouter } from 'next/router'
import axios from 'axios';
import { SemipolarLoading  } from 'react-loadingg'; 
axios.defaults.withCredentials = true


export default function Login_page() {
  const [auth, setAuth] = useContext(AuthContext)
  const router = useRouter()
  const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState();
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState();
    const [goto, setGoto] = useState("admin")
    const [loginMsg, setLoginMsg] = useState(false)
    const [loading, setLoading] = useState(true)

    
    
    useEffect(() => {
      const verify = async()=>{
        const req = await axios.get(`${process.env.NEXT_PUBLIC_API}verifyAuth`)
        .then(res => {
            if(res.data.login){
              router.push(`/${goto}`)

            }else{
              setLoginMsg(true)
              setLoading(false)

            }
          console.log(res.data);
        })
      }
      verify()
  }, []);
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const data = {
        email: email,
        pass: pass
      };
      const req = await axios.post(`${process.env.NEXT_PUBLIC_API}login`, {withCredentials: true, data})
        .then(res => {
          setLoading(true)

          if(res.data.err == "password"){
            setErr(true)
            setSuccess(false);
            
            setErrMsg("sorry wrong password please try again")
            setLoading(false)

          }else{
            if(res.data.err == "userNotExicet"){
              setErr(true)
              setSuccess(false);
              setErrMsg("sorry This email those not exist")
              setLoading(false)
            }else{
              setSuccess(true);
              setErr(false)
              setSuccessMsg("you are loged in");
              setLoading(true)
              setAuth(res.data.user)
              router.push('/admin')
            }
          }
          console.log(res);
        })
        
    }
    if(loading){
      return(<SemipolarLoading  size="large"  color="#000"/>
      )
   }else{
  return( 
  <div className={styles.login}>
  <div className={styles.center}>
     <h1>Login</h1>
     {err? <p className="text-danger text-center">{errMsg}</p>: null}
     {loginMsg? <p className="text-info text-center">Please Login</p>: null}

     {success? <p className="text-success text-center">{successMsg}</p>: null}

     <form onSubmit={handleSubmit}>
       <div className={styles.txt_field}>
         <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
         <span></span>
         <label>Email</label>
       </div>
       <div className={styles.txt_field}>
         <input type="password" autocomplete value={pass} onChange={(e)=> setPass(e.target.value)} required />
         <span></span>
         <label>Password</label>
       </div>
       <div className={styles.pass}>Forgot Password?</div>
       <input type="submit" className={styles.login_btn} value="Login" />
       <div className={styles.signup_link}>
         {/* Not a member? <a href="#" >Signup</a> */}
       </div>
     </form>
   </div>
 
</div>
       )
     }
}