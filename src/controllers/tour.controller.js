import {tour} from '../models/tour.model.js';

// Get all tours
export const getTours = async (req, res) => {
  try {
    const tours = await tour.find();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new tour
export const addTour = async (req, res) => {
  try {
    const newTour = new tour(req.body);
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
