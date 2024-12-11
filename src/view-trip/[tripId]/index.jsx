/* eslint-disable react-hooks/exhaustive-deps */
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/service/firebase.config';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast as toast } from "@/hooks/use-toast";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlaceToVisit from "../components/PlaceToVisit";


const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  // logic to get trip info from firebase
  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);
    {
      if (docSnap.exists()) {
        console.log("Document : ", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document");
        toast("No trip found");
      }
    }
  };
  useEffect(() => {
    GetTripData();
    console.log(trip)
  }, [tripId]);

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} /> 
      {/* Recommended Hotels */}
      <Hotels  trip={trip} />
      {/* Daily Plan */}
      <PlaceToVisit trip={trip} />
    </div>
  );
};

export default ViewTrip;
