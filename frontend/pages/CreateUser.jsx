import React from 'react'
import NavBar from "../components/NavBar";
import NewUser from '../components/CreateUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import cookie from 'js-cookie';


export default function CreateUser() {
  const router = useRouter()
  useEffect(() => {
    const token = cookie.get("token")
    if (!token || token === null) {
      router.push('/')
    }

  }, [])
 
  return (
    <>
    <NavBar/>
    <NewUser/>
    </>
  )
}
