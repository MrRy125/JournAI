/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
  return (
    <Link to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
                    target="_blank"
                    >
        <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer">
            <img src={"/background.jpg"} className="w-[130px] h-[130px] rounded-xl" />
            <div>
                <h2 className="font-bold text-lg">{place.placeName}</h2>
                <p className="text-sm text-gray-400">{place.placeDetails}</p>
                <h2 className="mt-2">💵 <b>Price:</b> ADULT: {place.ticketPricing.adult}, CHILD: {place.ticketPricing.child}</h2>
                <h2 className="mt-2">📍 <b>Location:</b> {place.placeLocation}</h2>
                <h2 className="mt-2">⌛ <b>Time of Travel:</b> {place.timeToTravel.fromAirport}</h2>
            </div>
        </div>
    </Link>
  )
}

export default PlaceCardItem