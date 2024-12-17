// import mongoose from 'mongoose';

// const flightSchema = new mongoose.Schema({
//   airline: { type: String, required: true },
//   schedules: [{ type: String, required: true }],
//   price: { type: Number, required: true },
//   stopovers: [{ type: String }],
//   class: { type: String, enum: ['Economy', 'Business', 'First'], required: true },
// });

// export const flight = mongoose.model('Flight', flightSchema);
import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  schedules: { type: Date, required: true }, // Ensure this is of type Date
  price: { type: Number, required: true },
  stopovers: { type: String },
  class: { type: String, enum: ['Economy', 'Business', 'First'], required: true },
  availability: { type: String, enum: ['Available', 'Unavailable'], required: true },
});

export const flight = mongoose.model('Flight', flightSchema);

