import { hotel } from "../models/hotel.model.js";
import { tour } from "../models/tour.model.js";
import { flight } from "../models/flight.model.js";
import { transfer } from "../models/transfer.model.js";


export const searchTours = async (req, res) => {
  try {
    const { budget } = req;

    // Ensure the budget parameter is provided
    if (!budget) {
      return res.status(400).json({ message: "Budget is required." });
    }

    // Convert budget to a number
    const budgetAmount = parseFloat(budget);

    // Check if budget is a valid number
    if (isNaN(budgetAmount)) {
      return res.status(400).json({ message: "Invalid budget value." });
    }

    // Step 1: Fetch all tours from the database
    const allTours = await tour.find();

    // Step 2: Filter tours based on the budget
    const affordableTours = allTours.filter(
      (tour) => tour.price <= budgetAmount
    );

    if (affordableTours.length === 0) {
      return res.status(200).json({
        message:
          "Please increase your budget a little bit to explore good options.",
      });
    }

    // Return the filtered tours
    return res.status(200).json({ tours: affordableTours });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};
export const searchTransfers = async (req, res) => {
    try {
      const { schedules, from, to, budget } = req;
  
      if (!schedules || !from || !to || !budget) {
        return res.status(400).json({
          message: "Date, from, to, and budget are required in the request body.",
        });
      }
  
      const trimmedFrom = from.trim().toLowerCase();
      const trimmedTo = to.trim().toLowerCase();
  
      const parsedDate = new Date(schedules);
      if (isNaN(parsedDate)) {
        return res
          .status(400)
          .json({ message: "Invalid date format. Use YYYY-MM-DD." });
      }
  
      const startOfDay = new Date(parsedDate.setUTCHours(0, 0, 0, 0));
      const endOfDay = new Date(parsedDate.setUTCHours(23, 59, 59, 999));
  
      const dateMatchedTransfers = await transfer.find({
        schedules: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });
  
      if (dateMatchedTransfers.length === 0) {
        return res.status(404).json({
          message: "We don't have any transfers available on this date.",
        });
      }
  
      const fromMatchedTransfers = dateMatchedTransfers.filter(
        (transfer) => transfer.from.toLowerCase() === trimmedFrom
      );
  
      if (fromMatchedTransfers.length === 0) {
        return res.status(404).json({
          message: `We don't have any transfers from ${trimmedFrom} on this date.`,
        });
      }
  
      const toMatchedTransfers = fromMatchedTransfers.filter(
        (transfer) => transfer.to.toLowerCase() === trimmedTo
      );
  
      if (toMatchedTransfers.length === 0) {
        return res.status(404).json({
          message: `We don't have any transfers to ${trimmedTo} on this date.`,
        });
      }
  
      const budgetMatchedTransfers = toMatchedTransfers.filter(
        (transfer) => transfer.price <= budget
      );
  
      if (budgetMatchedTransfers.length === 0) {
        return res.status(200).json({
          message: "Please increase your budget.",
        });
      }
  
      return res.status(200).json({ transfers: budgetMatchedTransfers });
    } catch (error) {
      console.error("Error searching for transfers:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while searching for transfers." });
    }
  };
export const searchFlights = async (req, res) => {
  try {
    const { schedules, stepover, budget } = req;

    if (!schedules) {
      return res
        .status(400)
        .json({ message: "Date is required in the request body." });
    }

    if (!stepover) {
      return res
        .status(400)
        .json({ message: "Stepover is required in the request body." });
    }

    if (budget === undefined) {
      return res
        .status(400)
        .json({ message: "Budget is required in the request body." });
    }

    const parsedDate = new Date(schedules);
    if (isNaN(parsedDate)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

    const startOfDay = new Date(parsedDate.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setUTCHours(23, 59, 59, 999));

    const normalizedStepover = stepover.toLowerCase();

    const flights = await flight.find({
      schedules: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      stopovers: { $regex: new RegExp(`^${normalizedStepover}$`, "i") },
    });

    if (flights.length === 0) {
      return res.status(404).json({
        message: `We don't have any flights to ${stepover} for this date.`,
      });
    }

    const filteredFlights = flights.filter((flight) => flight.price <= budget);

    if (filteredFlights.length === 0) {
      return res.status(200).json({
        message:
          "We do have flights for this date and stepover, but please increase your budget.",
      });
    }

    return res.status(200).json({ flights: filteredFlights });
  } catch (error) {
    console.error("Error searching for flights:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while searching for flights." });
  }
};


