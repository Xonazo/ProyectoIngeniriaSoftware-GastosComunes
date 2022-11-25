const nodemailer = require('nodemailer');
const Vecino = require('../models/user');

const sendVoucher = idVecino =>{
    Vecino.findById(idVecino, (error, Vecino) =>{
        if (error) {
            return res.status(400).send({message: "Error de pago"});
        }
        // Destinatario Voucher
        let correoVecino = Vecino["correo"];
        // Contenido de Voucher
        let nombreVecino = Vecino["name"];
        // Contenido mensaje
        let msgCorreo = `Estimado vecino ${nombreVecino}, se ha realizado el pago de cuentas`;

        if (!process.env.PW) {
            return res.status(400).send({message: "Error de token"})
        }
        // Comunicacion con el servidor SMPT
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", 
            port: 465,
            secure: true, //
            auth: {
            user: process.env.MAIL,
            pass: process.env.PW, // token de 'remitente
            },
        });

        // Envio de email
        let emailContent =  transporter.sendMail({
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


