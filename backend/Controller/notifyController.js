const mongoose = require('mongoose')
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();
/* Importamos modelos */
const registroPago = require('../models/Registro');
const vecino = require('../models/vecino');

const notify = (req, res)=>{
    // Obtenemos fecha actual (Date)
    const date_time = new Date();
    // Obtenemos el mes de la fecha actual (Number)
    const mes = date_time.getMonth()+1;
    // Obtenemos el anio de la fecha actual (Number)
    const ano = date_time.getFullYear();
    // Obtenemos el dia de la fecha actual (Number)
    const day = date_time.getDate();
    // Declaracion de fecha de pago
    const paydate = new Date(`${ano}-${mes}-04`);
    // Obtenemos el dia de la fecha de pago
    const payday = paydate.getDate()+1;

    // Aviso general para todos los vecinos
    if ( day < payday) {
        // Buscamos todos los vecinos existentes
        vecino.find({}, (error, vecino) => {
            if (error) {
                return res.status(400).send({ message: "No se pudo realizar la busqueda" })
            }
            
            // Recorremos el documento de vecinos, para obtener el nombre y correo de cada uno.
            vecino.forEach(element => {
                let nombreVecino = element["name"];
                let correoVecino = element["correo"];
                let msgCorreo = `Estimado vecino ${nombreVecino},recordamos que se acerca la fecha de pago mensual de gastos comunes`;

                // Declaramos el token y mail de remitente.
                const token = process.env.PW
                const mail = 'matias.san1901@alumnos.ubiobio.cl'

                // Si el token no existe, retorna un estado 400: ERROR!
                if (!token) {
                    return res.status(400).send({ message: "Nos se ha entregado la contraseña de aplicacion para el correo" })
                }

                // Creamos un objeto "transporter" reutilizable con los siguientes parametros predeterminados
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com", 
                    port: 465,
                    secure: true, //
                    auth: {
                    user: mail, // mail 'remitente'
                    pass: token, // token de 'remitente
                    },
                });

                // Enviamos correo con el transporter reutilizable
                let info =  transporter.sendMail({
                    from: '"Serv. Administracion de Gastos Comunes 🏘" <condominio@ubb.com>', // sender address
                    to: correoVecino, // Lista de destinarios, debe ir la variable de "correoVecino" 
                    subject: "Notificacion de pago mensual de gastos comunes", // Subject line
                    text: msgCorreo, // Mensaje de Notificacion de fecha de pago, cuerpo de texto sin formato.
                    html: "<b>"+msgCorreo+ "</b>" // Cuerpo HTML
                });
            });
            return res.status(200).send(vecino)
        })
    }
    if ( day > payday) {
        // Declaracion de rango inicial del mes
        const fechaInicio = new Date(`${ano}-${mes}-1`);
        // Declaracion de rango final del mes
        const fechaFin = new Date(`${ano}-${mes+1}-01`);

        const calcDiff = date_time - paydate;
        const dayDiff = Math.trunc(calcDiff/(1000*60*60*24));

        let ArrayVecinos = [];

        // Seleccion de registros presentes entre la fechaInicio y fechaFin.
        // $gte = Mayor o igual que... ; $lte: menor o igual que...
        registroPago.find( {fechaPago : {$gte: fechaInicio, $lte : fechaFin} }, (error, registro) =>{
            if (error) {
                return res.status(400).send({ message: "No se pudo realizar la busqueda"});
            }

            //Recorremos el registros para obtener valor de las propiedades "idVecino" y "fechaPago" de cada elemento.
            registro.forEach( element =>{
                let idVecino = element["idVecino"];
                let fechaPago = element["fechaPago"];
                ArrayVecinos.push(idVecino._id.toString());
            });

            //A los vecinos que no pertenezcan al Array es porque no presentaron pagos, se le envia correo.
            // $nin = No dentro de ...
            vecino.find({ _id : {$nin: ArrayVecinos } }, (error, registro) =>{
                if (error) {
                    return res.status(400).send({ message: "No se pudo realizar la busqueda"});
                }
                registro.forEach(element =>{
                    let nombreVecino = element["name"];
                    let correoVecino = element["correo"];
                    let msgCorreo = `Estimado vecino ${nombreVecino}, su cuenta presenta ${dayDiff} dias de atraso de pago mensual. `;

                    const mail = process.env.MAIL;
                    const token = process.env.PW;
                    if (!token) {
                        return res.status(400).send({ message: "El token es incorrecto"});
                    }

                    // Creamos un objeto "transporter" reutilizable con los siguientes parametros predeterminados
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true, // true for 465, false for other ports
                        auth: {
                        user: mail, // generated ethereal user
                        pass: token, // generated ethereal password
                        },
                    });

                    // Enviamos correo con el transporter reutilizable
                    let info =  transporter.sendMail({
                        from: '"Serv. Administracion de Gastos Comunes 🏘" <condominio@ubb.com>', // sender address
                        to: correoVecino, // Lista de destinarios, debe ir la variable de "correoVecino" 
                        subject: "Notificacion de atraso de pago mensual de gastos comunes", // Subject line
                        text: msgCorreo, // Mensaje de Notificacion de atraso de pago, cuerpo de texto sin formato.
                        html: "<h1> NOTIFICACION DE ATRASO</h1> <b>"+msgCorreo+ "</b>" // Cuerpo HTML
                    });
                })
            })
        })
    }
}


module.exports = {
    notify
}