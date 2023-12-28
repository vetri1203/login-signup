import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Routes } from './Routes/Route.js';

import bodyparser from 'body-parser'
import passport from 'passport';
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyparser.json());
// app.use(passport.initialize());
// app.use(passport.session());
app.use(Routes);
mongoose.connect(process.env.ATLAS_URL).then((result) => {
    console.log("app is connected to dataBase....");
}).catch((err) => { 
    console.log("unable to connet with database!!!!");
}); 


app.listen(process.env.PORT_NO, () => {
    try {
        console.log(`app listening at ${process.env.PORT_NO}`);
    } catch (error) {
        console.log(error);
    } 
    
})

   