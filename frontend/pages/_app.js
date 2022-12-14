import '../styles/globals.css'
import "../styles/navbarStyles.css"
import "../styles/loginForm.css"
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {... pageProps} />
    </ChakraProvider> 
  )
}

export default MyApp
