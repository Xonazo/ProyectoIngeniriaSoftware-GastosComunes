const mongoose = require('mongoose')
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();
/* Importamos modelos */
const registroPago = require('../models/Registro');
const user = require('../models/user');

    /* Variables globales */
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

// Declaracion de objeto transporter "Reutilizable"
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    port: 465,
    secure: true, //
    auth: {
    user: process.env.MAIL, // mail 'remitente'
    pass: process.env.PW // token de 'remitente
    },
});

const notify = (req, res)=>{
    // Aviso general para todos los vecinos de fecha de pago
    if ( day < payday) {
        // Buscamos todos los vecinos existentes
        user.find({}, (error, user) => {
            if (error) {
                return res.status(400).send({ message: "No se pudo realizar la busqueda" })
            }
            // Recorremos el documento de vecinos, para obtener el nombre y correo de cada uno.
            user.forEach( element => {
                let nameUser = element["name"];
                console.log(nameUser);
                let correoUser = element["correo"];
                let msgCorreo = `Estimado ${nameUser},recordamos que se acerca la fecha de pago mensual de gastos comunes`;

                // Si el token no existe, error
                if (!process.env.PW) {
                    return res.status(400).send({ message: "Nos se ha entregado la contraseña de aplicacion para el correo" })
                }
                // Enviamos correo con el transporter reutilizable
                let info =  transporter.sendMail({
                    from: '"Serv. Administracion de Gastos Comunes 🏘" <condominio@ubb.com>', // sender address
                    to: correoUser, // Lista de destinarios, debe ir la variable de "correoVecino" 
                    subject: "Notificacion de pago mensual de gastos comunes", // Subject line
                    text: msgCorreo, // Mensaje de Notificacion de fecha de pago, cuerpo de texto sin formato.
                    html: "<b>"+msgCorreo+ "</b>" // Cuerpo HTML
                });
            });
        })
        return res.status(200).send({ message: "Se ha notificado la fecha proxima de pago a todos los usuarios." })
    }


    //Aviso general para todos los que no han efectuado un pago.
    if ( day > payday) {
        // Declaracion de rango inicial del mes
        const fechaInicio = new Date(`${ano}-${mes}-1`);
        // Declaracion de rango final del mes
        const fechaFin = new Date(`${ano}-${mes+1}-01`);

        const calcDiff = date_time - paydate;
        const dayDiff = Math.trunc(calcDiff/(1000*60*60*24));

        let ArrayUser = [];

        // Seleccion de registros presentes entre la fechaInicio y fechaFin.
        // $gte = Mayor o igual que... ; $lte: menor o igual que...
        registroPago.find( {fechaRegistro : {$gte: fechaInicio, $lte : fechaFin} }, (error, registro) =>{
            if (error) {
                return res.status(400).send({ message: "No se pudo realizar la busqueda"});
            }
            //Recorremos el registros para obtener valor de las propiedades "idVecino" y "fechaRegistro" de cada elemento.
            registro.forEach( element =>{
                let idUser = element["regidVecino"];
                ArrayUser.push(idUser._id.toString());
            })

            //A los vecinos que no pertenezcan al Array es porque no presentaron pagos, se le envia correo.
            // $nin = No dentro de ...
            user.find({ _id : {$nin: ArrayUser } }, (error, registro) =>{
                if (error) {
                    return res.status(400).send({ message: "No se pudo realizar la busqueda"});
                }
                registro.forEach(element =>{
                    let nombreVecino = element["name"];
                    let correoVecino = element["correo"];
                    let msgCorreo = `Estimado ${nombreVecino}, su cuenta presenta ${dayDiff} dias de atraso de pago mensual. `;

                    if (!process.env.PW) {
                        return res.status(400).send({ message: "Nos se ha entregado la contraseña de aplicacion para el correo" })
                    }
                    // Enviamos correo con el transporter reutilizable
                    let info =  transporter.sendMail({
                        from: '"Serv. Administracion de Gastos Comunes 🏘" <condominio@ubb.com>', // sender address
                        to: correoVecino, // Lista de destinarios, debe ir la variable de "correoVecino" 
                        subject: "Notificacion de atraso de pago mensual de gastos comunes", // Subject line
                        text: msgCorreo, // Mensaje de Notificacion de atraso de pago, cuerpo de texto sin formato.
                        html: "<h1> NOTIFICACION DE ATRASO</h1> <b>"+msgCorreo+ "</b>" // Cuerpo HTML
                    });
                })
                return res.status(200).send({ message: "Se ha informado a todo user que no ha realizado su pago." })
            })
        })
    }
}

const notifyUser = (req, res) => {
    const { id } = req.params
    //Diferencia de dias entre fecha actual y fecha de pago.
    const calcDiff = date_time - paydate;
    const dayDiff = Math.trunc(calcDiff/(1000*60*60*24));

    user.findById( id, (error, data) =>{
        if (error) {
            return res.status(400).send({ message: "No se encontro el usuario"})
        }
        if (!data) {
            return res.status(404).send({ message: "No se encontro al user" })
        }
        //Obtenemos los valores de propiedades del usuario
        let nameUser = data["name"];
        let emailUser = data["correo"];
        // Verificacion de token correcto
        if (!process.env.PW) {
            return res.status(400).send({ message: "Nos se ha entregado la contraseña de aplicacion para el correo" })
        }
        //Si aun no es el dia de pago
        if (day < payday) {
            let msg = `Estimado ${nameUser}, recordamos que la fecha de compromiso de pago ${payday}-${mes}-${ano} se encuentra proxima, ${dayDiff} dias restantes, si ya has efectuado el pago, haz caso omiso a este mensaje.`

            let info =  transporter.sendMail({
                from: '"Serv. Administracion de Gastos Comunes 🏘" <condominio@ubb.com>', // sender address
                to: emailUser, // Lista de destinarios, debe ir la variable de "correoVecino" 
                subject: "Notificacion fecha de pago proxima", // Subject line
                text: msg, // Mensaje de Notificacion de fecha de pago, cuerpo de texto sin formato.
                html: "<b>"+msg+ "</b>" // Cuerpo HTML
            });
            return res.status(200).send({ message: "Se ha informado la fecha de pago proxima" })
        }
        //Si la fecha de pago ya paso
        if (day > payday) {
            let msg = `Estimado ${nameUser}, informamos que has sobrepasado la fecha limite de pago de cuenta (${payday}-${mes}-${ano}), el atraso es de ${dayDiff} dias. Favor ponerse al dia con su deuda para evitar corte de servicio.`

            let info =  transporter.sendMail({
                from: '"Serv. Administracion de Gastos Comunes 🏘" <condominio@ubb.com>', // sender address
                to: emailUser, // Lista de destinarios, debe ir la variable de "correoVecino" 
                subject: "Notificacion fecha de pago proxima", // Subject line
                text: msg, // Mensaje de Notificacion de fecha de pago, cuerpo de texto sin formato.
                html: "<b>"+msg+ "</b>" // Cuerpo HTML
            });
            return res.status(200).send({ message: "Se ha informado la fecha de atraso." })
        }
    })
}

module.exports = {
    notify,
    notifyUser
}