import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBolt, faShoppingCart, faTimesCircle, faFire, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './FlashDealPage.css';

// Import apple image with local path
import appleImage from '../assets/apple.jpg';

// Component to display an individual flash deal card
const DealCard = ({ deal, onAddToCart }) => {
    const { produce_name, original_price, flash_price, discount, availability, image_url, product_id } = deal;
    const [timeLeft, setTimeLeft] = useState(Math.floor(Math.random() * (3600 * 4 - 60 * 10 + 1)) + 60 * 10);
    const [isAdding, setIsAdding] = useState(false);
    const [showAdded, setShowAdded] = useState(false);

    // Effect for the countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Helper function to format seconds into HH:MM:SS
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Handler for adding the item to the cart
    const handleAddToCart = () => {
        if (!isAvailable) return;
        
        setIsAdding(true);
        setTimeout(() => {
            onAddToCart(deal);
            setIsAdding(false);
            setShowAdded(true);
            setTimeout(() => setShowAdded(false), 2000);
        }, 800);
    };

    const isAvailable = availability > 0 && timeLeft > 0;
    const buttonClass = `deal-action-btn ${!isAvailable ? 'deal-unavailable' : ''} ${isAdding ? 'adding' : ''} ${showAdded ? 'added' : ''}`;

    return (
        <div className="deal-card">
            <div className="deal-image-container">
                <img src={image_url} alt={produce_name} className="deal-image" onError={(e) => {
                    e.target.src = `https://source.unsplash.com/300x200/?${encodeURIComponent(produce_name)}`;
                }} />
                <div className="deal-overlay"></div>
                <div className="hot-deal-tag">
                    <FontAwesomeIcon icon={faFire} /> HOT DEAL
                </div>
                <div className="discount-tag">-{discount}% OFF</div>
            </div>
            <div className="deal-content">
                <h3>{produce_name}</h3>
                <p className="deal-price">
                    <span className="original-price">₹{original_price}/kg</span>
                    <span className="flash-price">₹{flash_price}/kg</span>
                </p>
                <div className="availability-bar">
                    <div className="availability-fill" style={{width: `${(availability / 50) * 100}%`}}></div>
                    <span>Only {availability} kg left</span>
                </div>
                {isAvailable ? (
                    <>
                        <p className="deal-timer">
                            <span className="timer-icon">⏰</span> 
                            Time Left: {formatTime(timeLeft)}
                        </p>
                        <button className={buttonClass} onClick={handleAddToCart} disabled={!isAvailable || isAdding}>
                            {showAdded ? (
                                <>
                                    <FontAwesomeIcon icon={faCheckCircle} /> Added to Cart!
                                </>
                            ) : isAdding ? (
                                <>
                                    <div className="spinner"></div> Adding...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                                </>
                            )}
                        </button>
                    </>
                ) : (
                    <>
                        <p className="deal-timer" style={{ color: 'red' }}>Sold Out!</p>
                        <button className={buttonClass} disabled>
                            <FontAwesomeIcon icon={faTimesCircle} /> Sold Out
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

// Toast notification component
const ToastNotification = ({ message, show, onClose }) => {
    return (
        <div className={`toast-notification ${show ? 'show' : ''}`}>
            <div className="toast-content">
                <FontAwesomeIcon icon={faCheckCircle} className="toast-icon" />
                <span>{message}</span>
            </div>
            <button className="toast-close" onClick={onClose}>×</button>
        </div>
    );
};

// Main FlashDealPage component
const FlashDealPage = () => {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Dummy data for 20 flash deals with apple image only
    const dummyDeals = [
        {
            product_id: 1,
            produce_name: "Organic Apples",
            original_price: 120,
            flash_price: 75,
            discount: 38,
            availability: 22,
            image_url: appleImage
        },
        {
            product_id: 2,
            produce_name: "Fresh Apples",
            original_price: 130,
            flash_price: 85,
            discount: 35,
            availability: 18,
            image_url: appleImage
        },
        {
            product_id: 3,
            produce_name: "Sweet Apples",
            original_price: 140,
            flash_price: 95,
            discount: 32,
            availability: 15,
            image_url: appleImage
        },
        {
            product_id: 4,
            produce_name: "Green Apples",
            original_price: 110,
            flash_price: 65,
            discount: 41,
            availability: 25,
            image_url: appleImage
        },
        {
            product_id: 5,
            produce_name: "Red Apples",
            original_price: 150,
            flash_price: 99,
            discount: 34,
            availability: 12,
            image_url: appleImage
        },
        {
            product_id: 6,
            produce_name: "Golden Apples",
            original_price: 160,
            flash_price: 109,
            discount: 32,
            availability: 8,
            image_url: appleImage
        },
        {
            product_id: 7,
            produce_name: "Fuji Apples",
            original_price: 125,
            flash_price: 79,
            discount: 37,
            availability: 20,
            image_url: appleImage
        },
        {
            product_id: 8,
            produce_name: "Gala Apples",
            original_price: 135,
            flash_price: 89,
            discount: 34,
            availability: 16,
            image_url: appleImage
        },
        {
            product_id: 9,
            produce_name: "Honeycrisp Apples",
            original_price: 170,
            flash_price: 119,
            discount: 30,
            availability: 10,
            image_url: appleImage
        },
        {
            product_id: 10,
            produce_name: "Granny Smith Apples",
            original_price: 115,
            flash_price: 69,
            discount: 40,
            availability: 28,
            image_url: appleImage
        },
        {
            product_id: 11,
            produce_name: "Organic Red Apples",
            original_price: 145,
            flash_price: 99,
            discount: 32,
            availability: 14,
            image_url: appleImage
        },
        {
            product_id: 12,
            produce_name: "Fresh Green Apples",
            original_price: 105,
            flash_price: 59,
            discount: 44,
            availability: 30,
            image_url: appleImage
        },
        {
            product_id: 13,
            produce_name: "Sweet Red Apples",
            original_price: 155,
            flash_price: 105,
            discount: 32,
            availability: 11,
            image_url: appleImage
        },
        {
            product_id: 14,
            produce_name: "Juicy Apples",
            original_price: 135,
            flash_price: 85,
            discount: 37,
            availability: 19,
            image_url: appleImage
        },
        {
            product_id: 15,
            produce_name: "Crispy Apples",
            original_price: 125,
            flash_price: 75,
            discount: 40,
            availability: 22,
            image_url: appleImage
        },
        {
            product_id: 16,
            produce_name: "Fresh Organic Apples",
            original_price: 140,
            flash_price: 89,
            discount: 36,
            availability: 17,
            image_url: appleImage
        },
        {
            product_id: 17,
            produce_name: "Sweet Green Apples",
            original_price: 110,
            flash_price: 65,
            discount: 41,
            availability: 24,
            image_url: appleImage
        },
        {
            product_id: 18,
            produce_name: "Red Delicious Apples",
            original_price: 130,
            flash_price: 79,
            discount: 39,
            availability: 21,
            image_url: appleImage
        },
        {
            product_id: 19,
            produce_name: "Fresh Crisp Apples",
            original_price: 120,
            flash_price: 69,
            discount: 43,
            availability: 26,
            image_url: appleImage
        },
        {
            product_id: 20,
            produce_name: "Organic Green Apples",
            original_price: 115,
            flash_price: 65,
            discount: 43,
            availability: 23,
            image_url: appleImage
        }
    ];

    const [deals] = useState(dummyDeals);

    // Handler for adding the item to the cart
    const handleAddToCart = (deal) => {
        setToastMessage(`${deal.produce_name} added to cart successfully!`);
        setShowToast(true);
        
        // Auto-hide the toast after 3 seconds
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    // Handler for navigating back to the previous page
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="flash-deal-page-container">
            {/* Toast Notification */}
            <ToastNotification 
                message={toastMessage} 
                show={showToast} 
                onClose={() => setShowToast(false)} 
            />
            
            {/* Navigation Header */}
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

            {/* Main content for Flash Deals */}
            <main className="flash-deal-main">
                <div className="page-header">
                    <div className="header-decoration">
                        <div className="decoration-circle circle-1"></div>
                        <div className="decoration-circle circle-2"></div>
                        <div className="decoration-circle circle-3"></div>
                    </div>
                    <h2 className="main-heading">
                        <span className="heading-line-1">Flash Deals</span>
                        <span className="heading-line-2">Limited Time Offers</span>
                    </h2>
                    <div className="heading-icon">
                        <FontAwesomeIcon icon={faBolt} />
                    </div>
                    <p className="page-description">
                        Welcome to the Flash Deal page! Here you can find exclusive, time-sensitive offers on a variety of fresh produce directly from our farmers.
                    </p>
                </div>

                {/* List of deal cards */}
                <div className="deal-card-list">
                    {deals.map(deal => (
                        <DealCard key={deal.product_id} deal={deal} onAddToCart={handleAddToCart} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default FlashDealPage;