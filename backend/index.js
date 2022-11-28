const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const userRoutes = require('./Routes/userRoutes')
const registroRoutes = require('./Routes/RegistroRoutes')
const deudasRoutes = require('./Routes/deudasRoutes');
const notifyRoutes = require('./Routes/notifyRoutes')
const fileRoutes = require('./Routes/fileRoutes');



app.use(cors());
app.use(express.json());
app.options('*', cors());


app.use('/api', userRoutes);
app.use('/api', registroRoutes);
app.use('/api', deudasRoutes);
app.use('/api', notifyRoutes);
app.use('/api', fileRoutes);

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