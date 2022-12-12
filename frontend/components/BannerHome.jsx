import React from "react";
import {
  Box,
  Image,
  Container,
  Center,
  Heading,
  Button,
  Flex,
  Stack,
  background,
  color
} from "@chakra-ui/react";



const bgImage =
  "https://www.iaconcagua.com/Multimedia/posts/nuevo-proyecto-de-departamentos-en-puente-alto.w1600.jpg";

const HomeContent = () => {
  return (
    <Box
      h={"55vh"}
      bg="gray"
      bgImage={`${bgImage}`}
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Flex
        direction= 'column'
        alignItems= 'center'
        justify= 'center'
        h='100%'
        bg= 'rgb(0 0 0 /40%)'
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
          <Button
            backgroundColor= 'rgb( 0 0 0 / 30% )'
            borderColor={'#4ea39a'}
            borderWidth= {'0.3rem'}
            borderRadius={'2.2rem'}
            padding='2rem 4rem'
            fontSize={'1.5rem'}
            textTransform={'uppercase'}
            fontWeight='light'
            transition={'all 0.2s linear'}
            _hover={{
              bgColor: '#4ea39a'
            }}
          >INGRESA TU RUT</Button>
          {/* <Button
            backgroundColor= 'rgb( 0 0 0 / 30% )'
            borderColor={'#4ea39a'}
            borderWidth= {'0.3rem'}
            borderRadius={'2.2rem'}
            padding='2rem 4rem'
            fontSize={'1.5rem'}
            textTransform={'uppercase'}
            fontWeight='light'
            transition={'all 0.2s linear'}
            _hover={{
              bgColor: '#4ea39a'
            }}
          >Administrador</Button> */}
        </Stack>
        <Image src='/click.svg' my={'5px'} boxSize='100px'/>
      </Flex>
    </Box>
  );
};

export default HomeContent;
