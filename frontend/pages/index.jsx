import  HomeContent  from '../components/Home';
import NavBar from "../components/NavBar";
//import ViewUser from '../components/viewUser';
//import LoginUser from '../components/LoginUser';
import { checkToken } from "../data/user";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Home() {
  return (
    <>
    <NavBar/>
    <HomeContent/>
    </>
  )
  
}
