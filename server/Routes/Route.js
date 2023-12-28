import express from 'express';
import { test } from '../Component/test.js';
import { Login } from '../Component/Login.js';
import { Signup } from '../Component/Signup.js';


export const Routes = express.Router();

Routes.get('/', test);
Routes.post('/login', Login);
Routes.post('/signup', Signup);