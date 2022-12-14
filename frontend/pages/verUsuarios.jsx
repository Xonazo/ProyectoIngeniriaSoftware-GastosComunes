import React from 'react'
import NavBar from "../components/NavBar";
import ViewUser from "../components/viewUser";
import ViewUserNoPay from "../components/viewUserNoPay"
import ViewUserPay from "../components/viewUserPay"

export default function VerUsuarios() {
  return (
    <>
    <NavBar/>
    <ViewUser/>
    <ViewUserNoPay/>
    <ViewUserPay/>
    </>
  )
}
