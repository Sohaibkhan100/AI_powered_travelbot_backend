import {flight} from '../models/flight.model.js';

export const getFlights = async (req, res) => {
  try {
    const flights = await flight.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFlight = async (req, res) => {
  try {
    const newFlight = new flight(req.body);
    await newFlight.save();
    res.status(201).json(newFlight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
