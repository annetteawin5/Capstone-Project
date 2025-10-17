import express from "express";
import cors from "cors";
import Amadeus from "amadeus";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET"],
}));
app.use(express.json());

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

app.get("/api/locations", async (req, res) => {
    try {
        const { keyword } = req.query;

        // Fetch city data from Amadeus
        const response = await amadeus.referenceData.locations.get({
            keyword,
            subType: Amadeus.location.city,
        });

        const cities = response.data;

        // For each city, fetch an Unsplash image
        const resultsWithImages = await Promise.all(
            cities.map(async (city) => {
                try {
                    const unsplashRes = await fetch(
                        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city.name)}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
                    );

                    const unsplashData = await unsplashRes.json();
                    const imageUrl = unsplashData.results?.[0]?.urls?.regular || null;

                    return {
                        ...city,
                        imageUrl,
                    };
                } catch (err) {
                    console.error(`Unsplash fetch failed for ${city.name}:`, err.message);
                    return {
                        ...city,
                        imageUrl: null,
                    };
                }
            })
        );

        res.json(resultsWithImages);
    } catch (err) {
        console.error("Error fetching destinations:", err);
        res.status(500).json({ error: "Failed to fetch destinations" });
    }
});

app.get("/api/flights", async (req, res) => {
    try {
        const { originCode, destinationCode, departureDate } = req.query;
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: originCode,
            destinationLocationCode: destinationCode,
            departureDate,
            adults: "1",
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch flights" });
    }
});

app.get("/api/hotels", async (req, res) => {
    try {
        const { cityCode } = req.query;

        const hotelsResponse = await amadeus.referenceData.locations.hotels.byCity.get({
            cityCode,
        });

        const hotels = hotelsResponse.data;
        console.log(hotels);

        if (!hotels || hotels.length === 0) {
            return res.status(404).json({ message: "No hotels found for this city" });
        }

        const hotelIds = hotels
            .map((h) => h.hotelId)
            .slice(0, 20)
            .join(",");

        const offersResponse = await amadeus.shopping.hotelOffersSearch.get({
            hotelIds,
            adults: 1,
            roomQuantity: 1,
        });

        res.json({
            hotels,
            offers: offersResponse.data,
        });
    } catch (err) {
        console.error("Hotel Search Error:", err.response?.result || err);
        res.status(500).json({
            message: "Failed to fetch hotels",
            description: err.response?.result || err.message || err,
        });
    }
});


app.listen(5000, () => console.log("Server running on port 5000"));
