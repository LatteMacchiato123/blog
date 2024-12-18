"use client";
import React, { useState } from "react";


export function Hero() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null); // Track if the subscription was successful

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.status >= 200 && response.status < 300) {
        setMessage("Subscribed successfully!");
        setIsSuccess(true); // Success
        setEmail(""); // Clear email input on successful subscription
      } else {
        setMessage("Failed to subscribe. Please try again.");
        setIsSuccess(false); // Failure
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setMessage("An error occurred. Please try again.");
      setIsSuccess(false); // Error
    }
  };

  return (
    <div className="hero min-h-96 w-full mx-auto" style={{ backgroundImage: "url('/assets/bg-hero.jpg')" }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-left">
        <div className="max-w-screen-xl flex justify-center items-center h-full">
          <div className="text-center">
            <h1 className="mb-5 text-7xl font-bold">INSPIRATION FOR EVERYONE</h1>
            <p className="mb-5 text-3xl">&quot;Roaming the Globe, Collecting Moments&quot;</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 justify-center items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered w-full max-w-xs p-3"
                required
              />
              <button type="submit" className="btn btn-primary justify-center mt-2 sm:mt-0">
                Subscribe
              </button>
            </form>
            {message && (
              <p className={`mt-4 ${isSuccess === true ? "text-green-600" : isSuccess === false ? "text-red-600" : ""} text-center`}>
                {message}
              </p>
            )}
           
          </div>
        </div>
      </div>
    </div>
  );
}
