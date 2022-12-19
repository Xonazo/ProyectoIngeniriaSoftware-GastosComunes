import React from 'react'
import NavBar from "../components/NavBar";
import ViewUser from "../components/viewUser";
import ViewUserNoPay from "../components/viewUserNoPay"
import ViewUserPay from "../components/viewUserPay"
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import cookie from 'js-cookie';

export default function VerUsuarios() {
  const router = useRouter();
  useEffect(() => {
    const token = cookie.get('token');
    if (!token || token === "undefined") {
      router.push('/');
    }
  }, []);

  return (
    <>
    <NavBar/>
    <ViewUser/>
    <ViewUserNoPay/>
    <ViewUserPay/>
    </>
  )
}
