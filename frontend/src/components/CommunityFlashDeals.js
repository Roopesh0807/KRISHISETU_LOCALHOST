import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { faArrowLeft, faBolt, faShoppingCart, faTimesCircle, faFire, faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CommunityFlashDeals.css';

const CommunityFlashDeals = () => {
    const { consumer } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isFrozen, setIsFrozen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [shareableLink, setShareableLink] = useState('');
    const [whatsappLink, setWhatsappLink] = useState('');

    const Popup = () => (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="popup-close" onClick={() => setShowPopup(false)}>
                    &times;
                </button>
                <h3>Do you like to participate in the flash deals?</h3>
                <p>Share this link to invite more people in your area to unlock exclusive flash deals!</p>
                <div className="popup-links">
                    <div className="share-link-container">
                        <input type="text" value={shareableLink} readOnly />
                        <button onClick={() => {
                            navigator.clipboard.writeText(shareableLink);
                            setToastMessage('Link copied to clipboard!');
                            setShowToast(true);
                            setTimeout(() => setShowToast(false), 3000);
                        }}>
                            <FontAwesomeIcon icon={faCheckCircle} /> Copy Link
                        </button>
                    </div>
                    <a href={whatsappLink} className="whatsapp-share-btn" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faShoppingCart} /> Share via WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );

    const DealCard = ({ deal }) => {
        const { produce_name, original_price, flash_price, discount, availability, image_url } = deal;
        const [timeLeft, setTimeLeft] = useState(Math.floor(Math.random() * (3600 * 4 - 60 * 10 + 1)) + 60 * 10);
        const [isAdding, setIsAdding] = useState(false);
        const [showAdded, setShowAdded] = useState(false);

        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
            return () => clearInterval(timer);
        }, []);

        const formatTime = (seconds) => {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = seconds % 60;
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        };

        const handleAddToCart = () => {
            if (isFrozen) {
                setShowPopup(true);
                return;
            }
            if (!isAvailable) return;

            setIsAdding(true);
            setTimeout(() => {
                setToastMessage(`${produce_name} added to cart successfully!`);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                setIsAdding(false);
                setShowAdded(true);
                setTimeout(() => setShowAdded(false), 2000);
            }, 800);
        };

        const isAvailable = availability > 0 && timeLeft > 0;
        const buttonClass = `deal-action-btn ${isFrozen ? 'frozen' : ''} ${!isAvailable ? 'deal-unavailable' : ''} ${isAdding ? 'adding' : ''} ${showAdded ? 'added' : ''}`;

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
                        <div className="availability-fill" style={{ width: `${(availability / 50) * 100}%` }}></div>
                        <span>Only {availability} kg left</span>
                    </div>
                    {isAvailable ? (
                        <>
                            <p className="deal-timer">
                                <span className="timer-icon">⏰</span>
                                Time Left: {formatTime(timeLeft)}
                            </p>
                            <button className={buttonClass} onClick={handleAddToCart} disabled={!isAvailable || isAdding || isFrozen}>
                                {isFrozen ? "Participate to Unlock" : (
                                    showAdded ? (
                                        <><FontAwesomeIcon icon={faCheckCircle} /> Added!</>
                                    ) : isAdding ? (
                                        <><FontAwesomeIcon icon={faSpinner} spin /> Adding...</>
                                    ) : (
                                        <><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</>
                                    )
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

    const ToastNotification = ({ message, show, onClose }) => {
        return (
            <div className={`toast-notification ${show ? 'show' : ''}`}>
                <div className="toast-content">
                    <FontAwesomeIcon icon={faCheckCircle} className="toast-icon" />
                    <span>{message}</span>
                </div>
                <button className="toast-close" onClick={onClose}>&times;</button>
            </div>
        );
    };

    const fetchCommunityData = async (pincode) => {
        try {
            const statusResponse = await fetch(`http://localhost:5000/api/community-flash-deals-status/${pincode}`);
            if (!statusResponse.ok) {
                throw new Error('Failed to fetch community status');
            }
            const statusData = await statusResponse.json();
            
            setIsFrozen(!statusData.showFlashDeal);
            setShareableLink(statusData.shareableLink);
            setWhatsappLink(statusData.whatsappLink);

            if (statusData.showFlashDeal) {
                const dealsResponse = await fetch("http://localhost:5000/api/community-flashdeals");
                if (!dealsResponse.ok) {
                    if (dealsResponse.status === 401) {
                        throw new Error('Unauthorized: Authentication failed. Please log in.');
                    } else {
                        throw new Error('Failed to fetch bargaining products');
                    }
                }
                const dealsData = await dealsResponse.json();
                
                const formattedDeals = dealsData.map(product => {
                    const original_price = parseFloat(product.price_per_kg);
                    const flash_price = parseFloat(product.minimum_price);
                    const discount = original_price > 0 ? (((original_price - flash_price) / original_price) * 100).toFixed(0) : 0;
                    
                    return {
                        product_id: product.product_id,
                        produce_name: product.produce_name,
                        original_price: original_price,
                        flash_price: flash_price,
                        discount: discount,
                        availability: product.availability,
                        image_url: `https://source.unsplash.com/300x200/?${encodeURIComponent(product.produce_name)}`
                    };
                });
                setDeals(formattedDeals);
            } else {
                setDeals([]);
                setShowPopup(true);
            }

        } catch (err) {
            setError(err.message);
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const pincodeFromUrl = query.get('pincode');
        
        if (pincodeFromUrl) {
            fetchCommunityData(pincodeFromUrl);
        } else if (consumer && consumer.consumer_id) {
            const fetchConsumerProfile = async () => {
                try {
                    const profileResponse = await fetch(`http://localhost:5000/api/consumer/${consumer.consumer_id}`, {
                        headers: {
                            'Authorization': `Bearer ${consumer.token}`,
                        },
                    });
                    const profileData = await profileResponse.json();
                    if (profileResponse.ok && profileData.pincode) {
                        fetchCommunityData(profileData.pincode);
                    } else {
                        setLoading(false);
                        setError("Pincode not available. Please complete your profile to view flash deals.");
                    }
                } catch (err) {
                    setLoading(false);
                    setError("Failed to fetch consumer profile. Please try again later.");
                }
            };
            fetchConsumerProfile();
        } else {
            setLoading(false);
        }
    }, [consumer, location.search]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (!consumer) {
        return (
            <div className="community-flash-deals-container">
                <div className="auth-required">
                    <h2>Please log in to view flash deals</h2>
                    <Link to="/consumer-login" className="login-link">Login Now</Link>
                </div>
            </div>
        );
    }
    
    return (
        <div className={`community-flash-deals-container ${isFrozen ? 'frozen-page' : ''}`}>
            {showPopup && <Popup />}
            <ToastNotification 
                message={toastMessage} 
                show={showToast} 
                onClose={() => setShowToast(false)} 
            />
            

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

                {loading && (
                    <div className="loading-container">
                        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                        <p>Loading deals...</p>
                    </div>
                )}

                {error && (
                    <div className="error-container">
                        <FontAwesomeIcon icon={faTimesCircle} size="2x" />
                        <p>Error: {error}</p>
                    </div>
                )}
                
                {!loading && !error && (
                    <div className="deal-card-list">
                        {deals.length > 0 ? (
                            deals.map(deal => (
                                <DealCard key={deal.product_id} deal={deal} />
                            ))
                        ) : (
                            <p className="no-deals-message">No flash deals are available at the moment. Please check back later!</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default CommunityFlashDeals;
