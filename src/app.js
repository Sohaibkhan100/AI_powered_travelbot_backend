import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './routes/user.route.js';
import hotelRoutes from './routes/hotel.routes.js';
import transferRoutes from './routes/transfer.routes.js';
import tourRoutes from './routes/tour.routes.js';
import flightRoutes from './routes/flight.routes.js';
import searchRoutes from './routes/search.routes.js';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/v1/user", userRoute);
app.use('/v1/hotels', hotelRoutes);
app.use('/v1/transfers', transferRoutes);
app.use('/v1/tours', tourRoutes);
app.use('/v1/flights', flightRoutes);
app.use('/v1/search', searchRoutes);






app.use((req, res, next) => {
    res.status(404).json({
        error: "Bad request"
    });
});

app.use((req, res, next) => {
    res.status(200).json({
        message: "App is running"
    });
});

export { app };
