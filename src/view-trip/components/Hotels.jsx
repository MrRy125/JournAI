/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import HotelCardItem from "./HotelCardItem";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FaAngleRight } from "react-icons/fa6";

import HotelCardItem from "./HotelCardItem";


const Hotels = ({ trip }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    // className="mt-12 mx-auto md:mx-16 lg:mx-32 p-6 rounded-lg shadow-lg"
    <div >
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

       
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {trip?.TripData?.hotels?.map((hotel, index)=>(
                    <HotelCardItem hotel={hotel}/>
                ))}
            </div>
    </div>
  );
};

export default Hotels;
