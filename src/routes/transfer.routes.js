import express from 'express';
import { getTransfers, addTransfer } from '../controllers/transfer.controller.js';

const router = express.Router();

router.get('/gettransfers', getTransfers); // Fetch all transfers
router.post('/addtransfers', addTransfer); // Add a new transfer

export default router;
