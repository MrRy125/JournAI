/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useNavigation, Link } from "react-router-dom";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/service/firebase.config";
import TripCard from "./Components/TripCard";
import { Calendar, PlusCircle, Trash2 } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast as toast } from "@/hooks/use-toast";

const MyTrips = () => {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingTripId, setDeletingTripId] = useState(null);
  
  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      if(!user){
        navigation('/');
        return;
      }
      
      setLoading(true);
      const q = query(collection(db, "AITrips"), where('userEmail', '==', user?.email));
      const querySnapshot = await getDocs(q);
      
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
      });
      
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch trips. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteTrip = async (tripId) => {
    try {
      setDeletingTripId(tripId);
      await deleteDoc(doc(db, "AITrips", tripId));
      setUserTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
      toast({
        title: "Success",
        description: "Trip deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete trip. Please try again.",
      });
    } finally {
      setDeletingTripId(null);
    }
  };

  const TripCardWithDelete = ({ trip }) => (
    <div className="relative group">
      <TripCard trip={trip} />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button 
            className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            disabled={deletingTripId === trip.id}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trip</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this trip? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => handleDeleteTrip(trip.id)}
              className="bg-red-500 hover:bg-red-600"
            >
              {deletingTripId === trip.id ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center w-full min-h-[400px] bg-gray-50 rounded-lg p-8">
      <Calendar className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Planned Trips Yet</h3>
      <p className="text-gray-500 text-center mb-6">Start planning your next adventure by creating a new trip.</p>
      
      <Link to={'/create-trip'}>
        <div 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Plan a New Trip</span>
        </div>
      </Link>
    </div>
  );

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="mt-10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map((item, index) => (
              <div key={index} className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : userTrips.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {userTrips.map((trip) => (
              <TripCardWithDelete key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}

export default MyTrips