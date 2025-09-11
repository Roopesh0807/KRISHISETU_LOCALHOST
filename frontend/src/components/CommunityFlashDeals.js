import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft, faBolt, faShoppingCart, faTimesCircle, faFire, faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

const CommunityFlashDeals = () => {
    const navigate = useNavigate();
    const [deals, setDeals] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    
    const DealCard = ({ deal, onAddToCart }) => {
        const { produce_name, original_price, flash_price, discount, availability, image_url, product_id } = deal;
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
                        <i className="fa-solid fa-fire"></i> HOT DEAL
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
                                        <i className="fa-solid fa-check-circle"></i> Added!
                                    </>
                                ) : isAdding ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i> Adding...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-shopping-cart"></i> Add to Cart
                                    </>
                                )}
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="deal-timer" style={{ color: 'red' }}>Sold Out!</p>
                            <button className={buttonClass} disabled>
                                <i className="fa-solid fa-times-circle"></i> Sold Out
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
                    <i className="fa-solid fa-check-circle toast-icon"></i>
                    <span>{message}</span>
                </div>
                <button className="toast-close" onClick={onClose}>×</button>
            </div>
        );
    };


    const fetchBargainingProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/community-flashdeals");
    const data = await response.json();
    setProducts(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


    useEffect(() => {
        const fetchBargainingProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/community-flashdeals");
                if (!response.ok) {
                    // Check for a 401 Unauthorized status and throw a more specific error
                    if (response.status === 401) {
                         throw new Error('Unauthorized: Authentication failed. Please log in.');
                    } else {
                         throw new Error('Failed to fetch bargaining products');
                    }
                }
                const data = await response.json();

                const formattedDeals = data.map(product => {
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
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error("Error fetching data:", err);
            }
        };

        fetchBargainingProducts();
    }, []);

    const handleAddToCart = (deal) => {
        setToastMessage(`${deal.produce_name} added to cart successfully!`);
        setShowToast(true);
        
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="community-flash-deals-container">
            <style jsx>{`
                .community-flash-deals-container {
                    font-family: 'Inter', sans-serif;
                    background-color: #f7f8fc;
                    min-height: 100vh;
                    padding: 20px;
                    color: #333;
                }

                .dashboard-header {
                    background-color: #fff;
                    padding: 15px 20px;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .header-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }

                .logo-text {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: #4CAF50;
                    margin: 0;
                }

                .nav-actions .back-button {
                    background-color: #e0e0e0;
                    color: #333;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .nav-actions .back-button:hover {
                    background-color: #d0d0d0;
                }

                .flash-deal-main {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .page-header {
                    text-align: center;
                    margin-bottom: 40px;
                    position: relative;
                }

                .header-decoration {
                    position: absolute;
                    top: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 10px;
                }

                .decoration-circle {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                }

                .circle-1 { background-color: #FF5722; }
                .circle-2 { background-color: #FFC107; }
                .circle-3 { background-color: #FF9800; }

                .main-heading {
                    font-size: 3.5rem;
                    font-weight: 900;
                    color: #212121;
                    letter-spacing: -1.5px;
                    line-height: 1.2;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .heading-line-1 {
                    font-size: 0.8em;
                    font-weight: 400;
                    opacity: 0.7;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }

                .heading-line-2 {
                    font-weight: 900;
                }

                .heading-icon {
                    font-size: 2rem;
                    color: #FF5722;
                    margin-top: 10px;
                    animation: pulse 1.5s infinite;
                }

                .page-description {
                    font-size: 1.1rem;
                    max-width: 600px;
                    margin: 15px auto 0;
                    color: #666;
                }

                .deal-card-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 25px;
                }

                .deal-card {
                    background-color: #fff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                }

                .deal-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
                }

                .deal-image-container {
                    position: relative;
                    width: 100%;
                    padding-top: 66.66%;
                    overflow: hidden;
                }

                .deal-image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .deal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
                }

                .hot-deal-tag {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background-color: #FF5722;
                    color: #fff;
                    padding: 5px 10px;
                    border-radius: 6px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    animation: fadeIn 0.5s ease-out;
                }

                .discount-tag {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background-color: #4CAF50;
                    color: #fff;
                    padding: 5px 10px;
                    border-radius: 6px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }

                .deal-content {
                    padding: 20px;
                    text-align: center;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .deal-content h3 {
                    margin-top: 0;
                    margin-bottom: 10px;
                    font-size: 1.5rem;
                    color: #212121;
                    font-weight: 700;
                }

                .deal-price {
                    margin-bottom: 15px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                }

                .original-price {
                    text-decoration: line-through;
                    color: #9e9e9e;
                    font-size: 1rem;
                }

                .flash-price {
                    font-size: 1.8rem;
                    font-weight: 800;
                    color: #FF5722;
                }

                .availability-bar {
                    background-color: #e0e0e0;
                    border-radius: 8px;
                    height: 10px;
                    overflow: hidden;
                    margin-bottom: 15px;
                    position: relative;
                }

                .availability-bar span {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 0.8rem;
                    color: #fff;
                    font-weight: 600;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                }

                .availability-fill {
                    background-color: #4CAF50;
                    height: 100%;
                    transition: width 0.5s ease-out;
                }

                .deal-timer {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #FF9800;
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                }

                .timer-icon {
                    font-size: 1.2rem;
                }

                .deal-action-btn {
                    padding: 12px 20px;
                    border: none;
                    border-radius: 10px;
                    font-size: 1rem;
                    font-weight: 700;
                    color: #fff;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    background: linear-gradient(45deg, #FF5722, #FF9800);
                }

                .deal-action-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
                }

                .deal-action-btn:disabled {
                    background: #9e9e9e;
                    cursor: not-allowed;
                    opacity: 0.8;
                }

                .deal-action-btn.adding {
                    background: #4CAF50;
                    opacity: 0.8;
                }

                .deal-action-btn.added {
                    background: #4CAF50;
                    box-shadow: none;
                }

                .loading-container, .error-container {
                    text-align: center;
                    padding: 50px;
                    font-size: 1.2rem;
                    color: #666;
                }

                .loading-container p, .error-container p {
                    margin-top: 10px;
                }

                .no-deals-message {
                    text-align: center;
                    font-size: 1.2rem;
                    color: #9e9e9e;
                    margin-top: 50px;
                }

                .toast-notification {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    background-color: #4CAF50;
                    color: #fff;
                    padding: 15px 25px;
                    border-radius: 10px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transform: translateX(150%);
                    transition: transform 0.5s ease-in-out;
                    z-index: 1000;
                }

                .toast-notification.show {
                    transform: translateX(0);
                }

                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .toast-icon {
                    font-size: 1.5rem;
                }

                .toast-close {
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 1.5rem;
                    cursor: pointer;
                    margin-left: 20px;
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="community-flash-deals-container">
                <ToastNotification 
                    message={toastMessage} 
                    show={showToast} 
                    onClose={() => setShowToast(false)} 
                />
                
                <header className="dashboard-header">
                    <div className="header-top">
                        <h1 className="logo-text">KrishiBazaar</h1>
                        <div className="nav-actions">
                            <button onClick={handleGoBack} className="back-button">
                                <i className="fa-solid fa-arrow-left"></i> Back
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
                            <i className="fa-solid fa-bolt"></i>
                        </div>
                        <p className="page-description">
                            Welcome to the Flash Deal page! Here you can find exclusive, time-sensitive offers on a variety of fresh produce directly from our farmers.
                        </p>
                    </div>

                    {loading && (
                        <div className="loading-container">
                            <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                            <p>Loading deals...</p>
                        </div>
                    )}

                    {error && (
                        <div className="error-container">
                            <i className="fa-solid fa-times-circle fa-2x"></i>
                            <p>Error: {error}</p>
                        </div>
                    )}
                    
                    {!loading && !error && (
                        <div className="deal-card-list">
                            {deals.length > 0 ? (
                                deals.map(deal => (
                                    <DealCard key={deal.product_id} deal={deal} onAddToCart={handleAddToCart} />
                                ))
                            ) : (
                                <p className="no-deals-message">No flash deals are available at the moment. Please check back later!</p>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CommunityFlashDeals;
