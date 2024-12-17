import express from 'express';
import { getHotels, addHotel } from '../controllers/hotel.controller.js';

const router = express.Router();

router.get('/gethotels', getHotels); // Fetch all hotels
router.post('/addhotels', addHotel); // Add a new hotel

export default router;
