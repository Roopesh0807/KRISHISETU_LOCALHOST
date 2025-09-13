import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { faArrowLeft, faBolt, faShoppingCart, faTimesCircle, faFire, faCheckCircle, faSpinner, faShareAlt, faCopy } from '@fortawesome/free-solid-svg-icons';
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
    const [isFlashDealActive, setIsFlashDealActive] = useState(false);
    const [shareableLink, setShareableLink] = useState('');
    const [whatsappLink, setWhatsappLink] = useState('');
    const [showQuantityPopup, setShowQuantityPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [imageURL, setImageURL] = useState('');
    const [imagesCache, setImagesCache] = useState({});

    // Fetch product images from Pexels API and cache them
    const fetchProductImage = async (productName) => {
        if (imagesCache[productName]) {
            return imagesCache[productName];
        }
        try {
            const response = await fetch(
                `https://api.pexels.com/v1/search?query=${encodeURIComponent(productName)}&per_page=1`,
                {
                    headers: {
                        Authorization: 'uONxxczjZM1uaDw2jsGQPV70vtBfQbuyHcKeJ0aaCwsK0xxbo5HDpamR'
                    }
                }
            );
            const data = await response.json();
            const imageUrl = data.photos[0]?.src.medium || 'https://via.placeholder.com/300?text=No+Image';
            setImagesCache(prev => ({ ...prev, [productName]: imageUrl }));
            return imageUrl;
        } catch (error) {
            console.error('Error fetching image:', error);
            return 'https://via.placeholder.com/300?text=No+Image';
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareableLink);
        setToastMessage('Link copied to clipboard!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const DealCard = ({ deal, isAvailable }) => {
        const { produce_name, price_per_kg, minimum_price, availability } = deal;
        const [timeLeft, setTimeLeft] = useState(Math.floor(Math.random() * (3600 * 4 - 60 * 10 + 1)) + 60 * 10);
        const [imageSrc, setImageSrc] = useState('https://via.placeholder.com/300?text=Loading...');

        useEffect(() => {
            fetchProductImage(produce_name).then(url => setImageSrc(url));
        }, [produce_name]);
        
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

        const discount = price_per_kg > 0 ? (((price_per_kg - minimum_price) / price_per_kg) * 100).toFixed(0) : 0;
        const buttonClass = `deal-action-btn ${!isAvailable ? 'deal-unavailable' : ''}`;

        const openQuantityPopup = () => {
            if (isAvailable) {
                setSelectedProduct(deal);
                setQuantity(1);
                setShowQuantityPopup(true);
            }
        };

        return (
            <div className="deal-card">
                <div className="deal-image-container">
                    {/* Updated image tag to handle errors more gracefully */}
                    <img 
                      src={imagesCache[produce_name] || 'https://source.unsplash.com/300x200/?vegetables,fruits'} 
                      alt={produce_name} 
                      className="deal-image" 
                      onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://source.unsplash.com/300x200/?${encodeURIComponent(produce_name)}`;
                      }} 
                    />
                    <div className="deal-overlay"></div>
                    <div className="hot-deal-tag">
                        <FontAwesomeIcon icon={faFire} /> HOT DEAL
                    </div>
                    <div className="discount-tag">-{discount}% OFF</div>
                </div>
                <div className="deal-content">
                    <h3>{produce_name}</h3>
                    <p className="deal-price">
                        <span className="original-price">₹{price_per_kg}/kg</span>
                        <span className="flash-price">₹{minimum_price}/kg</span>
                    </p>
                    <div className="availability-bar">
                        <div className="availability-fill" style={{ width: `${(availability / 50) * 100}%` }}></div>
                        <span>Only {availability} kg left</span>
                    </div>
                    {isAvailable ? (
                        <>
                            <p className="deal-timer">
                                ⏰ Time Left: {formatTime(timeLeft)}
                            </p>
                            <button className={buttonClass} onClick={openQuantityPopup}>
                                <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
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
                <button className="toast-close" onClick={onClose}>×</button>
            </div>
        );
    };

    const handleAddToCart = async () => {
        if (!selectedProduct) return;
        setLoading(true);
        setShowQuantityPopup(false);

        try {
            const response = await fetch("http://localhost:5000/api/community-cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${consumer.token}`
                },
                body: JSON.stringify({
                    community_id: location.state?.communityId,
                    product_id: selectedProduct.product_id,
                    consumer_id: consumer.consumer_id,
                    quantity: quantity,
                    price: selectedProduct.minimum_price
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to add to cart');
            }

            setToastMessage(`${selectedProduct.produce_name} added to cart successfully!`);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (err) {
            setError(err.message);
            setToastMessage(`Error: ${err.message}`);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        } finally {
            setLoading(false);
        }
    };
    
// CommunityFlashDeals.js

// ... (existing imports)

useEffect(() => {
    const fetchDealsAndStatus = async () => {
        if (!consumer?.consumer_id || !consumer?.token) {
            setLoading(false);
            return;
        }
        
        const token = consumer.token;

        try {
            // Fetch consumer's pincode
            const profileResponse = await fetch(`http://localhost:5000/api/consumer/${consumer.consumer_id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const profileData = await profileResponse.json();
            const consumerPincode = profileData.pincode;

            if (!consumerPincode || consumerPincode === '000000' || isNaN(consumerPincode)) {
                setIsFlashDealActive(false);
                setLoading(false);
                return;
            }
            
            // ✅ Updated Fetch: Send Authorization header for the protected status route
            const statusResponse = await fetch(`http://localhost:5000/api/community-flash-deals-status/${consumerPincode}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const statusData = await statusResponse.json();
            setIsFlashDealActive(statusData.showFlashDeal);
            setShareableLink(statusData.shareableLink);
            setWhatsappLink(statusData.whatsappLink);

            // ✅ Updated Fetch: Send Authorization header for the protected deals route
            const dealsResponse = await fetch("http://localhost:5000/api/community-flashdeals", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!dealsResponse.ok) {
                throw new Error('Failed to fetch bargaining products');
            }
            const dealsData = await dealsResponse.json();
            setDeals(dealsData);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching data:", err);
            // Handle 401 specifically
            if (err.message.includes('401')) {
                alert('Session expired. Please log in again.');
                // Redirect to login page on unauthorized access
                navigate('/consumer-login');
            }
        } finally {
            setLoading(false);
        }
    };

    fetchDealsAndStatus();
}, [consumer, navigate]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (!consumer) {
        return (
            <div className="flash-deal-page-container">
                <div className="auth-required">
                    <h2>Please log in to view flash deals</h2>
                    <Link to="/consumer-login" className="login-link">Login Now</Link>
                </div>
            </div>
        );
    }
    
    return (
        <div className="flash-deal-page-container">
            <ToastNotification message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
            
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

                {!isFlashDealActive && (
                    <div className="flash-deal-frozen">
                        <p>Your location is not yet eligible for Flash Deals.</p>
                        <p>Share this link with friends and neighbors in your area to unlock flash deals for your community!</p>
                        <div className="share-links">
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="share-btn whatsapp">
                                <i className="fab fa-whatsapp"></i> Share on WhatsApp
                            </a>
                            <button onClick={handleCopyLink} className="share-btn copy">
                                <FontAwesomeIcon icon={faCopy} /> Copy Link
                            </button>
                        </div>
                    </div>
                )}
                
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
                                <DealCard key={deal.product_id} deal={deal} isAvailable={isFlashDealActive && deal.availability > 0} />
                            ))
                        ) : (
                            <p className="no-deals-message">No flash deals are available at the moment. Please check back later!</p>
                        )}
                    </div>
                )}
            </main>
            
            {showQuantityPopup && selectedProduct && (
                <div className="quantity-popup">
                    <div className="quantity-popup-content">
                        <h3>Select Quantity for {selectedProduct.produce_name}</h3>
                        <img 
                            src={imagesCache[selectedProduct.produce_name] || 'https://source.unsplash.com/300x200/?vegetables,fruits'} 
                            alt={selectedProduct.produce_name} 
                            className="popup-image" 
                        />
                        <div className="quantity-controls">
                            <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
                            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min="1" />
                            <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                        </div>
                        <div className="price-details">
                            <p>Price per kg: ₹{selectedProduct.minimum_price}</p>
                            <p>Total Price: ₹{(selectedProduct.minimum_price * quantity).toFixed(2)}</p>
                        </div>
                        <div className="popup-actions">
                            <button onClick={() => setShowQuantityPopup(false)} className="cancel-btn">Cancel</button>
                            <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommunityFlashDeals;