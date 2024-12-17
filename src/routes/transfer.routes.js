import express from 'express';
import { getTransfers, addTransfer } from '../controllers/transfer.controller.js';

const router = express.Router();

router.get('/gettransfers', getTransfers); 
router.post('/addtransfers', addTransfer); 

export default router;
