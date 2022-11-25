const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const request2 = require('request');
const cron = require('node-cron');

const userRoutes = require('./Routes/userRoutes')
const houseRoutes = require ('./Routes/houseRoutes')
const RegistroRoutes = require('./Routes/RegistroRoutes')

app.use(cors());
app.use(express.json());
app.options('*', cors());


app.use('/api', userRoutes);
app.use('/api', houseRoutes);
app.use('/api', RegistroRoutes);

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
