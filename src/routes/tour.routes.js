import express from 'express';
import { getTours, addTour } from '../controllers/tour.controller.js';

const router = express.Router();

router.get('/gettours', getTours); // Fetch all tours
router.post('/addtours', addTour); // Add a new tour

export default router;
