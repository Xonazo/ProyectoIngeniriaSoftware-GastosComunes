import { Container, Table, Tbody, Tr, Heading, Thead, Td, Button, Tooltip, Icon } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {MdOutlineNotificationsActive} from 'react-icons/md'

const viewUserNoPay = () => {

    const router = useRouter()


    const [users, setUsers] = useState([])
    useEffect( ( ) => {
        getUsers()
    }, [])

    const getUsers = async () =>{
        const response = await axios.get(`${process.env.API_URL}/getUsersNoPay`)
        setUsers(response.data);
    }

    const showUsersNoPay = () => {
        return users.map( ( usuario, index ) =>{
            return (
                <Tr
                key={usuario._id}
                _hover={{
                    background: 'rgb( 0 0 0 / 20% )',
                    }}
                >
                    <Td textAlign='center'>{usuario.numeroVivienda}</Td>
                    <Td textAlign='center'>{usuario.name}</Td>
                    <Td textAlign='center'>{usuario.rut}</Td>
                    <Td textAlign='center'>{usuario.correo}</Td>
                    <Td textAlign={'center'} display={'flex'} justifyContent={'space-around'} cursor={"pointer"}>
                        <Button as={MdOutlineNotificationsActive} boxSize={"35"}onClick={ () => notifyUser(usuario._id)}
                        _hover ={{
                            bg: "#4ea39a",
                            color: "white"
                        }}
                        />
                    </Td>
                </Tr>
            )
        })
    }

    const notifyUser = async (id) => {
        const response = await axios.get(`${process.env.API_URL}/notifyUser/`+id)
    }


  return (
    <Container maxW= "container.xl" centerContent>
        <Heading textAlign="center" my={10}> USUARIOS SIN PAGAR</Heading>
        <Table variant={"simple"}>
            <Thead color='white' bgColor={"black"} >
                <Tr borderColor={'black'} borderWidth='2px' textTransform={'uppercase'}>
                    <Td textAlign="center">Numero Vivienda</Td>
                    <Td textAlign="center">Nombre</Td>
                    <Td textAlign="center">Rut</Td>
                    <Td textAlign="center">Correo</Td>
                    <Td textAlign="center">Accion</Td>
                </Tr>
            </Thead>
            <Tbody borderColor={'black'} borderWidth='2px'>
                {showUsersNoPay()}
            </Tbody>
        </Table>
    </Container>
  )
}

export default viewUserNoPay