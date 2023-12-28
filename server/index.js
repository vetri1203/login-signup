import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Routes } from './Routes/Route.js';
const App = express();

dotenv.config();
App.use(cors());
App.use(Routes);
mongoose.connect(process.env.LOCAL_URl).then((result) => {
    console.log("App is connected to dataBase....");
}).catch((err) => {
    console.log("unable to connet with database!!!!");
});


App.listen(process.env.PORT_NO, () => {
    try {
        console.log(`App listening at ${process.env.PORT_NO}`);
    } catch (error) {
        console.log(error);
    } 
    
})

   