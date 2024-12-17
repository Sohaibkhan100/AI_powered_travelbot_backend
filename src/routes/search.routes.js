
import express from 'express';
import { searchHotel, searchTours,searchFlights, searchTransfers, globalSearch } from '../controllers/search.controller.js';

const router = express.Router();

router.post('/searchhotel', searchHotel);
router.post('/searchtour', searchTours);
router.post('/searchflight', searchFlights);
router.post('/searchtransfer', searchTransfers);
router.post('/globalsearch', globalSearch);




export default router;
