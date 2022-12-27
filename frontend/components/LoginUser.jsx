import React from "react";
import { Container, Center, Heading, Button, Stack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { login, checkToken } from '../data/user'
import Swal from 'sweetalert2'
import Cookie from 'js-cookie'
import { useEffect } from "react";
import axios from "axios";
const jwt = require("jsonwebtoken");
//const jwt = require("jwt-simple");

//no funca esta funcion 
/*
export const getServerSideProps = async (context) => {
    try {
        const response = await checkToken(context.req.headers.cookie)
        if (response.status === 200) {
            return {
                redirect: {
                    destination:"/verUsuarios",
                    permanent: false,
                }
            }
        }
    }
    catch (error) {
        return {
            props: {}
        }
    }
}*/



const Home = ({ data }) => {

    const [user, setUser] = useState({
        correo: "",
        role: ""
    })

    const router = useRouter()

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    // useEffect(() => {
    //     const token = Cookie.get("token")
    //     if (token) {
    //       router.push('/verUsuarios')
    //     }

    //   }, []);

    const onsubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await login(user.correo)
            
            if (response.status === 200) {
                Cookie.set('token', response.data.token, { expires: 1 })
                const token = Cookie.get("token");
                const decoded = jwt.decode(token, process.env.SECRET_KEY);
                console.log(decoded)
                if (decoded.role === "admin") {
                    router.push('/verUsuarios')
                }else{
                    router.push('/usuario/'+decoded.sub)
                }
               
            }
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            })
        }
    }




    return (
        <Container maxW="container.xl" centerContent>
            <Heading textAlign="center" my={10}>Ingrese el usuario</Heading>
            <Stack>
                <Input onChange={handleChange} type={"email"} name="correo"></Input>
                <Button onClick={onsubmit} > Ingresar </Button>
            </Stack>
        </Container>
    )
}


export default Home