import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalOverlay,
  Stack,
  Image,
  Heading,
  Text,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { login, checkToken } from '../data/user';
import Swal from "sweetalert2";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'


const LoginButton = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    correo: "",
    role:""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await login(user.correo)
        
        if (response.status === 200) {
            Cookie.set('token', response.data.token, { expires: 1 })
            const token = Cookie.get("token");
            const decoded = jwt.decode(token, process.env.SECRET_KEY);
            // console.log(decoded)
            if (decoded.role === "admin") {
                router.push('/management')
            }else{
                router.push('/management/'+ decoded.sub )
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

  const OverlayOne = () => {
    <ModalOverlay
      backgroundColor="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />;
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  return (
    <>
      <Button
        backgroundColor="rgb( 0 0 0 / 30% )"
        borderColor={"#4ea39a"}
        borderWidth={"0.3rem"}
        borderRadius={"2.2rem"}
        padding="2rem 4rem"
        fontSize={"1.5rem"}
        textTransform={"uppercase"}
        fontWeight="light"
        transition={"all 0.2s linear"}
        _hover={{
          bgColor: "#4ea39a",
        }}
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
        color={"white"}
      >
        Ingresa aqui
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="2xl">
        {overlay}
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Stack bg="whiteAlpha.900" p="20">
              <Image src="/logo.svg" maxH={"50px"} mb="8" mx="auto" />
              <Heading>Inicia sesion.</Heading>
              <Text fontSize="lg" color="gray.600">
                Ingresa tu rut para Ingresar{" "}
              </Text>

              <Stack>
                <Input onChange={handleChange} type={"email"} placeholder="Ingresa tu email." name='correo'/>
              </Stack>

              <Stack justify="center" color="gray.600" spacing="3">
                <Text as="div" textAlign="center"></Text>
                <Button
                  textTransform={"uppercase"}
                  colorScheme="teal"
                  type="submit"
                  size={"lg"}
                  onClick={onSubmit}
                >
                  Ingresar
                </Button>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};


export default LoginButton;
