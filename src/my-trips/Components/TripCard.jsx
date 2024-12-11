import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
const TripCard = ({ trip }) => {
  return (
    <Link to={'/view-trip/'+trip?.id}>
        <div className="hover:scale-105 transition-all hover:shadow-md">
            <img src='/background.jpg' className="object-cover rounded-xl" alt="image"/>
            <div>
                <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
                <h2 className="text-sm text-gray-500">{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.traveler} in a {trip?.userSelection?.budget} Budget</h2>
            </div>
        </div>
    </Link>
  )
}

export default TripCard