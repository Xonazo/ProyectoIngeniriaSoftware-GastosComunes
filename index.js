const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

//a
const notifyRoutes = require('./Routes/notifyRoutes')
const vecinoRoutes = require('./Routes/vecinoRoutes')
const RegistroRoutes = require('./Routes/registroRoutes')
const fileRoutes = require('./Routes/fileRoutes')
const condominioRoutes = require('./Routes/condominioRoutes')

app.use(cors());
app.use(express.json());
app.options('*', cors());

app.use('/api', mailerRoutes);
app.use('/api', vecinoRoutes);
app.use('/api', RegistroRoutes);

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