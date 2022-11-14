const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const request2 = require('request');
const cron = require('node-cron');

const vecinoRoutes = require('./Routes/vecinoRoutes')
const condominioRoutes = require ('./Routes/condominioRoutes')
const RegistroRoutes = require('./Routes/RegistroRoutes')
const queryRoutes = require('./Routes/queryRoutes');


app.use(cors());
app.use(express.json());
app.options('*', cors());


app.use('/api', vecinoRoutes);
app.use('/api', condominioRoutes);
app.use('/api', RegistroRoutes);
app.use('/api', queryRoutes);

// ComentarioMatias

//mongoose.set('useNewUrlParser', true);
//mongoose.set('useFindAndModify', false);
//mongoose.set('useCreateIndex', true);
//mongoose.set('useUnifiedTopology', true);




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
})

cron.schedule('* 12 * * *', function (res){
    request2('http://localhost:3001/api/queryPrueba', function (error, response , body ) {
    });
});