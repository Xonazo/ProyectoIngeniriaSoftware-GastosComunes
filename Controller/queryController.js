const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');
const request2 = require('request');

const Registro = require('../models/Registro');

/* Importamos modelos */
const registroPago = require('../models/Registro');
const vecino = require('../models/vecino');


const options = {
    useNewUrlParser: true,
    autoIndex: true,
    keepAlive: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
    useUnifiedTopology: true
}

/* Conexion mongoose a la BBDD */
mongoose.connect(process.env.DB, options, (error) => {
    if (error) {
        console.log(error);
    } else {
        // console.log("Connected to database")
    }

})

const getPrueba = (req, res)=>{
    // Fecha de pago(Numero dia), igual para todo vecino = 4
    const fechaPago = 4;
    // Obteniendo fecha actual (Date)
    const date_time = new Date();
    // Obteniendo dia de la fecha actual (Number)
    const dia = date_time.getDate();

    // Si el dia de la fecha actual es "1", debe de enviar un correo a todos los vecinos del condominio
    if (dia == 1) {
        // Buscamos todos los vecinos existentes
        vecino.find({}, (error, vecino) => {
            if (error) {
                return res.status(400).send({ message: "No se pudo realizar la busqueda" })
            }
            
            // Recorremos el documento de vecinos, para obtener el nombre y correo de cada uno.
            vecino.forEach(element => {
                let nombreVecino = element["name"];
                let correoVecino = element["correo"];
                let msgCorreo = `Estimado vecino ${nombreVecino}, le recordamos la fecha de pago de los gastos comunes para este mes`;

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

    // Si el dia de la fecha actual es >"4", se envia un correo a todo vecino que no presente pago en el mes actual.
    if (dia > 4) {
        // Obtenemos fecha actual (Date)
        const date_time = new Date();
        // Obtenemos el mes de la fecha actual (Number)
        const mes = date_time.getMonth()+1;
        // Obtenemos el anio de la fecha actual (Number)
        const ano = date_time.getFullYear();

        // Declaracion de fecha de inicio de cada mes.
        const fechaInicio = `${ano}-${mes}-01`
        // Declaracion de fecha de fin de cada mes.
        const fechaFin = `${ano}-${mes}-30`

        // Array que almacenara documento de todos los vecinos encontrados.
        let ArrayVecinos = [];

        //Busqueda de fechaPago que se encuentre entre [ fechaInicio , fechaFin ]
        registroPago.find({fechaPago : { $gte: fechaInicio, $lte : fechaFin } }, (error, registro) => {
            if (error) {
                return res.status(400).send({ message: "No se pudo realizar la busqueda" })
            }

            // Recorremos el registro para obtener los elementos "idVecino" y "fechaPago" de cada uno.
            registro.forEach(element => {
                let idVecino = element["idVecino"];
                let fechaPago = element["fechaPago"];

                // Array de vecinos, almacena todos los vecinos que han pagado entre  [fechaInicio y la fechaFin]
                ArrayVecinos.push(idVecino._id.toString());
            });


            // Busqueda de vecinos que no pertenezcan al ArrayVecinos; si no pertenecen a este es porque no presentaron
            // pago alguno en el periodo actual, por lo tanto se debe enviar un correo a todos ellos.
            vecino.find({_id : { $nin: ArrayVecinos } }, (error, registro) => {
                if (error) {
                    return res.status(400).send({ message: "No se pudo realizar la busqueda" })
                }

                // Recorremos el registro de los vecinos que no pertenecen a ArrayVecinos para obtener nombreVecino y correoVecino
                registro.forEach(element => {
                    let nombreVecino = element["name"];
                    let correoVecino = element["correo"];
                    // msgCorreo: Texto sin cuerpo que se enviara a traves de
                    let msgCorreo = `Estimado vecino ${nombreVecino}, El Serv. Administracion de Gastos Comunes informa que su cuenta presenta atraso de pago. `;

                    // Declaramos el token y mail de remitente.
                    const token = process.env.PW
                    const mail = 'matias.san1901@alumnos.ubiobio.cl'
                    // Si el token no existe, retorna un estado 400: ERROR!
                    if (!token) {
                        return res.status(400).send({ message: "No se ha generado el mail de deuda" })
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

                        
                });
    
            })

        })

    }
}




module.exports = {
    getPrueba
}