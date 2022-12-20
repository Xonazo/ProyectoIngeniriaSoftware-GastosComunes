import { useState } from 'react'
import { Image, Input, Button, FormControl, FormLabel, FormHelperText, Container, Heading, Stack } from '@chakra-ui/react'
import axios from 'axios'

export default function Home() {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('archivos', e.target.archivos.files[0])
    try {
      const response = await axios.post(`${process.env.API_URL}/file/comprobantes`, formData)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Stack>
          <Heading textAlign={"center"} my={10}>Subida de comprobantes de pago</Heading>
          <FormControl>
            <FormLabel htmlFor="image" my={3}>Selecciona un archivo</FormLabel>
            <Input
              type="file"
              id="archivos"
              name="archivos"
            />
            <FormHelperText id="image-helper-text">Solo se aceptan imagenes</FormHelperText>
          </FormControl>
          <Button type="submit" mt={4}>
            Subir imagen
          </Button>
          on
        </Stack>
      </Container>
    </form>
  )
}