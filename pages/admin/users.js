
import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import User from '../../comp/admin/users/users'
import Sidebar from '../../comp/admin/sidebar'
import Breadcrumb from '../../comp/admin/breadcrumb';
import { useRouter } from 'next/router'

axios.defaults.withCredentials = true




export default function Users() {
  const router = useRouter()
  

  return (
      
<>
<div className="admin">
       
       <Sidebar  />
       <Breadcrumb />
            
       <User />
         </div>


</>
);
}