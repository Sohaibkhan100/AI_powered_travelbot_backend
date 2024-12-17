import express from 'express';
import { getTours, addTour } from '../controllers/tour.controller.js';

const router = express.Router();

router.get('/gettours', getTours); 
router.post('/addtours', addTour); 

export default router;
