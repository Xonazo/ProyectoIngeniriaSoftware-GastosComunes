const User = require('../models/user');
const Deudas = require('../models/deudas');
const { SchemaType } = require('mongoose');
const Registro = require('../models/Registro');
const registroPago = require('../models/Registro');
const user = require('../models/user');
const { createToken } = require('../services/token');


User.findOne({ correo: "admin@gmail.com" }, (error, user) => {
    if (error) {
        console.error("Error al buscar al usuario administrador:", error);
    } else if (!user) {
        // Usuario administrador no encontrado, se crea
        const adminUser = new User({
            name: "Admin",
            rut: "11111111-1",
            correo: "admin@gmail.com",
            numeroVivienda: 0,
            personasConvive: 0,
            role: "admin"
        });

        adminUser.save((error, user) => {
            if (error) {
                console.error("Error al crear al usuario administrador:", error);
            } else {
                console.log("Usuario administrador creadocorrectamente");
            }
        });
    } else {
        console.log("Usuario administrador ya existe, no se crea");
    }
});

const createUser = (req, res) => {
    const { name, rut, correo, numeroVivienda, personasConvive, role } = req.body;
    const newUser = new User({
        name,
        rut,
        correo,
        numeroVivienda,
        personasConvive,
        role
    })
     if (rut.length < 11) {
        return res.status(400).send({ message: "El RUT debe tener al menos 11 caracteres" });
      }
    newUser.save((error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido crear al Usuario" });
        }
        // Crear la nueva deuda solo si no hay errores al crear al usuario
        const newDeudas = new Deudas({
            idvecino: newUser._id,
            deuda: 30000,
            abono: 0
        })
        newDeudas.save((error, deudas) => {
            if (error) {
                return res.status(400).send({ message: "No se ha crear la deuda" });
            }
        })
        return res.status(201).send(user)
    })
}
const getUser = (req, res) => {

    User.find({}, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }

        return res.status(200).send(user)
    })
}
const updateUser = (req, res) => {
    const { id } = req.params
    User.findByIdAndUpdate(id, req.body, (error, user) => {

        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar el usuario" });
        }

        if (!user) {
            return res.status(404).send({ message: "No se encontro al usuario" })
        }
        return res.status(200).send({ message: "Usuario modificado" })
    })

}

const deleteUser = (req, res) => {
    const { id } = req.params
    User.findByIdAndDelete(id, req.body, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo encontrar al usuario" })
        }
        if (!user) {
            return res.status(400).send({ message: "No se pudo eliminar el usuario" })
        }
        return res.status(200).send({ message: "Se ha eliminado al usuario" })
    })

}

const getOneUser = (req, res) => {
    const { id } = req.params
    User.findById(id, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        if (!user) {
            return res.status(404).send({ message: "No se encontro al usuario" })
        }
        return res.status(200).send(user)
    })
}

const getUsersNoPay = (req, res) => {
    const date_time = new Date();
    const mes = date_time.getMonth() + 1;
    const ano = date_time.getFullYear();
    const fechaInicio = new Date(`${ano}-${mes}-1`);
    const fechaFin = new Date();
    fechaFin.setFullYear(ano, mes, 0)
    let ArrayUser = [];

    registroPago.find({ fechaRegistro: { $gte: fechaInicio, $lte: fechaFin } }, (error, registro) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" });
        }
        //Recorremos el registros para obtener valor de las propiedades "idVecino" y "fechaRegistro" de cada elemento.
        registro.forEach(element => {
            let idUser = element["regidVecino"];
            ArrayUser.push(idUser._id.toString());
        })
        user.find({ _id: { $nin: ArrayUser } }, (error, registro) => {
            if (error) {
                return res.status(400).send({ message: "No se pudo realizar la busqueda" });
            }
            return res.status(200).send(registro)
        })
    })
}

const getUsersPay = (req, res) => {
    const date_time = new Date();
    const mes = date_time.getMonth() + 1;
    const ano = date_time.getFullYear();
    const fechaInicio = new Date(`${ano}-${mes}-1`);
    const fechaFin = new Date();
    fechaFin.setFullYear(ano, mes, 0)
    let ArrayUser = [];

    registroPago.find({ fechaRegistro: { $gte: fechaInicio, $lte: fechaFin } }, (error, registro) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" });
        }
        //Recorremos el registros para obtener valor de las propiedades "idVecino" y "fechaRegistro" de cada elemento.
        registro.forEach(element => {
            let idUser = element["regidVecino"];
            ArrayUser.push(idUser._id.toString());
        })

        //A los vecinos que no pertenezcan al Array es porque no presentaron pagos, se le envia correo.
        // $nin = No dentro de ...
        user.find({ _id: { $in: ArrayUser } }, (error, registro) => {
            if (error) {
                return res.status(400).send({ message: "No se pudo realizar la busqueda" });
            }
            return res.status(200).send(registro)
        })
    })
}

const getAll = (req, res) => {
    const { id } = req.params
    User.findById(id, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        if (!user) {
            return res.status(404).send({ message: "No se encontro al usuario" })
        }
        // return res.status(200).send(user)
        Deudas.find({ idvecino: id }, (error, deudas) => {
            if (error) {
                return res.status(400).send({ message: "No se pudo realizar la busqueda" })
            }
            if (!Deudas) {
                return res.status(404).send({ message: "No se encontro al usuario" })
            }
            return res.status(200).send({ user, deudas })
        })
    })
}

const login = (req, res) => {
    const { correo } = req.body;
    User.findOne({ correo }, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        if (!user) {
            return res.status(400).send({ message: "El usuario no existe" })
        }
        res.cookie("token", createToken(user), { httpOnly: true })
        return res.status(200).send({ message: "Se ha logeado correctamente", token: createToken(user), user: user.name, role: user.role, id: user._id })
    })
}


const checkToken = (req, res) => {
    return res.status(200).send({ message: "Token valido" })

}

const logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).send({ message: "Se ha cerrado la sesion correctamente" })
}


const deleteCascade = (req, res) => {
    const { id } = req.params
    User.findByIdAndDelete(id, req.body, (error, user) => {

        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar el usuario" });
        }
        if (!user) {
            return res.status(404).send({ message: "No se encontro al usuario" })
        }


    })
    Deudas.deleteMany({ idvecino: id }, (error, deudas) => {

        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar el usuario" });
        }
        if (!deudas) {
            return res.status(404).send({ message: "No se encontro al usuario" })
        }

    })

    Registro.deleteMany({ regidVecino: id }, (error, Registro) => {

        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar el usuario" });
        }
        if (!Registro) {
            return res.status(404).send({ message: "No se encontro al usuario" })
        }


    })
    return res.status(200).send({ message: "Usuario modificado" })
}



module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getOneUser,
    getUsersNoPay,
    getUsersPay,
    getAll,
    login,
    logout,
    checkToken,
    deleteCascade
}
