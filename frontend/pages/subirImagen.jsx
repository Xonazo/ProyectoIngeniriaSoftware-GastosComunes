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
          title: "Imagen subida correctamente",
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
          Subida de comprobantes de pagos
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
          <Input
            size={"lg"}
            textAlign={"center"}
            type="file"
            id="archivos"
            name="archivos"
            onChange={(e) => setNombreArchivo(e.target.files[0].name)}
          />
          <FormHelperText
            id="image-helper-text"
            textTransform={"uppercase"}
            textAlign={"center"}
          >
            Solo se aceptan imagenes
          </FormHelperText>
        </FormControl>
        <Center>
          <Button type="submit" mt={4}>
            Subir imagen
          </Button>
        </Center>
        <Center></Center>
      </Container>
    </form>
  );
}
