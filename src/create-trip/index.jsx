import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelLists } from '@/constants/options';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebase.config';
import { useNavigate } from 'react-router-dom';
import Customloading from '@/components/custom/Loading';



function CreateTrip() {
  const [cusloading, setcusLoading] = useState(false);
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to handle form input changes and update state
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
    // Save form data to localStorage
    localStorage.setItem('tripFormData', JSON.stringify({
      ...formData,
      [name]: value
    }));
  };

  useEffect(() => {
    // Check if form data is saved in localStorage, and if so, populate the form
    const savedFormData = localStorage.getItem('tripFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }
  
    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler ||
      formData?.noOfDays === undefined ||
      formData?.noOfDays === ""
    ) {
      toast({
        title: "Incomplete Details",
        description: "Please fill in all the details to proceed.",
        status: "warning",
      });
      return;
    }
    

    if (formData?.noOfDays > 5) {
      toast({
        title: "Too many days!",
        description: "The number of days should not exceed 5.",
        status: "error",
      });
      return;
    }
  
    setLoading(true);
    setcusLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{budget}', formData?.budget);
    console.log(FINAL_PROMPT);
    
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      saveAITrip(result.response.text());
      console.log(result?.response?.text());
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      toast("Error generating trip. Please try again.");
    }
  };
  

  const saveAITrip = async (TripData) => {
    setLoading(true);
    setcusLoading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem('user'));
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      TripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setcusLoading(false);
    setLoading(false);
    navigate('/view-trip/' + docId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      // Retrieve form data after login
      const savedFormData = localStorage.getItem('tripFormData');
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
      window.location.reload(); // Reload the page after login
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-bold text-4xl text-gray-900 mb-4 font-sans">
            Design Your Perfect Journey
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Let our AI craft a personalized travel experience tailored just for you. Share your preferences, and watch your dream trip come to life.
          </p>
        </div>

        {/* Main Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="space-y-12">
            {/* Destination Section */}
            <div className="border-b border-gray-100 pb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Where would you like to go?
              </h2>
              <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => { setPlace(v); handleInputChange('location', v) },
                styles: {
                  control: (provided) => ({
                    ...provided,
                    borderRadius: '0.5rem',
                    border: '2px solid #000',
                    boxShadow: 'none',
                    '&:hover': {
                      border: '2px solid #805ad5',
                    },
                  }),
                },
              }}
            />
            </div>

            {/* Duration Section */}
            <div className="border-b border-gray-100 pb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Trip Duration
              </h2>
              <Input
                placeholder="Number of days"
                type="number"
                className="max-w-xlg text-lg py-6 border-b border-gray-500"
                onChange={(e) => handleInputChange('noOfDays', e.target.value)}
              />
            </div>

            {/* Budget Section */}
            <div className="border-b border-gray-100 pb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Budget Range
              </h2>
              <p className="text-gray-500 mb-6">
                Select your preferred budget for activities and dining
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SelectBudgetOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange('budget', item.title)}
                    className={`relative group bg-white rounded-xl border  p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-600 hover:scale-[1.02]
                    ${formData?.budget==item.title&&'shadow-lg border-5 border-black scale-[1.05]'}
                    `}
                  >
                    <div className="text-5xl mb-4 text-blue-500">{item.icon}</div>
                    <h3 className="font-semibold text-xl mb-2 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Companions Section */}
            <div className="pb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Travel Companions
              </h2>
              <p className="text-gray-500 mb-6">
                Who will be joining you on this adventure?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SelectTravelLists.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange('traveler', item.numberOfPeople)}
                    className={`relative group bg-white rounded-xl border  p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-600 hover:scale-[1.02]
                    ${formData?.traveler==item.numberOfPeople&&'shadow-lg border-5 border-black scale-[1.05]'}`
                    }
                  >
                    <div className="text-5xl mb-4 text-blue-500">{item.icon}</div>
                    <h3 className="font-semibold text-xl mb-2 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-end pt-8">
            <Button
                disabled={loading}
                onClick={onGenerateTrip}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
                ) : (
                  'Generate Your Trip'
                )}
              </Button>
          </div>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <img src="/logo.svg"/>
                  <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
                  <p>Sign in to the App with Google Authentication Securely</p>

                  <Button 
                    onClick={() => {login()}}
                    className='w-full mt-5 flex gap-4 items-center'>
                    <FcGoogle className="h-10 w-10"/> 
                    Sign In With Google
                  </Button>

                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Customloading cusloading={cusloading} />
          <Toaster position="bottom-center" />
        </div>
      </div>
    </div>
  )
}

export default CreateTrip
