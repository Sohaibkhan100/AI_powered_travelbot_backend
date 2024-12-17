import express from 'express';
import { getFlights, addFlight } from '../controllers/flight.controller.js';

const router = express.Router();

router.get('/getflights', getFlights); 
router.post('/addflights', addFlight); 

export default router;
