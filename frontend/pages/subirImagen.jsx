import { useEffect, useState } from 'react'
import { Center, Input, Button, FormControl, FormLabel, FormHelperText, Container, Heading, Stack } from '@chakra-ui/react'
import axios from 'axios'
import DynamicNavBar from '../components/DynamicNavBar'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import Swal from 'sweetalert2'

export default function SubidaImagen() {
    const router = useRouter()
    const [nombreArchivo, setNombreArchivo] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('archivos', e.target.archivos.files[0])
        try {
            const token = Cookie.get("token");
            const decoded = jwt.decode(token, process.env.SECRET_KEY);
            console.log(e.target.archivos.files[0].name)
            const response = await axios.post(`${process.env.API_URL}/file/${e.target.archivos.files[0].name}/${decoded.sub}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            console.log(response)
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Imagen subida correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <DynamicNavBar />
            <Container
                bg={"#D6E4E5"}
                margin=" 3rem auto"
                p={" 3rem"}
                borderRadius={"1rem"}>

                <Heading
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    marginBottom={"1rem"}
                >Subida de comprobantes de pagos
                </Heading>
                <FormControl>
                    <FormLabel
                        textTransform={"uppercase"}
                        htmlFor="image"
                        marginBottom={"1rem"}
                        textAlign={"center"}
                        my={3}>Selecciona un archivo</FormLabel>
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
                    >Solo se aceptan imagenes</FormHelperText>
                </FormControl>
                <Center>
                    <Button type="submit" mt={4}>
                        Subir imagen
                    </Button>
                </Center>
                <Center>
                </Center>
            </Container>
        </form>
    )
}