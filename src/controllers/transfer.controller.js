import {transfer} from '../models/transfer.model.js';

// Get all transfers
export const getTransfers = async (req, res) => {
  try {
    const transfers = await transfer.find();
    res.status(200).json(transfers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new transfer
export const addTransfer = async (req, res) => {
  try {
    const newTransfer = new transfer(req.body);
    await newTransfer.save();
    res.status(201).json(newTransfer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