export const searchHotel = async (req, res) => {
    try {
      const { location, budget } = req;
  
      if (!location || !budget) {
        return res
          .status(400)
          .json({ message: "Location and budget are required." });
      }
  
      const budgetAmount = parseFloat(budget);
  
      if (isNaN(budgetAmount)) {
        return res.status(400).json({ message: "Invalid budget value." });
      }
  
      const hotelsByLocation = await hotel.find({
        location: new RegExp(location, "i"),
      });
  
      if (hotelsByLocation.length === 0) {
        return res.status(404).json({
          message:
            "We currently don’t have any hotels available in this area. Please check in nearby locations.",
        });
      }
  
      const filteredHotels = hotelsByLocation.filter(
        (hotel) => hotel.price <= budgetAmount
      );
  
      if (filteredHotels.length === 0) {
        return res.status(200).json({
          message:
            "Please increase your budget a little bit to see available hotels.",
        });
      }
  
      return res.status(200).json({ hotels: filteredHotels });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again later." });
    }
  };
  export const globalSearch = async (req, res) => {
    try {
      const { intentType } = req.body;
      console.log(intentType);
  
      if (!intentType || !Array.isArray(intentType) || intentType.length === 0) {
        return res.status(400).json({
          message:
            "intentType body parameter is required and should be a non-empty array.",
        });
      }
  
      const results = {};
  
      const handleHotelSearch = async (location, budget) => {
        return await new Promise((resolve, reject) => {
          searchHotel(
            { location, budget },
            {
              status: (statusCode) => ({
                json: (data) =>
                  resolve(
                    data.hotels || data
                  ),
              }),
            }
          );
        });
      };
  
      const handleFlightSearch = async (schedules, stepover, budget) => {
        return await new Promise((resolve, reject) => {
          searchFlights(
            { schedules, stepover, budget },
            {
              status: (statusCode) => ({
                json: (data) =>
                  resolve(
                    data.flights || data
                  ),
              }),
            }
          );
        });
      };
  
      const handleTourSearch = async (budget) => {
        return await new Promise((resolve, reject) => {
          searchTours(
            { budget },
            {
              status: (statusCode) => ({
                json: (data) =>
                  resolve(
                    data.tours || data
                  ),
              }),
            }
          );
        });
      };
  
      const handleTransferSearch = async (schedules, from, to, budget) => {
        return await new Promise((resolve, reject) => {
          searchTransfers(
            { schedules, from, to, budget },
            {
              status: (statusCode) => ({
                json: (data) =>
                  resolve(
                    data.transfers || data
                  ),
              }),
            }
          );
        });
      };
  
      for (const intent of intentType) {
        switch (intent) {
          case "Hotel_search":
            if (
              !req.body.Hotel_search ||
              !req.body.Hotel_search.location ||
              !req.body.Hotel_search.budget
            ) {
              return res.status(400).json({
                message: "Missing required parameters for Hotel_search.",
              });
            }
            const { location, budget } = req.body.Hotel_search;
            results.hotels = await handleHotelSearch(location, budget);
            break;
  
          case "Flight_search":
            if (
              !req.body.Flight_search ||
              !req.body.Flight_search.schedules ||
              !req.body.Flight_search.stepover ||
              !req.body.Flight_search.budget
            ) {
              return res.status(400).json({
                message: "Missing required parameters for Flight_search.",
              });
            }
            const { schedules, stepover, budget: flightBudget } = req.body.Flight_search;
            results.flights = await handleFlightSearch(schedules, stepover, flightBudget);
            break;
  
          case "Tour_search":
            if (
              !req.body.Tour_search ||
              !req.body.Tour_search.budget
            ) {
              return res.status(400).json({
                message: "Missing required parameters for Tour_search.",
              });
            }
            const { budget: tourBudget } = req.body.Tour_search;
            results.tours = await handleTourSearch(tourBudget);
            break;
  
          case "Transfer_search":
            if (
              !req.body.Transfer_search ||
              !req.body.Transfer_search.schedules ||
              !req.body.Transfer_search.from ||
              !req.body.Transfer_search.to ||
              !req.body.Transfer_search.budget
            ) {
              return res.status(400).json({
                message: "Missing required parameters for Transfer_search.",
              });
            }
            const { schedules: transferSchedules, from, to, budget: transferBudget } = req.body.Transfer_search;
            results.transfers = await handleTransferSearch(transferSchedules, from, to, transferBudget);
            break;
  
          default:
            return res
              .status(400)
              .json({ message: `Unknown intent type: ${intent}.` });
        }
      }
  
      return res.status(200).json(results);
    } catch (error) {
      console.error("Error in global search:", error);
      return res
        .status(500)
        .json({ message: "An error occurred during the global search." });
    }
  };
  
