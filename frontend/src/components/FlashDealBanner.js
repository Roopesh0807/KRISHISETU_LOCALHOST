import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faBolt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Corrected import path

// FlashDealBanner component to display a conditional and animated banner
const FlashDealBanner = () => {
    const navigate = useNavigate();
    const { consumer } = useAuth();
    const [showFlashDealBanner, setShowFlashDealBanner] = useState(false);

    // useEffect to check for flash deals on component mount or consumer change
    useEffect(() => {
        const checkFlashDeals = async () => {
            if (!consumer?.token || !consumer?.consumer_id) return;

            try {
                // Fetch consumer's pincode
                const profileResponse = await fetch(`http://localhost:5000/api/consumer/${consumer.consumer_id}`, {
                    headers: {
                        "Authorization": `Bearer ${consumer.token}`,
                    }
                });
                const profileData = await profileResponse.json();
                const consumerPincode = profileData.pincode;

                if (!consumerPincode) {
                    setShowFlashDealBanner(false);
                    return;
                }

                // Check for flash deals based on the pincode
                const flashDealResponse = await fetch(`http://localhost:5000/api/check-community-flash-deals/${consumerPincode}`, {
                    headers: {
                        "Authorization": `Bearer ${consumer.token}`,
                    }
                });
                const flashDealData = await flashDealResponse.json();

                if (flashDealData.showFlashDeal) {
                    setShowFlashDealBanner(true);
                } else {
                    setShowFlashDealBanner(false);
                }
            } catch (error) {
                console.error("Error checking flash deals:", error);
                setShowFlashDealBanner(false);
            }
        };

        checkFlashDeals();
    }, [consumer]);

    // Render the banner only if showFlashDealBanner is true
    return (
        showFlashDealBanner && (
            <div className="ks-flash-deal-banner">
                <div className="ks-flash-content-area">
                    <FontAwesomeIcon icon={faTag} className="ks-flash-icon" />
                    <div className="ks-marquee-container">
                        <div className="ks-marquee-content">
                            Flash deals are open for your location! Grab them before they vanish!
                        </div>
                    </div>
                </div>
                <button className="ks-participate-btn" onClick={() => navigate('/community-flash-deals')}>
                    <FontAwesomeIcon icon={faBolt} /> Participate Now!
                </button>
                <button className="ks-close-flash-banner" onClick={() => setShowFlashDealBanner(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        )
    );
};

export default FlashDealBanner;
