
import axios from "axios"

const login = async (correo) => {
    const response = await axios.post(`${process.env.API_URL}/user/login`,{correo});
    return response
}   


const logout = async () => {
    const response = await axios.get(`${process.env.API_URL}/logout`);
    return response
}   

const checkToken = async (token) => {
    console.log(token)
    const response = await axios.get(`${process.env.API_URL}/checkToken`,{headers:{cookie:token}});
    
    return response
}   



module.exports ={
    login,
    logout,
    checkToken
}