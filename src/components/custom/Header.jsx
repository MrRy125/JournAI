/* eslint-disable react-hooks/exhaustive-deps */

// import React from 'react'

import { useState, useEffect } from "react";
import { Button } from "../ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const Header = () => {

  const [openDialog, setOpenDialog] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
    console.log(user);
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

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
        // setFormData(JSON.parse(savedFormData));
      }
      window.location.reload(); // Reload the page after login
    });
  };

    return (
      <div className="sticky top-0 z-50 bg-fff/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <a href="/">
            <img src="/logo.svg" alt="JournAI Logo" className="h-12 text-[#4DA8DA]"/></a>
          </div>
          {user ? 
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">+ Create Trip</Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger className="rounded-full p-0">
                <img src={user?.picture} className="h-[50px] w-[50px] rounded-full"/>
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" 
                onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Log Out</h2>
              </PopoverContent>
            </Popover>
          </div>
        : 
          <div className="flex items-center gap-6">
            <Button onClick={()=>{setOpenDialog(true)}}>Sign In</Button>
          </div>}
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
      </div>
    );
  };  

export default Header