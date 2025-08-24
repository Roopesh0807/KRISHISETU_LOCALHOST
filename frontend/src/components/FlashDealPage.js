import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBolt, faHandshake, faShoppingCart, faUsers } from '@fortawesome/free-solid-svg-icons';
import "../components/ConsumerDashboard.css"; // Reuse existing styles

const FlashDealPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigates back to the previous page
    };

    return (
        <div className="flash-deal-page-container">
            {/* Nav Bar */}
            <header className="dashboard-header">
                <div className="header-top">
                    <h1 className="logo-text">KrishiBazaar</h1>
                    <div className="nav-actions">
                        <button onClick={handleGoBack} className="back-button">
                            <FontAwesomeIcon icon={faArrowLeft} /> Back
                        </button>
                    </div>
                </div>
            </header>

            {/* Flash Deals Content */}
            <main className="flash-deal-main">
                <h2><FontAwesomeIcon icon={faBolt} /> Flash Deals</h2>
                <p className="page-description">
                    Welcome to the Flash Deal page! Here you can find exclusive, time-sensitive offers on a variety of fresh produce.
                </p>

                <div className="deal-card-list">
                    {/* Example Flash Deal Card */}
                    <div className="deal-card">
                        <img src="https://placehold.co/300x200?text=Deal+1" alt="Flash Deal 1" className="deal-image" />
                        <div className="deal-content">
                            <h3>Organic Tomatoes - 50% OFF</h3>
                            <p className="deal-price">
                                <span className="original-price">₹100/kg</span>
                                <span className="flash-price">₹50/kg</span>
                            </p>
                            <p className="deal-timer">Time Left: 02:30:15</p>
                            <button className="deal-action-btn">
                                <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Example Flash Deal Card 2 */}
                    <div className="deal-card">
                        <img src="https://placehold.co/300x200?text=Deal+2" alt="Flash Deal 2" className="deal-image" />
                        <div className="deal-content">
                            <h3>Fresh Mangoes - Buy 1 Get 1 Free</h3>
                            <p className="deal-price">
                                <span className="original-price">₹250/kg</span>
                                <span className="flash-price">₹250/2kg</span>
                            </p>
                            <p className="deal-timer">Time Left: 00:55:00</p>
                            <button className="deal-action-btn">
                                <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FlashDealPage;
