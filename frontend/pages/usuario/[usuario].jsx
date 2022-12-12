import { use, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import axios from "axios";
import {
  Container,
  Image,
  VStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Button,
} from "@chakra-ui/react";

export async function getServerSideProps(context) {
  console.log("URL DE QUERY>>>>>"+ context.params.usuario);
  try {
    const response = await axios.get(
      `${process.env.API_URL}/findOneUser/${context.params.usuario}`
    );
    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
}


const usuario = (data) => {
  const router = useRouter();
  const [user] = useState(data);
  console.log(user);

  const [updates, setUpdates] = useState()

  const onSubmit = async (e) =>{
    e.preventDefault();
    console.log(updates);
    try {
      const response = await axios.put(`${process.env.API_URL}/updateUser/${user.data._id}`,updates)
      console.log(response);
    } catch (error) {
      
    }
  }


  const onChange = (e) => {
    setUpdates({
      ...updates,
      [e.target.name]: e.target.value
    })
  }




  const selectRole = (rol) => {
    switch (rol) {
      case "admin":
        return (
          <>
            <option>user</option>
            <option selected>admin</option>
          </>
        );
        break;

      case "user":
        return (
          <>
            <option selected>user</option>
            <option>admin</option>
          </>
        );
        break;
    }
  };

  return (
    <>
      <NavBar />
      <Container maxW={"container.lg"} centerContent>
        <Image src="/profileCircle.svg" boxSize={"xl"} />

        <VStack my="10px">
          <InputGroup>
            <InputLeftAddon children="Nombre" w={'75px'} />
            <Input 
            name={'name'}
            defaultValue={user.data.name}
            onChange={onChange}
            ></Input>
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children="Rut" w={'75px'}/>
            <Input 
            name={'rut'}
            defaultValue={user.data.rut}
            onChange={onChange}
            ></Input>
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children="Correo" w={'75px'}/>
            <Input 
            name={'correo'}
            defaultValue={user.data.correo}
            onChange={onChange}
            ></Input>
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children="N Vivienda" w={'75px'} />
            <Input 
            name={'numeroVivienda'}
            defaultValue={user.data.numeroVivienda}
            onChange={onChange}
            ></Input>
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children="Convivientes" w={'75px'}/>
            <Input 
            name={'personasConvive'}
            defaultValue={user.data.personasConvive}
            onChange={onChange}
            ></Input>
          </InputGroup>
          <InputGroup>
          <InputLeftAddon children="Rol" w={'75px'}/>
          <Select name={'role'} onChange={onChange}>
          {selectRole(user.data.role)} 
          </Select>
          </InputGroup>
        </VStack>
        <Button colorScheme={'teal'} type='submit' onClick={onSubmit}>
            Actualizar datos
        </Button>
      </Container>
    </>
  );
};

export default usuario;
