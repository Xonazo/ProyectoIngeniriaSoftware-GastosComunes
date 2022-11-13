const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const User = require('../models/vecino');
dotenv.config();

//devolver usuarios
const getUsers= (callback)=>{
    User.find({},(error,users)=>{
        users.reverse()
        callback(error,users)
    })
}

let directory = []

getUsers((error,users)=>{
    users.email;
})

const sendMail = (req, res) => {
    //const { message } = req.body
    const token = process.env.PW
    const mail = 'edison.munoz1901@alumnos.ubiobio.cl'
    if (!token) {

        return res.status(400).send({ message: "Nos se ha entregado la contraseña de aplicacion para el correo" })
    }
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:'edison.munoz1901@alumnos.ubiobio.cl',
            pass:token
        }
    })
    let directory = [
        'edi.edison.edi@gmail.com',
        'matias.san1901@alumnos.ubiobio.cl',
        'nelson.rubio1901@alumnos.ubiobio.cl'

    ]
    const mailOptions = {
        from: `q pasa ijos del pico<${mail}>`,
        to:directory,
        subject: 'q pasa ijos del pico',
        text:`q pasa ijos del pico `,
        html:`
        <p> q pasa ijos del pico</p>
        `
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return res.status(400).send({message:'Error al enviar'})
        }
        return res.status(200).send({message:'mensaje enviado'})
    })

    transporter.verify().then(()=>{
        console.log('servidor de correos habilitado')
    }).catch(error=>{
        console.log('Error al utilizar servidor de correos')
    })



}


module.exports = sendMail