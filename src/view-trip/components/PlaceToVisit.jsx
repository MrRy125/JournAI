/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import PlaceCardItem from "./PlaceCardItem"

/* eslint-disable react/jsx-key */
const PlaceToVisit = ({ trip }) => {

  return (
    <div>
        <h2 className="font-bold text-xl mt-5">Places To Visit</h2>

        <div>
            {trip?.TripData?.itinerary && Array.isArray(trip.TripData.itinerary) && trip.TripData.itinerary.map((item, index) => (
            <div className="mt-5" key={index}>
                <h2 className="font-medium text-lg">{item?.day}</h2>
                <div className="grid grid-cols-2 gap-5">
                    {item.plan.map((place, index) => (
                        <div key={index}>
                            <h2 className="font-medium text-sm text-orange-600">🕒 {place.timeAvailable}</h2>
                            <div className="my-3 ">
                                <PlaceCardItem place={place} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
        </div>
    </div>
  )
}

export default PlaceToVisit