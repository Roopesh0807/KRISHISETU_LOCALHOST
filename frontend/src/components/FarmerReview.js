import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import "./FarmerReview.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FarmerReview = () => {
    const { farmer, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedImage, setExpandedImage] = useState(null);
    const [consumerPhotos, setConsumerPhotos] = useState({});

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (!farmer || (!farmer.farmer_id && !farmer.id) || !farmer.token) {
                    console.warn("Farmer not properly authenticated", farmer);
                    setIsLoading(false);
                    if (farmer && (farmer.farmer_id || farmer.id)) {
                        setTimeout(() => window.location.reload(), 1000);
                    }
                    return;
                }

                setIsLoading(true);
                setError(null);

                const farmerId = farmer.farmer_id || farmer.id;
                console.log(`Fetching reviews for farmer ID: ${farmerId}`);
                
                const response = await axios.get(
                    `http://localhost:5000/reviews/${farmerId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${farmer.token}`,
                        },
                    }
                );

                const reviewsWithData = (response.data || []).map(review => ({
                    ...review,
                    consumer_name: review.consumer_name || "Anonymous Customer",
                    consumer_initial: (review.consumer_name?.charAt(0)?.toUpperCase() || 'C')
                }));

                setReviews(reviewsWithData);
                
                // Fetch consumer photos after setting reviews
                await fetchConsumerPhotos(reviewsWithData);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
                
                if (error.response?.status === 401) {
                    setError("Session expired. Please log in again.");
                    logout();
                    setTimeout(() => navigate("/farmer-login"), 2000);
                } else {
                    setError(error.response?.data?.error || "Failed to load reviews");
                }
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(fetchReviews, 100);
        return () => clearTimeout(timer);
    }, [farmer, navigate, logout]);

    // Fetch consumer profile photos
    const fetchConsumerPhotos = async (reviewsData) => {
        if (!reviewsData || reviewsData.length === 0) return;

        try {
            const photoPromises = reviewsData.map(async (review) => {
                if (!review.consumer_id) {
                    console.log(`No consumer_id for review:`, review);
                    return null;
                }

                try {
                    console.log(`Fetching photo for consumer: ${review.consumer_id}`);
                    const consumerResponse = await axios.get(
                        `http://localhost:5000/api/consumer/${review.consumer_id}`,
                        {
                            headers: {
                                "Authorization": `Bearer ${farmer.token}`,
                            },
                        }
                    );

                    console.log(`Consumer data for ${review.consumer_id}:`, consumerResponse.data);

                    if (consumerResponse.data && consumerResponse.data.photo) {
                        let photoUrl = consumerResponse.data.photo;
                        
                        // Construct proper photo URL
                        if (!photoUrl.startsWith('http')) {
                            photoUrl = `http://localhost:5000${photoUrl.startsWith('/') ? '' : '/'}${photoUrl}`;
                        }
                        
                        // Add timestamp to prevent caching
                        photoUrl = `${photoUrl}?t=${Date.now()}`;
                        
                        console.log(`Photo URL for consumer ${review.consumer_id}:`, photoUrl);
                        
                        return {
                            consumerId: review.consumer_id,
                            photoUrl: photoUrl
                        };
                    } else {
                        console.log(`No photo found for consumer ${review.consumer_id}`);
                        return null;
                    }
                } catch (error) {
                    console.warn(`Failed to fetch photo for consumer ${review.consumer_id}:`, error.response?.data || error.message);
                    return null;
                }
            });

            const photos = await Promise.all(photoPromises);
            const photoMap = {};
            
            photos.forEach(photo => {
                if (photo && photo.consumerId && photo.photoUrl) {
                    photoMap[photo.consumerId] = photo.photoUrl;
                }
            });
            
            console.log('Final photo map:', photoMap);
            setConsumerPhotos(photoMap);
        } catch (error) {
            console.error("Error fetching consumer photos:", error);
        }
    };

    // Helper function to create image URLs for review images only
    const createImageUrl = (imgPath) => {
        if (!imgPath) return "";
        if (imgPath.startsWith("http")) return imgPath;
        if (imgPath.startsWith("uploads/")) return `http://localhost:5000/${imgPath}`;
        if (imgPath.startsWith("/uploads")) return `http://localhost:5000${imgPath}`;
        return `http://localhost:5000/uploads/${imgPath}`;
    };

    // Handle image expansion
    const handleImageClick = (imgUrl) => {
        setExpandedImage(imgUrl);
    };

    // Close expanded image
    const handleCloseExpandedImage = () => {
        setExpandedImage(null);
    };

    // Generate random color for avatar based on consumer name
    const getAvatarColor = (name) => {
        const colors = [
            'var(--avatar-color-1)', 'var(--avatar-color-2)', 'var(--avatar-color-3)',
            'var(--avatar-color-4)', 'var(--avatar-color-5)', 'var(--avatar-color-6)'
        ];
        const index = name?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        return colors[index];
    };

    // Get consumer photo URL
    const getConsumerPhoto = (consumerId) => {
        return consumerPhotos[consumerId] || null;
    };

    // Render loading state
    if (isLoading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading your reviews...</p>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="error-container">
                <h2>Error</h2>
                <p>{error}</p>
                <div className="error-actions">
                    <button onClick={() => window.location.reload()}>
                        Retry
                    </button>
                    {error.includes("log in") && (
                        <button 
                            onClick={() => navigate("/farmer-login")}
                            className="login-button"
                        >
                            Go to Login
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Main content
    return (
        <div className="farmer-reviews-container">
            {/* Expanded Image Modal */}
            {expandedImage && (
                <div className="image-modal" onClick={handleCloseExpandedImage}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={handleCloseExpandedImage}>
                            &times;
                        </button>
                        <img src={expandedImage} alt="Expanded review" />
                    </div>
                </div>
            )}

            <div className="farmer-reviews">
                <div className="reviews-header">
                    <h2>
                        <span>📝</span> Your Customer Reviews
                        {reviews.length > 0 && (
                            <span className="review-count">
                                ({reviews.length})
                            </span>
                        )}
                    </h2>
                    <p className="reviews-subtitle">What your customers are saying about your products</p>
                </div>

                {reviews.length > 0 ? (
                    <div className="reviews-list">
                        {reviews.map((review, index) => {
                            const consumerPhoto = getConsumerPhoto(review.consumer_id);
                            const hasPhoto = !!consumerPhoto;
                            
                            return (
                                <div 
                                    key={review.review_id || index} 
                                    className="review-card"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="reviewer-info">
                                        {/* Consumer Profile Photo or Alphabet Avatar */}
                                        <div 
                                            className="reviewer-avatar"
                                            style={{ 
                                                background: hasPhoto ? 'transparent' : getAvatarColor(review.consumer_name),
                                            }}
                                        >
                                            {hasPhoto ? (
                                                <img 
                                                    src={consumerPhoto}
                                                    alt={review.consumer_name}
                                                    className="consumer-profile-photo"
                                                    onError={(e) => {
                                                        console.error(`Failed to load profile photo for ${review.consumer_name}:`, e);
                                                        e.target.style.display = 'none';
                                                        // Force fallback to initial
                                                        const avatarDiv = e.target.parentNode;
                                                        avatarDiv.style.background = getAvatarColor(review.consumer_name);
                                                        const initialSpan = avatarDiv.querySelector('.avatar-initial');
                                                        if (initialSpan) {
                                                            initialSpan.style.display = 'block';
                                                        }
                                                    }}
                                                    onLoad={() => {
                                                        console.log(`Successfully loaded profile photo for ${review.consumer_name}`);
                                                    }}
                                                />
                                            ) : null}
                                            <span 
                                                className="avatar-initial"
                                                style={{ 
                                                    display: hasPhoto ? 'none' : 'block',
                                                    color: 'white'
                                                }}
                                            >
                                                {review.consumer_initial}
                                            </span>
                                        </div>
                                        <div className="reviewer-details">
                                            <h3>{review.consumer_name}</h3>
                                            <div className="rating">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        className={star <= review.rating ? "filled" : ""}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="review-date">
                                                {new Date(review.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p className="review-comment">{review.comment}</p>
                                    
                                    {review.image_urls?.length > 0 && (
                                        <div className="review-images">
                                            {review.image_urls.map((img, i) => (
                                                <div key={i} className="image-container">
                                                    <img
                                                        src={createImageUrl(img)}
                                                        alt={`Review ${i + 1}`}
                                                        onClick={() => handleImageClick(createImageUrl(img))}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "https://via.placeholder.com/100x100/667eea/ffffff?text=Image+Not+Found";
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {/* Review Metadata - Only Order ID */}
                                    {review.order_id && (
                                        <div className="review-metadata">
                                            <span className="order-id">
                                                Order: #{review.order_id}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="no-reviews">
                        <div className="no-reviews-illustration">
                            <div className="empty-state-icon">💬</div>
                            <h3>No Reviews Yet</h3>
                            <p>Your customers haven't left any reviews yet. Share your products and encourage feedback!</p>
                            <button 
                                className="cta-button"
                                onClick={() => navigate("/farmer-dashboard")}
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FarmerReview;