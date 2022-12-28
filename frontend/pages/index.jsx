//Importamos NavBar dinamico.`
import DynamicNavBar from "../components/DynamicNavBar";
import {
  Box,
  Image,
  Heading,
  Flex,
  Stack,
} from "@chakra-ui/react";
import Login from "../components/Login";

const bgImage =
  "https://www.iaconcagua.com/Multimedia/posts/nuevo-proyecto-de-departamentos-en-puente-alto.w1600.jpg";


export default function Home() {
  return (
    <>
    <DynamicNavBar/>
    <Box
      h={"92.7vh"}
      bgImage={`${bgImage}`}
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Flex
        direction= 'column'
        alignItems= 'center'
        justify= 'center'
        h='100%'
        bg= 'rgb(0 0 0 /60%)'
      >
        <Heading
          fontSize={ {base:'1rem', md:'1.7rem'}} 
          color={"white"}
          textTransform={"uppercase"}
          textAlign={"center"}
          fontWeight='light'
          letterSpacing={'4px'}
          marginBottom= '15px'
          fontFamily={''}
        >
          Servicio de administración y pago
        </Heading>
        <Heading
          fontSize={ {base:'4.2rem', md:'6rem'}}  
          color={"white"}
          textTransform={"uppercase"}
          textAlign={"center"}
          fontWeight='light'
          letterSpacing={'3px'}
        >
          Gastos comunes
        </Heading>
      
        <Stack
          direction={ {base:'column', md:'row'}}
          color={'white'} 
        >
          <Login/>
        </Stack>
        <Image src='/click.svg' my={'5px'} boxSize='100px'/>
      </Flex>
    </Box>

    </>
  )
  
}