//   export const globalSearch = async (req, res) => {
//     try {
//       const { intentType } = req.body;
//       console.log(intentType);
  
//       if (!intentType || !Array.isArray(intentType) || intentType.length === 0) {
//         return res.status(400).json({
//           message:
//             "intentType body parameter is required and should be a non-empty array.",
//         });
//       }
  
//       const results = {};
  
//       const handleHotelSearch = async (location, budget) => {
//         return await new Promise((resolve, reject) => {
//           searchHotel(
//             { location, budget },
//             {
//               status: (statusCode) => ({
//                 json: (data) =>
//                   resolve(
//                     data.hotels || data
//                   ),
//               }),
//             }
//           );
//         });
//       };
  
//       const handleFlightSearch = async (schedules, stepover, budget) => {
//         console.log('Flight search params:', { schedules, stepover, budget });
//         return await new Promise((resolve, reject) => {
//           searchFlights(
//             { schedules, stepover, budget },
//             {
//               status: (statusCode) => ({
//                 json: (data) =>
//                   resolve(
//                     data.flights || data
//                   ),
//               }),
//             }
//           );
//         });
//       };
      
  
//       for (const intent of intentType) {
//         switch (intent) {
//           case "Hotel_search":
//             if (
//               !req.body.Hotel_search ||
//               !req.body.Hotel_search.location ||
//               !req.body.Hotel_search.budget
//             ) {
//               return res.status(400).json({
//                 message: "Missing required parameters for Hotel_search.",
//               });
//             }
//             const { location, budget: hotelBudget } = req.body.Hotel_search;
//             results.hotels = await handleHotelSearch(location, hotelBudget);
//             break;
//             case "Flight_search":
//                 if (
//                   !req.body.Flight_search ||
//                   !req.body.Flight_search.schedules ||
//                   !req.body.Flight_search.stepover ||
//                   !req.body.Flight_search.budget
//                 ) {
//                   return res.status(400).json({
//                     message: "Missing required parameters for Flight_search.",
//                   });
//                 }
//                 const { schedules, stepover, budget: flightBudget } = req.body.Flight_search;
//                 results.flights = await handleFlightSearch(schedules, stepover, flightBudget);
//                 break;
              
//           default:
//             return res
//               .status(400)
//               .json({ message: `Unknown intent type: ${intent}.` });
//         }
//       }
  
//       return res.status(200).json(results);
//     } catch (error) {
//       console.error("Error in global search:", error);
//       return res
//         .status(500)
//         .json({ message: "An error occurred during the global search." });
//     }
//   };
  
