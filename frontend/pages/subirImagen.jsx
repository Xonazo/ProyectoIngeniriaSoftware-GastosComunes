// NavBar dinamico
import DynamicNavBar from "../components/DynamicNavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import Swal from "sweetalert2";

// Componentes importados de Chakra UI
import {
  Center,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Container,
  Heading,
  Flex,
} from "@chakra-ui/react";

export default function SubidaImagen() {
  const router = useRouter();

  // Inicializamos el nombre del archivo(file) del usuario
  const [nombreArchivo, setNombreArchivo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("archivos", e.target.archivos.files[0]);
    try {
      // Obtenemos y decodificamos cookie de usuario
      const token = Cookie.get("token");
      const decoded = jwt.decode(token, process.env.SECRET_KEY);

      const response = await axios.post(
        `${process.env.API_URL}/file/${e.target.archivos.files[0].name}/${decoded.sub}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      //Notificacion de subida de archivo correcta
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Realizado",
          text: "Se ha subido correctamente la imagen",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DynamicNavBar />
      <Container
        bg={"#D6E4E5"}
        margin=" 3rem auto"
        p={" 3rem"}
        borderRadius={"1rem"}
      >
        <Heading
          textTransform={"uppercase"}
          textAlign={"center"}
          marginBottom={"1rem"}
        >
          Subir comprobante
        </Heading>
        <FormControl>
          <FormLabel
            textTransform={"uppercase"}
            htmlFor="image"
            marginBottom={"1rem"}
            textAlign={"center"}
            my={3}
          >
            Selecciona un archivo
          </FormLabel>
          <Center>
            <Input
              size={"xl"}
              type="file"
              id="archivos"
              name="archivos"
              onChange={(e) => setNombreArchivo(e.target.files[0].name)}
            />
          </Center>
          <FormHelperText
            id="image-helper-text"
            textTransform={"uppercase"}
            textAlign={"center"}
          >
            Solo se aceptan imagenes
          </FormHelperText>
        </FormControl>
        <Flex
          justifyContent={"center"}
          flexDirection={{ base: "column", md: "row" }}
          alignItems={"center"}
          gap="1rem"
          marginTop={"3.5rem"}
        >
          <Button
            type="submit"
            colorScheme="teal"
            height={{ base: "5rem", md: "5rem" }}
            width={{ base: "100%", md: "35%" }}
            fontSize="2xl">
            Subir imagen
          </Button>
          <Button
            colorScheme="teal"
            height={{ base: "5rem", md: "5rem" }}
            width={{ base: "100%", md: "40%" }}
            fontSize="2xl"
            onClick={() => router.push("/verImagenesUser")}>
            Ver imagenes subidas
          </Button>
        </Flex>


      </Container>
    </form>
  );
}
