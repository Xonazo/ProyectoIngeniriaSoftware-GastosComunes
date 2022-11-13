const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

//
const sendMail = (req, res) => {
    //const { message } = req.body
    const token = process.env.PW
    const mail = 'edison.munoz1901@alumnos.ubiobio.cl'
    if (!token) {

        return res.status(400).send({ message: "Nos se ha entregado la con traseña de aplicacion para el correo" })
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'edison.munoz1901@alumnos.ubiobio.cl',
            pass: token
        }
    })
    let directory = [
        'edi.edison.edi@gmail.com',
        'matias.san1901@alumnos.ubiobio.cl',
        'nelson.rubio1901@alumnos.ubiobio.cl'


    ]
    const mailOptions = {
        from: `prueba<${mail}>`,
        to: directory,
        subject: 'prueba',
        text: `prueba `,
        html: `
        <p> prueba</p>
        `
    }



    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(400).send({ message: 'Error al enviar' })
        }
        return res.status(200).send({ message: 'mensaje enviado' })
    })

    transporter.verify().then(() => {
        console.log('servidor de correos habilitado')

    }).catch(error => {
        console.log('Error al utilizar servidor de correos')

    })





}


module.exports = sendMail