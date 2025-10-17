import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TravelSearch() {
    const [keyword, setKeyword] = useState("");
    const [destinations, setDestinations] = useState([]);
    const [flights, setFlights] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchDestinations = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`http://localhost:5000/api/locations?keyword=${keyword}`);
            if (!res.ok) throw new Error("Failed to fetch destinations");
            const data = await res.json();
            setDestinations(data);
            setFlights([]);
            setHotels([]);
        } catch (err) {
            console.error(err);
            setError("Failed to search destinations");
        } finally {
            setLoading(false);
        }
    };

    const fetchFlights = async (origin, destination, date) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `http://localhost:5000/api/flights?originCode=${origin}&destinationCode=${destination}&departureDate=${date}`
            );
            const data = await res.json();
            setFlights(data);
            setHotels([]);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch flights");
        } finally {
            setLoading(false);
        }
    };

    const fetchHotels = async (cityCode) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`http://localhost:5000/api/hotels?cityCode=${cityCode}`);
            const data = await res.json();
            if (res.ok) {
                // Combine hotels and offers for display
                const mergedHotels = data.offers?.map((offer) => ({
                    ...offer,
                    hotel: data.hotels.find((h) => h.hotelId === offer.hotel.hotelId),
                })) || [];

                setHotels(mergedHotels);
                setFlights([]);
            } else {
                setError(data.error || "Failed to fetch hotels");
            }
        } catch (err) {
            console.error(err);
            setError("Network error while fetching hotels");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">
                🌍 Travel Explorer
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center">
                <input
                    type="text"
                    placeholder="Search by city or country..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="border border-gray-300 shadow-sm p-3 flex-1 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                    onClick={searchDestinations}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold shadow"
                >
                    Search
                </button>
            </div>

            {loading && <p className="text-gray-500 italic text-center">Loading...</p>}
            {error && <p className="text-red-500 italic text-center">{error}</p>}

            {destinations.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                        🗺️ Destinations
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {destinations.map((d) => (
                            <motion.div
                                key={d.id}
                                whileHover={{ scale: 1.03 }}
                                className="bg-white border rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                            >
                                <img
                                    src={d.imageUrl || "/fallback-city.jpg"}
                                    alt={d.name}
                                    className="h-40 w-full object-cover"
                                    onError={(e) => {
                                        e.target.src = "/fallback-city.jpg"; // fallback image
                                    }}
                                />
                                <div className="p-4 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {d.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            {d.address?.countryCode || "Unknown"} ({d.iataCode})
                                        </p>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => fetchHotels(d.iataCode)}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm"
                                        >
                                            Hotels
                                        </button>
                                        <button
                                            onClick={() =>
                                                fetchFlights("NBO", d.iataCode, "2025-12-10")
                                            }
                                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm"
                                        >
                                            Flights
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {flights.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                        ✈️ Flights
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {flights.map((f, idx) => {
                            const dep = f.itineraries[0].segments[0].departure.iataCode;
                            const arr = f.itineraries[0].segments[0].arrival.iataCode;
                            const price = `${f.price.total} ${f.price.currency}`;
                            return (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white rounded-2xl shadow p-5 border hover:shadow-lg transition"
                                >
                                    <img
                                        src="https://source.unsplash.com/600x400/?airplane"
                                        alt="Flight"
                                        className="rounded-lg mb-3 object-cover h-40 w-full"
                                    />
                                    <h3 className="text-lg font-bold text-blue-700">
                                        {dep} → {arr}
                                    </h3>
                                    <p className="text-gray-700 font-semibold mt-2">💲 {price}</p>
                                    <p className="text-gray-500 text-sm">
                                        Duration: {f.itineraries[0].duration || "N/A"}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}

            {hotels.length > 0 && (
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                        🏨 Hotels
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {hotels.map((h, idx) => {
                            const hotelInfo = h.hotel || h;
                            const offer = h.offers?.[0];
                            const name = hotelInfo.name || "Unnamed Hotel";
                            const image =
                                hotelInfo.media?.[0]?.uri ||
                                `https://source.unsplash.com/600x400/?hotel,${hotelInfo.address?.cityName}`;
                            const city = hotelInfo.address?.cityName || "Unknown City";
                            const price = offer?.price?.total
                                ? `${offer.price.total} ${offer.price.currency}`
                                : "N/A";
                            const checkIn = offer?.checkInDate || "N/A";
                            const checkOut = offer?.checkOutDate || "N/A";

                            return (
                                <motion.div
                                    key={hotelInfo.hotelId || idx}
                                    whileHover={{ scale: 1.03 }}
                                    className="bg-white border rounded-2xl shadow hover:shadow-xl overflow-hidden transition"
                                >
                                    <img
                                        src={image}
                                        alt={name}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{name}</h3>
                                        <p className="text-gray-600 mb-1">📍 {city}</p>
                                        <p className="text-blue-600 font-bold">💲 {price}</p>
                                        <p className="text-sm text-gray-500">
                                            🕓 Check-in: {checkIn}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            🕔 Check-out: {checkOut}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
