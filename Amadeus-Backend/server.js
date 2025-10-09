import express from 'express'
import cors from 'cors'
import dotenv, { config, configDotenv } from 'dotenv'
import Amadeus from 'amadeus'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const amadeus = new Amadeus({
    CLIENT_ID: process.env.AMADEUS_CLIENT_ID,
    CLIENT_SECRET: process.env.AMADEUS_CLIENT_SECRET
});

app.get("/api/flights", async (req, res) => {
    try{
        const {origin, destination, departureDate} =req.query
        const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: 1,
        })
        res.json(response.data)
        console.log(response.data)
        
    }
    catch(error){
        console.error(error)
    }
});
app.get("/api/location", async (req, res) => {
    try{
        const {keyword} =req.query
        const response = await amadeus.referenceData.locations.get({
            keyword, 
            subType: Amadeus.location.city
        })
        res.json(response.data)
      
        
    }
    catch(error){
        console.error(error)
    }
});

app.get("/api/hotels", async (req, res) => {
    try{
        const {cityCode} =req.query
        const response = await amadeus.referenceData.locations.hotels.byCity.get({
          cityCode,
           
          
        })
        res.json(response.data)
      
        
    }
    catch(error){
        console.error(error)
    }
});

app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`))


