import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip'
import Header from './components/custom/Header'
import { Toaster } from "@/components/ui/toaster"
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]'
import Footer from './view-trip/components/Footer'
import MyTrips from './my-trips'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  },
  {
    path: "/view-trip/:tripId",
    element: <ViewTrip />,
  },
  {
    path: "/my-trips",
    element: <MyTrips />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_AUTH_CLIENT_API_KEY}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />  
      <Footer />
    </GoogleOAuthProvider>;
  </StrictMode>,
)
