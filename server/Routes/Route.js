import express from 'express';
import { test } from '../Component/test.js';


export const Routes = express.Router();

Routes.get('/', test);