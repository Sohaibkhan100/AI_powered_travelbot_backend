import {hotel} from '../models/hotel.model.js';

export const getHotels = async (req, res) => {
  try {
    const hotels = await hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addHotel = async (req, res) => {
  try {
    const newHotel = new hotel(req.body);
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
