// import mongoose from 'mongoose';

// const hotelSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   price: { type: Number, required: true },
//   availability: { type: String, enum: ['Available', 'Unavailable'], required: true },
//   amenities: [{ type: String }],
//   reviews: [
//     {
//       user: { type: String },
//       rating: { type: Number, min: 0, max: 5 },
//       comment: { type: String },
//     },
//   ],
// });

// export const hotel = mongoose.model('Hotel', hotelSchema);
import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: String, enum: ['Available', 'Unavailable'], required: true }, // Consistent with others
  amenities: [{ type: String }],
  reviews: [
    {
      user: { type: String },
      rating: { type: Number, min: 0, max: 5 },
      comment: { type: String },
    },
  ],
});

export const hotel = mongoose.model('Hotel', hotelSchema);
