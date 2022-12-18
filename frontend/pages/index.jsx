import BannerHome from '../components/BannerHome';
import NavBar from "../components/NavBar";
import ViewUser from '../components/viewUser';
import LoginUser from '../components/LoginUser';
import { checkToken } from "../data/user";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';


// export const getServerSideProps = async (context) => {
//   try {
//     const response = await checkToken(context.req.headers.cookie)
//     if (response.status === 200) {
//       return {
//         redirect: {
//           data: response.data,
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error)
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       }
//     }
//   }
// }


const Home = ({ data }) => {
  // const router = useRouter()
  // useEffect(() => {
  //   const token = Cookies.get("token")
  //   if (!token || token === "undefined") {
  //     router.push('/')
  //   }

  // }, [])

  return (
    <>
      <NavBar />
      <BannerHome />
      <LoginUser />
    </>
  )
}

export default Home;