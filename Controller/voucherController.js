const nodemailer = require('nodemailer');
const Vecino = require('../models/vecino');

const sendVoucher = idVecino =>{
    Vecino.findById(idVecino, (error, Vecino) =>{
        if (error) {
            return res.status(400).send({message: "Error de pago"});
        }

        let nombreVecino = Vecino["name"];
        let correoVecino = Vecino["correo"];
        let msgCorreo = `Estimado vecino ${nombreVecino}, se ha realizado el pago de cuentas`;

        
        const mail = 'matias.san1901@alumnos.ubiobio.cl'
        const token = process.env.PW
        if (!token) {
            return res.status(400).send({message: "Error de token"})
        }

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", 
            port: 465,
            secure: true, //
            auth: {
            user: mail, // mail 'remitente'
            pass: token, // token de 'remitente
            },
        });

        let info =  transporter.sendMail({
            from: '"Serv. Administracion de Gastos Comunes 🏘" <condominio@ubb.com>', // sender address
            to: correoVecino, // Lista de destinarios, debe ir la variable de "correoVecino" 
            subject: "Notificacion, Pago realizado", // Subject line
            text: msgCorreo, // Mensaje de Notificacion de fecha de pago, cuerpo de texto sin formato.
            html: 
            `
            <h1 align= "center">PAGO REALIZADO</h1> 
            <b> ${msgCorreo} </b>
            `
        });

    })
}

module.exports = {
    sendVoucher
}