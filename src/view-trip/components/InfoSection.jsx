const InfoSection = ({ trip }) => {
  return (
    <div>
      <img
        className="h-[340px] w-full object-cover rounded-xl"
        src={"/background.jpg"}
        alt="Trip Image"
      />
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">🗺️ {trip?.userSelection?.location?.label}</h2>
        
        <div className="flex justify-between items-center">
            <div className="flex gap-5">
                <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">📅 Duration: {trip?.userSelection?.noOfDays} Day/s</h2>
                <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">💰 Budget: {trip?.userSelection?.budget} Budget</h2>
                <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">👥 Traveling with: {trip?.userSelection?.traveler}</h2>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
