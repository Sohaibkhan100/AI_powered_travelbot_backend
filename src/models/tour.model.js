// import mongoose from 'mongoose';

// const tourSchema = new mongoose.Schema({
//   itinerary: { type: String, required: true },
//   price: { type: Number, required: true },
//   availability: { type: String, enum: ['Available', 'Unavailable'], required: true },
//   duration: { type: String, required: true },
// });

// export const tour = mongoose.model('Tour', tourSchema);
import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  itinerary: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: String, enum: ['Available', 'Unavailable'], required: true }, // Consistent with others
  duration: { type: String, required: true },
});

export const tour = mongoose.model('Tour', tourSchema);
