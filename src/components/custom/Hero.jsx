// import React from 'react'

import { Button } from "../ui/button"
import { Search, MapPin, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="p-3 bg-blue-50 rounded-full text-[#4DA8DA]">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-gray-600 text-center">{description}</p>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full">
            <Sparkles className="w-4 h-4 text-[#4DA8DA] mr-2" />
            <span className="text-sm font-medium text-[#4DA8DA]">AI-Powered Travel Planning</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
            Your Dream Vacation, <br />
            <span className="text-[#4DA8DA]"> Planned in Seconds</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl">
            Experience hassle-free travel planning with personalized itineraries, 
            curated recommendations, and smart budgeting—all powered by AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link to={'/create-trip'}>
              <Button size="lg" className="bg-[#4DA8DA] hover:bg-[#3891c3]">
                Start Planning Free
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <FeatureCard 
              icon={<MapPin />}
              title="Smart Destinations"
              description="AI-powered suggestions based on your interests and travel style"
            />
            <FeatureCard 
              icon={<Clock />}
              title="Time-Saving"
              description="Complete itineraries generated in seconds, not hours"
            />
            <FeatureCard 
              icon={<Search />}
              title="Personalized"
              description="Customized recommendations for every budget level"
            />
          </div>
        </div>
      </div>
    </div>
  );
};



export default Hero