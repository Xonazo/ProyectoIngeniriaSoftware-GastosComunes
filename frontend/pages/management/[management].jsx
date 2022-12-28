import React from 'react'
import { useState,  } from "react";
import { useRouter } from "next/router";
import { Container, Heading } from '@chakra-ui/react';
import axios from "axios";
import DynamicNavBar from '../../components/DynamicNavBar';
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

const Management = (  ) => {

  const token = Cookie.get("token");
  const decoded = jwt.decode(token, process.env.SECRET_KEY);
  const id = decoded.sub;
  console.log(decoded);
  console.log(id);

  const [user, setUser] = useState([])

  const getUser = async () => {
    const response = await axios.get(`${process.env.API_URL}/findOneUser/${id}`)
    setUser(response.data);
  }

  const userData = await getUser();

  return (
    <>
      <DynamicNavBar/>
      <Container>
        {getUser()}
        <Heading>Bievenido {userData.id}</Heading>
      </Container>
    </>
  )
}

export default Management;