import axios from 'axios'
import Cookies from 'js-cookie'
import Router from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import DynamicNavBar from "../components/DynamicNavBar";

import jwt from "jsonwebtoken"

import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Heading,
} from "@chakra-ui/react";


export const registros = (idUser) => {

  useEffect(() => {
    getUserInfo()
    getRegistros()
  }, [])


  const [userInfo, setUserInfo] = useState({
    id: "",
    nombre: "",
    rut: "",
  })

  const [registros, setRegistros] = useState([])

  const getUserInfo = async () => {
    const token = Cookies.get("token");
    if (!token || token === "" || token === undefined) {
      Router.push("/")
      //Revisar pagina de login
    }
    console.log(token)
    const decoded = jwt.decode(token, process.env.SECRET_KEY)
    const response = await axios.get(`${process.env.API_URL}/findOneUser/${decoded.sub}`)
    if (response === 200) {
      setUserInfo({
        ...userInfo,
        id: response.data._id,
        nombre: response.data.name,
        rut: response.data.rut,
      })
    }
  }

  const getRegistros = async () => {
    const token = Cookies.get("token");
    if (!token || token === "" || token === undefined) {
      Router.push("/index")
      //Revisar pagina de login
    }
    const decoded = jwt.decode(token, process.env.SECRET_KEY)
    const registros = await axios.get(`${process.env.API_URL}/BuscarRegistrosTotal/search/${decoded.sub}`)
    if (registros.status === 200) {
      console.log(registros.data)
      setRegistros(registros.data)
    }
  }

  const showRegistros = () => {
    return registros.map((registro) => {
      const fecha = new Date(registro.fechaRegistro)
      const fechaFormateada = fecha.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      })
      return (
        <Tr
          key={registro._id}
          _hover={{
            background: "rgb( 0 0 0 / 20% )",
          }}
        >
          <Td textAlign="center">{fechaFormateada}</Td>
          <Td textAlign="center">{registro.cantidadPago}</Td>
          <Td textAlign="center">{registro.pago}</Td>
          {/* <Td textAlign="center" display={"flex"} justifyContent="space-around"></Td> */}
        </Tr>
      );
    });
  };


  return (
    <>
      <DynamicNavBar />

      <Container maxW="container.xl" centerContent>
        <Heading textAlign="center" my={10}>
          HISTORIAL DE REGISTROS DE USER
        </Heading>
        <Table variant={"simple"} my="10">
          <Thead color="white">
            <Tr
              borderColor={"black"}
              bg={"black"}
              borderWidth="2px"
              textTransform={"uppercase"}
            >
              <Td textAlign="center">Fecha del registro</Td>
              <Td textAlign="center">Cantidad de pago</Td>
              <Td textAlign="center">Tipo de pago</Td>
            </Tr>
          </Thead>
          <Tbody borderColor={"black"} borderWidth="2px">
            {showRegistros()}
          </Tbody>
        </Table>
      </Container>
    </>
  )
}

export default registros