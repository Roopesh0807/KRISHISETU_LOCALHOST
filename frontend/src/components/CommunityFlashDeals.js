// src/components/CommunityFlashDeals.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // For making API calls (npm install axios)
import { Clock, MapPin, Tag, Users, CheckCircle2, XCircle } from 'lucide-react'; // Icons from lucide-react (npm install lucide-react)
import './CommunityFlashDeals.css'; // Custom CSS for specific styles and animations

// Helper function to format time remaining for the countdown
const formatTimeLeft = (seconds) => {
  if (seconds <= 0) return 'Deal Ended!';
  const days = Math.floor(seconds / (3600 * 24));
  seconds %= (3600 * 24);
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  let parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`); 
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`); 
  parts.push(`${secs}s`); 

  return parts.join(' ');
};

// Main CommunityFlashDeals functional component
const CommunityFlashDeals = () => {
  const [userPincode, setUserPincode] = useState('');
  const [isLocationConfirmed, setIsLocationConfirmed] = useState(false);
  const [deals, setDeals] = useState([]);
  const [communityStatus, setCommunityStatus] = useState('detecting'); // States: 'detecting', 'no_community', 'forming', 'active', 'ended', 'error'
  const [communityInfo, setCommunityInfo] = useState({
    minConsumers: 30, // Example threshold for deal activation
    currentConsumers: 0,
    radius: '5km',
  });
  const [timeLeft, setTimeLeft] = useState(0); // Time left for the active deal in seconds
  const intervalRef = useRef(null); // Ref to hold the countdown interval ID

  // --- Effect for Location Detection and Initial Community Data Fetch ---
  useEffect(() => {
    const detectLocationAndFetchDeals = async () => {
      setCommunityStatus('detecting');
      try {
        // --- Simulate user pincode input for demonstration ---
        // In a real application, you would use navigator.geolocation
        // and a reverse geocoding API, or a user input form.
        let pincode = localStorage.getItem('krishisetu_pincode');
        if (!pincode) {
            // Prompt the user to enter their pincode
            const inputPincode = prompt("Please enter your 6-digit pincode to see flash deals (e.g., 577001):");
            if (inputPincode && inputPincode.length === 6 && /^\d+$/.test(inputPincode)) {
                pincode = inputPincode;
                localStorage.setItem('krishisetu_pincode', pincode);
            } else {
                alert("Invalid or no pincode entered. Using default 577001 for demonstration.");
                pincode = "577001"; // Default pincode for demo if input is invalid
                localStorage.setItem('krishisetu_pincode', pincode);
            }
        }
        
        setUserPincode(pincode);
        setIsLocationConfirmed(true);

        // --- Simulate Backend API Call for Community Status and Deals ---
        // Replace this with your actual axios.get() or axios.post() calls to your Node.js backend
        // Example: const response = await axios.get(`/api/community-deals?pincode=${pincode}`);
        // For now, we'll use dummy data:
        
        const dummyDeals = [
          {
            id: 1,
            name: 'Fresh Organic Tomatoes',
            originalPrice: 75,
            dealPrice: 55,
            discount: 26, 
            imageUrl: 'https://placehold.co/400x300/a3e635/16a34a?text=Tomatoes',
            farmingMethod: 'Organic',
            description: 'Juicy, farm-fresh organic tomatoes, perfect for all your culinary needs.',
            dealQuantityLeft: 150, // kg
            minOrderQuantity: 1, // kg
          },
          {
            id: 2,
            name: 'Sweet Corn Cobs (Pack of 4)',
            originalPrice: 60,
            dealPrice: 40,
            discount: 33, 
            imageUrl: 'https://placehold.co/400x300/fde047/a16207?text=Sweet+Corn',
            farmingMethod: 'Natural Farming',
            description: 'Deliciously sweet corn, great for grilling or boiling. Pack of 4 cobs.',
            dealQuantityLeft: 80, // packs
            minOrderQuantity: 1, // pack
          },
          {
            id: 3,
            name: 'Green Leafy Spinach (500g)',
            originalPrice: 40,
            dealPrice: 28,
            discount: 30, 
            imageUrl: 'https://placehold.co/400x300/4ade80/166534?text=Spinach',
            farmingMethod: 'Hydroponics',
            description: 'Nutrient-rich spinach, harvested fresh daily. 500g pack.',
            dealQuantityLeft: 200, // packs
            minOrderQuantity: 1, // pack
          },
        ];

        const dummyCommunityInfo = {
          minConsumers: 30,
          currentConsumers: Math.min(25 + Math.floor(Math.random() * 10), 30), // Simulate a number of consumers
          radius: '5km',
        };

        const dummyDealEndTime = new Date();
        dummyDealEndTime.setHours(dummyDealEndTime.getHours() + 2); // Demo deal ends in 2 hours from now

        setDeals(dummyDeals);
        setCommunityInfo(dummyCommunityInfo);
        
        // Determine initial community status
        if (dummyCommunityInfo.currentConsumers >= dummyCommunityInfo.minConsumers) {
          setCommunityStatus('active');
        } else if (dummyCommunityInfo.currentConsumers > 0) {
          setCommunityStatus('forming');
        } else {
          setCommunityStatus('no_community');
        }
        
        setTimeLeft(Math.max(0, Math.floor((dummyDealEndTime.getTime() - Date.now()) / 1000)));

      } catch (error) {
        console.error('Location/Community detection error:', error);
        setCommunityStatus('error');
      }
    };

    detectLocationAndFetchDeals(); // Run this function once on component mount
    
    // Cleanup function for this effect
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // --- Effect for Countdown Timer Logic ---
  useEffect(() => {
    // Only start timer if community is active and there's time left
    if (communityStatus === 'active' && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current); // Stop the timer
            setCommunityStatus('ended'); // Update status to 'ended'
            return 0;
          }
          return prevTime - 1; // Decrement time
        });
      }, 1000); // Update every second
    } else if (communityStatus === 'ended' || timeLeft <= 0) {
      clearInterval(intervalRef.current); // Clear interval if deal ended or time ran out
    }

    // Cleanup function for this effect to clear the interval when component unmounts or dependencies change
    return () => clearInterval(intervalRef.current);
  }, [communityStatus, timeLeft]); // Re-run if status or timeLeft changes (to re-evaluate timer start/stop)

  // Handler for when a user clicks to order a deal
  const handleOrderNow = (dealId) => {
    console.log(`User wants to order product ${dealId} from flash deal.`);
    alert('Product added to flash deal cart! (This is a demo action)');
    // In a real app:
    // 1. Send order to backend API
    // 2. Redirect to a specific flash deal cart or payment page
    // 3. Update local state (e.g., dealQuantityLeft)
  };

  // Helper function to render different status messages for the community
  const renderCommunityStatus = () => {
    switch (communityStatus) {
      case 'detecting':
        return (
          <div className="flex items-center justify-center p-4 bg-blue-100 text-blue-800 rounded-lg shadow-inner">
            <Clock className="w-5 h-5 mr-2 animate-spin" />
            <p className="font-semibold">Detecting your location and checking for flash deals...</p>
          </div>
        );
      case 'no_community':
        return (
          <div className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow-inner">
            <XCircle className="w-5 h-5 mr-2" />
            <p className="font-semibold">No active flash deal community in your area ({userPincode}).</p>
          </div>
        );
      case 'forming':
        return (
          <div className="flex flex-col md:flex-row items-center justify-center p-4 bg-orange-100 text-orange-800 rounded-lg shadow-inner w-full">
            <Users className="w-5 h-5 mr-2 mb-2 md:mb-0" />
            <p className="font-semibold text-center md:text-left">
              Community for pincode {userPincode} is forming!
              <span className="ml-2 font-bold">{communityInfo.currentConsumers}/{communityInfo.minConsumers} members</span>
            </p>
            <div className="relative w-full max-w-xs h-3 bg-orange-200 rounded-full ml-0 md:ml-4 mt-2 md:mt-0">
              <div
                className="absolute h-full bg-orange-500 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(communityInfo.currentConsumers / communityInfo.minConsumers) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-sm mt-2 md:mt-0 md:ml-4 text-center md:text-right">Share to unlock deals!</p>
          </div>
        );
      case 'active':
        return (
          <div className="flex flex-col md:flex-row items-center justify-center p-4 bg-green-100 text-green-800 rounded-lg shadow-inner w-full">
            <CheckCircle2 className="w-5 h-5 mr-2 mb-2 md:mb-0" />
            <p className="font-semibold text-center md:text-left">
              Flash Deals are LIVE for your community ({userPincode})! Time Left:
              <span className="ml-2 font-bold text-green-700 flash-deal-countdown">{formatTimeLeft(timeLeft)}</span>
            </p>
          </div>
        );
      case 'ended':
        return (
          <div className="flex items-center justify-center p-4 bg-gray-100 text-gray-700 rounded-lg shadow-inner">
            <Clock className="w-5 h-5 mr-2" />
            <p className="font-semibold">The flash deal in your area has ended. Stay tuned for the next one!</p>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center justify-center p-4 bg-red-100 text-red-800 rounded-lg shadow-inner">
            <XCircle className="w-5 h-5 mr-2" />
            <p className="font-semibold">Error detecting location or loading deals. Please try again.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="community-flash-deals-container p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-green-700 mb-4 tracking-tight leading-tight">
            <span className="block text-green-500 text-3xl sm:text-4xl font-semibold mb-2">⚡️ Community Flash Deals ⚡️</span>
            Fresh Produce, Bulk Savings, Delivered!
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Unlock exclusive discounts and free delivery by ordering with your local community. Limited time offers!
          </p>
        </div>

        {/* Location & Status Section */}
        <div className="mb-8 p-4 bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center text-gray-700 text-lg md:text-xl font-medium mb-4 md:mb-0">
            <MapPin className="w-6 h-6 mr-3 text-red-500" />
            Your Location: <span className="ml-2 font-semibold text-gray-900">{userPincode || 'Detecting...'}</span>
          </div>
          <div className="w-full md:w-auto">{renderCommunityStatus()}</div>
        </div>

        {/* Flash Deals Grid */}
        {deals.length > 0 && (communityStatus === 'active' || communityStatus === 'forming') ? ( // Show deals if active or forming
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <div
                key={deal.id}
                // Conditionally apply hover effects based on community status (only fully interactive when active)
                className={`flash-deal-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform 
                           ${communityStatus === 'active' ? 'hover:shadow-2xl hover:scale-105 cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
                onClick={communityStatus === 'active' ? () => handleOrderNow(deal.id) : null}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={deal.imageUrl}
                    alt={deal.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/400x300/a3e635/16a34a?text=Product`;
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md z-10 flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    {deal.discount}% OFF
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{deal.name}</h3>
                  <p className="text-sm text-gray-500 mb-3 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" /> Farming: {deal.farmingMethod}
                  </p>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-extrabold text-green-600 mr-2">₹{deal.dealPrice}</span>
                    <span className="text-lg text-gray-400 line-through">₹{deal.originalPrice}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{deal.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-blue-500" /> {communityInfo.currentConsumers}/{communityInfo.minConsumers} Community Members
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-purple-500" /> {deal.dealQuantityLeft} kg Left
                    </span>
                  </div>
                  <button
                    onClick={communityStatus === 'active' ? () => handleOrderNow(deal.id) : null}
                    className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-transform duration-200 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 active:bg-green-700 
                               ${communityStatus === 'active' ? 'bg-green-500 hover:bg-green-600 pulse-animation' : 'bg-gray-400 cursor-not-allowed'}`}
                    disabled={communityStatus !== 'active'} // Disable button if not active
                  >
                    {communityStatus === 'active' ? 'Order Now' : 'Deal Not Active Yet'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (deals.length === 0 && (communityStatus === 'active' || communityStatus === 'forming' || communityStatus === 'ended')) && (
          <div className="text-center p-8 bg-white rounded-xl shadow-lg mt-8">
            <p className="text-xl text-gray-700 font-semibold">
              No active flash deals in your community ({userPincode}) right now. Stay tuned!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFlashDeals; // Crucial: Default export
