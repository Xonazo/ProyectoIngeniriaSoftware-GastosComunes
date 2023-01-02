// Componente NavBar importado
import DynamicNavBar from "../components/DynamicNavBar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import Swal from "sweetalert2";

// Componentes importados de Chakra UI
import {
  Button,
  Container,
  Stack,
  Heading,
  FormControl,
  Input,
  FormLabel,
  NumberInput,
  Select,
  Icon,
  InputGroup,
  InputLeftAddon,
  Center,
  FormHelperText,
} from "@chakra-ui/react";
// Iconos importados
import { MdPerson, MdDateRange, MdAttachMoney } from "react-icons/md";


const CreateRegistroAbono = () => {
  const router = useRouter();

  // Inicializamos el estado de los valores del formulario.
  const [values, setValues] = useState({
    regidVecino: "",
    fechaRegistro: "",
    cantidadPago: "",
    pago: "pago abono",
  });

 // Inicializamos el estado de los usuarios.
  const [users, setUsers] = useState([]);

  // Obtencion de los usuarios de la base de datos.
  const getUsers = async () => {
    const response = await axios.get(`${process.env.API_URL}/buscarUser`);
    // Seteo de los usuarios obtenidos.
    setUsers(response.data);
  };

  // Comprobacion de token(Cookies)
  const comprobacion = () => {
    const token = Cookie.get("token");
    if (token) {
      // Decodificacion del token
      const decoded = jwt.decode(token, process.env.SECRET_KEY);
      if (decoded.role === "user") {
        router.push("/userManagement");
      }
    } else {
      router.push("/");
    }
  };

  // useEffect para volver a comprobar las cookies, y obtener los datos de los usuarios.
  useEffect(() => {
    comprobacion();
    getUsers();
  }, []);

  const onSubmit = async (e) => {
    <Icon as={MdPerson} />;
    try {
      const response = await axios.post(
        `${process.env.API_URL}/CrearRegistroAbono`,
        values
      );
      console.log(response);
      if (response.status === 201) {
        Swal.fire({
          title: "Registro creado",
          text: "El registro se ha creado correctamente",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          router.push("/verRegistro");
        });
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




  // Estado para el rut seleccionado.
  const [selectedUser, setSelectedUser] = useState(null);

  // Funcion para mostrar el listado de ruts disponibles.
  const showRuts = () => {
    if (users.length === 0) {
      return <option>No hay usuarios</option>;
    }
    return (
      <Select
        bg={"#F7F7F7"}
        placeholder="Seleciona rut"
        onChange={(e) => {
          onChange(e);
          onChangeRut(e);
        }}
        name={"rutVecino"}
      >
        {users.map((user) => {
          if (user.role !== "admin") {
            return <option value={user.rut} label={`${user.rut} (${user.name})`}></option>
          }
        })}
      </Select>
    );
  };

  // Funcion para leer los datos ingresados en el formulario.
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // Funcion para obtener el rut seleccionado.
  const onChangeRut = (e) => {
    const rut = e.target.value;
    const selected = users.find((user) => user.rut === rut);
    // Seteo del rut seleccionado.
    setSelectedUser(selected);
  };

  // Funcion para restringir caracteres
  function restrictInput(event) {
    var input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }


  return (
    <>
      <DynamicNavBar/>
      <Container
        bg={"#D6E4E5"}
        margin=" 3rem auto"
        p={"3rem"}
        borderRadius="0.9rem"
      >
        <Heading textAlign={"center"} textTransform="uppercase">
          Registro de Abono
        </Heading>
        <Stack>

          <FormControl>
            <FormLabel fontSize={"1.2rem"}>Nombre</FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon
                bg={"#a8d3d1"}
                children={<Icon as={MdPerson} />}
              />
              <Input
                bg={"#F7F7F7"}
                type="text"
                value={selectedUser ? selectedUser.name : ""}
                readOnly
                placeholder="Nombre del usuario"
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={"1.2rem"}>Rut</FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon
                bg={"#a8d3d1"}
                children={<Icon as={MdPerson} />}
              />
              {showRuts()}
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={"1.2rem"}>Fecha del registro</FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon
                bg={"#a8d3d1"}
                children={<Icon as={MdDateRange} />}
              />
              <NumberInput width="100%">
                <Input
                  bg={"#F7F7F7"}
                  placeholder="Fecha"
                  type={"date"}
                  onChange={onChange}
                  name={"fechaRegistro"}
                />
              </NumberInput>
            </InputGroup>
            <FormHelperText>Solo fecha desde antes hasta hoy</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={"1.2rem"}>Cantidad del pago</FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon
                bg={"#a8d3d1"}
                children={<Icon as={MdAttachMoney} />}
              />
              <Input
                bg={"#F7F7F7"}
                placeholder="Cantidad del pago"
                type={"text"}
                onChange={(e) => {
                  restrictInput(e);
                  onChange(e);
                }}
                name={"cantidadPago"}
              ></Input>
            </InputGroup>
            <FormHelperText>Solo numeros</FormHelperText>
          </FormControl>

        </Stack>

        <Center>
          <Button
            colorScheme={"teal"}
            type="submit"
            my={"5"}
            height={{ base: "5rem", md: "5rem" }}
            width={{ base: "100%", md: "35%" }}
            fontSize="2xl"
            onClick={onSubmit}
          >
            Crear registro
          </Button>
        </Center>

      </Container>
    </>
  );
};

export default CreateRegistroAbono;
