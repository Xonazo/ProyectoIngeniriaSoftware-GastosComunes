import { useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Stack,
  Heading,
  FormControl,
  Input,
  FormLabel,
  NumberInput,
  NumberInputField,
  Select,
  Icon,
  InputGroup,
  Box,
  InputLeftAddon,
} from "@chakra-ui/react";
import {
  MdPerson,
  MdEmail,
  MdFamilyRestroom,
  MdHouse,
  MdFingerprint,
  MdPanTool,
} from "react-icons/md";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const CreateUser = () => {
  const router = useRouter()
  const [values, setValues] = useState({
    name: "",
    rut: "",
    correo: "",
    numeroVivienda: "",
    personasConvive: "",
    role: "",
  });


  const onSubmit = async (e) => {<Icon as={MdPerson} />
    try {
      const response = await axios.post(`${process.env.API_URL}/crearUser`,values);
      console.log(response);
      if (response.status === 201) {
        Swal.fire({
          title: "Usuario creado",
          text: "El usuario se ha creado correctamente",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          router.push('/verUsuarios')
        })
      } else {
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container
      bg={"#D6E4E5"}
      margin=" 3rem auto"
      p={"3rem"}
      borderRadius="0.9rem"
    >
      <Heading textAlign={"center"} textTransform="uppercase">
        Crear usuario
      </Heading>
      <Stack>
        <FormControl>
          <FormLabel fontSize={"1.2rem"}>Nombre</FormLabel>
          <InputGroup size="lg">
            <InputLeftAddon bg={"#a8d3d1"} children={<Icon as={MdPerson} />} />
            <Input
              bg={"#F7F7F7"}
              placeholder="Nombre y apellido"
              type={"text"}
              onChange={onChange}
              name={"name"}
            ></Input>
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel fontSize={"1.2rem"}>Rut</FormLabel>
          <InputGroup size="lg">
            <InputLeftAddon
              bg={"#a8d3d1"}
              children={<Icon as={MdFingerprint} />}
            />
            <NumberInput width="100%">
              <NumberInputField
                bg={"#F7F7F7"}
                placeholder="xx.xxx.xxx-k"
                type={"text"}
                onChange={onChange}
                name={"rut"}
              />
            </NumberInput>
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel fontSize={"1.2rem"}>Correo electronico</FormLabel>
          <InputGroup size="lg">
            <InputLeftAddon bg={"#a8d3d1"} children={<Icon as={MdEmail} />} />
            <Input
              bg={"#F7F7F7"}
              placeholder="nombre@ejemplo.com"
              type={"email"}
              onChange={onChange}
              name={"correo"}
            ></Input>
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel fontSize={"1.2rem"}>Numero vivienda</FormLabel>
          <InputGroup size="lg">
            <InputLeftAddon bg={"#a8d3d1"} children={<Icon as={MdHouse} />} />
            <NumberInput width={"100%"}>
              <NumberInputField
                bg={"#F7F7F7"}
                placeholder="#0000"
                type={"number"}
                onChange={onChange}
                name={"numeroVivienda"}
              ></NumberInputField>
            </NumberInput>
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel fontSize={"1.2rem"}>Cant. de convivientes</FormLabel>
          <InputGroup size="lg">
            <InputLeftAddon
              bg={"#a8d3d1"}
              children={<Icon as={MdFamilyRestroom} />}
            />
            <Input
              bg={"#F7F7F7"}
              placeholder="Cantidad de personas"
              type={"number"}
              onChange={onChange}
              name={"personasConvive"}
            ></Input>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"1.2rem"}>Tipo de usuario</FormLabel>
          <InputGroup>
            <InputLeftAddon bg={"#a8d3d1"} children={<Icon as={MdPanTool} />} />
            <Select
              bg={"#F7F7F7"}
              placeholder="Seleciona el tipo de usuario"
              onChange={onChange}
              name={"role"}
            >
              <option>user</option>
              <option>admin</option>
            </Select>
          </InputGroup>
        </FormControl>
      </Stack>
      <Box align="right">
        <Button
          colorScheme={"teal"}
          type="submit"
          my={"5"}
          onClick={onSubmit}
          width={{ base: "100%", md: "25%" }}
          size={'lg'}
        >
          Crear usuario
        </Button>
      </Box>
    </Container>
  );
};

export default CreateUser;
