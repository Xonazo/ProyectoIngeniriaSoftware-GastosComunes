const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

//a
const mailerRoutes = require('./Routes/mailerRoutes')
const vecinoRoutes = require('./Routes/vecinoRoutes')
<<<<<<< Updated upstream
const RegistroRoutes = require('./Routes/RegistroRoutes')
=======
const condominioRoutes = require ('./Routes/houseRoutes')
const registroRoutes = require('./Routes/registroRoutes')
const notifyRoutes = require('./Routes/notifyRoutes')
const deudasRoutes = require('./Routes/deudasRoutes')
>>>>>>> Stashed changes

app.use(cors());
app.use(express.json());
app.options('*', cors());

app.use('/api', mailerRoutes);
app.use('/api', vecinoRoutes);
<<<<<<< Updated upstream
app.use('/api', RegistroRoutes);
=======
app.use('/api', condominioRoutes);
app.use('/api', registroRoutes);
app.use('/api', notifyRoutes);
app.use('/api', deudasRoutes);

// ComentarioMatias

//mongoose.set('useNewUrlParser', true);
//mongoose.set('useFindAndModify', false);
//mongoose.set('useCreateIndex', true);
//mongoose.set('useUnifiedTopology', true);



>>>>>>> Stashed changes

const options = {
    useNewUrlParser: true,
    autoIndex: true,
    keepAlive: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
    useUnifiedTopology: true
}


mongoose.connect(process.env.DB, options, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected to database")
    }

})

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
<<<<<<< Updated upstream
})
=======
})

//Descomentar cuando se vaya a implementar.

// cron.schedule('* * * * *', function (res){
//     request2('http://localhost:3001/api/notifyRoutes', function (error, response , body ) {
//     });
// });
>>>>>>> Stashed changes
