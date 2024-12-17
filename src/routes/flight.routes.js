import express from 'express';
import { getFlights, addFlight } from '../controllers/flight.controller.js';

const router = express.Router();

router.get('/getflights', getFlights); // Fetch all flights
router.post('/addflights', addFlight); // Add a new flight

export default router;
