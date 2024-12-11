import { Link } from "react-router-dom";

const HotelCardItem = ({ hotel }) => {
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        "," +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer mt-5">
        <img src={"/background.jpg"} className="rounded-xl" />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium ">{hotel.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel.hotelAddress}</h2>
          <h2 className="text-sm">💰 {hotel.price}</h2>
          <h2 className="text-sm">⭐ {hotel.rating}</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
