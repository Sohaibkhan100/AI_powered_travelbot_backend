import express from 'express';
import { getHotels, addHotel } from '../controllers/hotel.controller.js';

const router = express.Router();

router.get('/gethotels', getHotels); 
router.post('/addhotels', addHotel); 

export default router;
