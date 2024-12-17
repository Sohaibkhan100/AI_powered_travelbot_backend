// import mongoose from 'mongoose';

// const transferSchema = new mongoose.Schema({
//   vehicleType: { type: String, required: true },
//   routeOptions: [{ type: String, required: true }],
//   price: { type: Number, required: true },
//   schedules: [{ type: String, required: true }],
// });

// export const transfer = mongoose.model('Transfer', transferSchema);
import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema({
  vehicleType: { type: String, required: true },
  from: { type: String, required: true },
  to:{ type: String, required: true },
  price: { type: Number, required: true },
  schedules: { type: Date, required: true },
  availability: { type: String, enum: ['Available', 'Unavailable'], required: true }, // Added availability
});

export const transfer = mongoose.model('Transfer', transferSchema);
