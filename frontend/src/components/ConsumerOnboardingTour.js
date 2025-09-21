

// import React, { useState, useEffect } from 'react';
// import Joyride from 'react-joyride';
// import { FaInfoCircle } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import './ConsOnboard.css';

// const ConsumerOnboardingTour = () => {
//     const [runTour, setRunTour] = useState(false);
//     const [showRestartButton, setShowRestartButton] = useState(false);
//     const navigate = useNavigate();
//     const { consumer } = useAuth();

//     const FinalStepContent = () => (
//         <div className="final-step-content">
//             <p className="final-step-text">
//                 That's it! You're all set to explore KrishiSetu. Enjoy fresh produce directly from farmers, great deals, and a seamless shopping experience. Happy shopping!
//             </p>
//             <div className="final-step-buttons">
//                 <button 
//                     onClick={() => {
//                         handleTourEnd({ action: 'custom', status: 'finished' });
//                         if (consumer?.consumer_id) {
//                             navigate(`/consumer-profile`);
//                         }
//                     }}
//                     className="go-to-profile-btn"
//                 >
//                     Complete Profile
//                 </button>
//                 <button 
//                     onClick={() => handleTourEnd({ action: 'custom', status: 'finished' })}
//                     className="fill-later-btn"
//                 >
//                     Start Shopping
//                 </button>
//             </div>
//         </div>
//     );

//     const tourSteps = [
//         // Step 1: Location and Search - The starting point
//         {
//             target: '.ks-search-location-bar',
//             content: "Welcome to KrishiSetu! Let's get you started. Here you can set your delivery location and search for products across all our marketplaces.",
//             placement: 'bottom',
//             title: 'Welcome to KrishiSetu!',
//             disableBeacon: true,
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
//         // Step 2: Logo and Brand Navigation
//         {
//             target: '.logo',
//             content: "This is the KrishiSetu logo. Click here anytime to return to your dashboard homepage.",
//             placement: 'bottom',
//             title: 'Home Navigation',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
//         // Step 3: Home Navigation Link
//         {
//             target: '.navbar-links li:nth-child(1) .navbar-link',
//             content: "The Home link takes you back to your main dashboard where you can browse all products.",
//             placement: 'bottom',
//             title: 'Home Navigation',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
        
//         // Step 4: Profile Navigation Link
//         {
//             target: '.profile-icon-container',
//             content: "Access your profile, orders, and account settings from here. You can also logout from this menu.",
//             placement: 'bottom',
//             title: 'Your Account',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
//         // Step 5: Bargaining Navigation Link
//         {
//             target: '.navbar-links li:nth-child(2) .navbar-link',
//             content: "Access the bargaining marketplace where you can negotiate prices directly with farmers.",
//             placement: 'bottom',
//             title: 'Bargaining Feature',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
//         // Step 6: Community Orders Navigation Link
//         {
//             target: '.navbar-links li:nth-child(3) .navbar-link',
//             content: "Join community orders to get better prices by combining orders with other customers in your area.",
//             placement: 'bottom',
//             title: 'Community Orders',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
//         // Step 7: Community Flash Deals Navigation
//         {
//             target: '.navbar-links li:nth-child(4) .navbar-link',
//             content: "Check out limited-time flash deals available only in your community.",
//             placement: 'bottom',
//             title: 'Flash Deals',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
//         // Step 8: Subscription Navigation Link
//         {
//             target: '.navbar-links li:nth-child(5) .navbar-link',
//             content: "Set up subscriptions for regular deliveries of your favorite products at discounted prices.",
//             placement: 'bottom',
//             title: 'Subscriptions',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
//         // Step 9: Cart Navigation Link
//         {
//             target: '.navbar-links li:nth-child(6) .navbar-link',
//             content: "View your shopping cart and proceed to checkout from here. The number shows items in your cart.",
//             placement: 'bottom',
//             title: 'Shopping Cart',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
        
//         // Step 10: Help/Chatbot Navigation
//         {
//             target: '.chatbot-btn',
//             content: "Need assistance? Click here to access our help chatbot for any questions or support.",
//             placement: 'bottom',
//             title: 'Help & Support',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
        
//         // BARGAINING SECTION SPECIFIC STEPS
//         // Step 11: Bargaining Marketplace Section
//         {
//             target: '.ks-bargaining-section',
//             content: "This is our unique Bargaining Marketplace! Here you can negotiate prices directly with farmers for the best deals.",
//             placement: 'top',
//             title: 'Bargaining Marketplace',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
//         // Step 12: Farmer Search in Bargaining Section
//         {
//             target: '.ks-farmer-search-container',
//             content: "Search for specific farmers or products in the bargaining marketplace to find what you're looking for.",
//             placement: 'top',
//             title: 'Search Farmers & Products',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
//         // Step 13: Farmer Filters
//         {
//             target: '.ks-farmer-filters',
//             content: "Sort farmers by price or product type to find the best bargaining opportunities.",
//             placement: 'top',
//             title: 'Filter Options',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
//         // Step 14: Farmer Card
//         {
//             target: '.ks-farmer-card',
//             content: "Each card represents a farmer. You can see their rating, distance from you, and available products.",
//             placement: 'top',
//             title: 'Farmer Profile',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
//         // Step 15: Farmer Products Table
//         {
//             target: '.ks-products-table',
//             content: "This table shows all the products available from this farmer, including prices and availability.",
//             placement: 'top',
//             title: 'Available Products',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
//         // Step 16: Bargain Button
//         {
//             target: '.ks-bargain-btn',
//             content: "Click this button to start bargaining with the farmer. You'll be taken to a chat interface where you can negotiate the price.",
//             placement: 'top',
//             title: 'Start Bargaining',
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
//         // Step 17: Bargaining Tips
//         {
//             target: 'body',
//             content: (
//                 <div className="bargaining-tips-content">
//                     <h3>Bargaining Tips</h3>
//                     <ul>
//                         <li>Be respectful in your negotiations</li>
//                         <li>Consider the farmer's costs and fair pricing</li>
//                         <li>Larger quantities often get better prices</li>
//                         <li>Regular purchases can lead to better deals</li>
//                     </ul>
//                     <p>Ready to try your bargaining skills?</p>
//                 </div>
//             ),
//             placement: 'center',
//             title: "Bargaining Tips",
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         },
//         // Step 18: Final Custom Step
//         {
//             target: 'body',
//             content: <FinalStepContent />,
//             placement: 'center',
//             title: "You're All Set!",
//             disableClose: true,
//             showProgress: false,
//             showButtons: false,
//             styles: {
//                 options: {
//                     zIndex: 10050
//                 }
//             }
//         }
//     ];

//     useEffect(() => {
//         const hasCompletedTour = localStorage.getItem('krishisetu_consumer_tour_completed');
        
//         if (!hasCompletedTour) {
//             const timer = setTimeout(() => {
//                 setRunTour(true);
//             }, 1500);
//             return () => clearTimeout(timer);
//         } else {
//             setShowRestartButton(true);
//         }
//     }, []);

//     const handleTourEnd = (data) => {
//         const { action, status } = data;
        
//         if (action === 'close' || status === 'finished' || status === 'skipped' || status === 'custom') {
//             localStorage.setItem('krishisetu_consumer_tour_completed', 'true');
//             setRunTour(false);
//             setShowRestartButton(true);
//         }
//     };

//     const restartTour = () => {
//         localStorage.removeItem('krishisetu_consumer_tour_completed');
//         setShowRestartButton(false);
//         setRunTour(true);
//     };
    
//     return (
//         <>
//             <Joyride
//                 steps={tourSteps}
//                 run={runTour}
//                 continuous={true}
//                 showProgress={true}
//                 showSkipButton={true}
//                 callback={handleTourEnd}
//                 styles={{
//                     options: { 
//                         zIndex: 10050, 
//                         primaryColor: '#2b9047',
//                     },
//                     tooltip: { 
//                         borderRadius: '8px', 
//                         boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//                         backgroundColor: '#f7fff5',
//                         color: '#2e7d32'
//                     },
//                     button: { 
//                         borderRadius: '4px',
//                         backgroundColor: '#2e7d32',
//                         color: 'white'
//                     },
//                     spotlight: {
//                         backgroundColor: 'rgba(255, 255, 255, 0.49)',
//                     },
//                 }}
//                 floaterProps={{
//                     styles: {
//                         floater: {
//                             filter: 'none'
//                         }
//                     }
//                 }}
//                 spotlightPadding={5}
//                 disableOverlayClose={true}
//             />
//             {showRestartButton && (
//                 <button className="tour-restart-btn" onClick={restartTour}>
//                     <FaInfoCircle />
//                 </button>
//             )}
//         </>
//     );
// };

// export default ConsumerOnboardingTour;

import React, { useState, useEffect } from 'react';
import Joyride from 'react-joyride';
import { 
  FaInfoCircle, 
  FaStore, 
  FaHandshake, 
  FaUsers, 
  FaCalendarAlt,
  FaBolt,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaSearch,
  FaTag,
  FaTruck,
  FaLeaf,
  FaMoneyBillWave,
  FaShieldAlt,
  FaStar,
  FaPercentage
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ConsOnboard.css';

const ConsumerDashboardTour = () => {
    const [runTour, setRunTour] = useState(false);
    const [showRestartButton, setShowRestartButton] = useState(false);
    const navigate = useNavigate();
    const { consumer } = useAuth();

    const MarketplaceBenefitsContent = () => (
        <div className="marketplace-benefits-content">
            <h3><FaStore /> KrishiSetu Marketplace Benefits</h3>
            <div className="benefits-grid">
                <div className="benefit-item">
                    <FaLeaf className="benefit-icon" />
                    <h4>Direct from Farmers</h4>
                    <p>Fresh produce sourced directly from local farmers, ensuring quality and freshness</p>
                </div>
                <div className="benefit-item">
                    <FaShieldAlt className="benefit-icon" />
                    <h4>Fixed Pricing</h4>
                    <p>Stable prices set by farmers based on market rates - no negotiation needed</p>
                </div>
                <div className="benefit-item">
                    <FaTruck className="benefit-icon" />
                    <h4>Reliable Delivery</h4>
                    <p>Guaranteed delivery to your location with real-time tracking</p>
                </div>
                <div className="benefit-item">
                    <FaTag className="benefit-icon" />
                    <h4>Quality Assurance</h4>
                    <p>All products are quality-checked and certified organic when applicable</p>
                </div>
            </div>
        </div>
    );

    const BargainingBenefitsContent = () => (
        <div className="bargaining-benefits-content">
            <h3><FaHandshake /> Bargaining Marketplace Benefits</h3>
            <div className="benefits-grid">
                <div className="benefit-item">
                    <FaMoneyBillWave className="benefit-icon" />
                    <h4>Better Prices</h4>
                    <p>Negotiate directly with farmers for potentially lower prices</p>
                </div>
                <div className="benefit-item">
                    <FaUsers className="benefit-icon" />
                    <h4>Direct Communication</h4>
                    <p>Chat directly with farmers to understand their products and practices</p>
                </div>
                <div className="benefit-item">
                    <FaStar className="benefit-icon" />
                    <h4>Build Relationships</h4>
                    <p>Establish long-term relationships with farmers for recurring deals</p>
                </div>
                <div className="benefit-item">
                    <FaPercentage className="benefit-icon" />
                    <h4>Bulk Discounts</h4>
                    <p>Get better rates when purchasing larger quantities</p>
                </div>
            </div>
        </div>
    );

    const SubscriptionBenefitsContent = () => (
        <div className="subscription-benefits-content">
            <h3><FaCalendarAlt /> Subscription Benefits</h3>
            <ul>
                <li><FaPercentage className="benefit-icon" /> <strong>5% Discount</strong> on all subscription orders</li>
                <li><FaBolt className="benefit-icon" /> <strong>Priority Delivery</strong> for subscribed products</li>
                <li><FaMoneyBillWave className="benefit-icon" /> <strong>Price Lock</strong> - guaranteed prices for your subscription period</li>
                <li><FaLeaf className="benefit-icon" /> <strong>Freshness Guarantee</strong> - always get the freshest produce</li>
                <li><FaCalendarAlt className="benefit-icon" /> <strong>Flexible Scheduling</strong> - choose daily, weekly, or monthly deliveries</li>
            </ul>
        </div>
    );

    const FinalStepContent = () => (
        <div className="final-step-content">
            <div className="final-step-header">
                <FaStore className="final-icon" />
                <h3>You're Ready to Explore!</h3>
            </div>
            <p className="final-step-text">
                Now you understand how KrishiSetu works! You can shop from our fixed-price marketplace, 
                negotiate directly with farmers, join community deals, or set up subscriptions for regular deliveries.
            </p>
            <div className="platform-stats">
                <div className="stat-item">
                    <FaLeaf />
                    <span>1000+ Farmers</span>
                </div>
                <div className="stat-item">
                    <FaShoppingCart />
                    <span>5000+ Products</span>
                </div>
                <div className="stat-item">
                    <FaUsers />
                    <span>10,000+ Happy Customers</span>
                </div>
            </div>
            <div className="final-step-buttons">
                <button 
                    onClick={() => handleTourEnd({ action: 'custom', status: 'finished' })}
                    className="start-shopping-btn"
                >
                    <FaShoppingCart /> Start Shopping
                </button>
            </div>
        </div>
    );

    const tourSteps = [
        // Step 1: Introduction
        {
            target: 'body',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaStore className="step-icon" />
                        <h3>Welcome to KrishiSetu!</h3>
                    </div>
                    <p>Your one-stop platform for fresh farm produce directly from farmers. Let's explore how it works!</p>
                </div>
            ),
            placement: 'center',
            title: ' ',
            disableBeacon: true,
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 2: Location & Search
        {
            target: '.ks-search-location-bar',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaMapMarkerAlt className="step-icon" />
                        <h4>Set Your Location & Search</h4>
                    </div>
                    <p>First, set your delivery location to see products available in your area. Then search across all marketplaces!</p>
                </div>
            ),
            placement: 'bottom',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 3: Flash Deals Banner
        {
            target: '.ks-flash-deal-banner-new',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaBolt className="step-icon" />
                        <h4>Community Flash Deals</h4>
                    </div>
                    <p>Limited-time offers where prices drop as more people join. Great discounts when the community participates together!</p>
                </div>
            ),
            placement: 'bottom',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 4: Recommendations
        {
            target: '.ks-recommendation-section',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaStar className="step-icon" />
                        <h4>Personalized Recommendations</h4>
                    </div>
                    <p>Based on your past orders and preferences, we suggest products you might like. Perfect for discovering new favorites!</p>
                </div>
            ),
            placement: 'top',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 5: KrishiSetu Marketplace Overview
        {
            target: '.ks-market-section',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaStore className="step-icon" />
                        <h4>KrishiSetu Marketplace</h4>
                    </div>
                    <p>Shop from fixed-price products directly from farmers. No negotiation needed - just add to cart and checkout!</p>
                </div>
            ),
            placement: 'top',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 6: Marketplace Benefits
        {
            target: 'body',
            content: <MarketplaceBenefitsContent />,
            placement: 'center',
            title: ' ',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 7: Marketplace Product Card
        {
            target: '.ks-product-card',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaShoppingCart className="step-icon" />
                        <h4>Marketplace Products</h4>
                    </div>
                    <p>Each product shows price, quantity options, and farming type. You can add to cart, buy now, or set up subscriptions!</p>
                </div>
            ),
            placement: 'top',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 8: Subscription Feature
        {
            target: '.ks-subscribe-btn',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaCalendarAlt className="step-icon" />
                        <h4>Subscription Service</h4>
                    </div>
                    <p>Set up regular deliveries and save 5%! Perfect for your everyday essentials like milk, vegetables, or fruits.</p>
                </div>
            ),
            placement: 'top',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 9: Subscription Benefits
        {
            target: 'body',
            content: <SubscriptionBenefitsContent />,
            placement: 'center',
            title: ' ',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 10: Bargaining Marketplace Overview
        {
            target: '.ks-bargaining-section',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaHandshake className="step-icon" />
                        <h4>Bargaining Marketplace</h4>
                    </div>
                    <p>Our unique feature where you can negotiate prices directly with farmers. Try your bargaining skills for better deals!</p>
                </div>
            ),
            placement: 'top',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 11: Bargaining Benefits
        {
            target: 'body',
            content: <BargainingBenefitsContent />,
            placement: 'center',
            title: ' ',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 12: Farmer Card
        {
            target: '.ks-farmer-card',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaUsers className="step-icon" />
                        <h4>Meet the Farmers</h4>
                    </div>
                    <p>Each farmer profile shows their rating, distance from you, and available products. Click to view details or start bargaining!</p>
                </div>
            ),
            placement: 'top',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 13: Bargain Button
        {
            target: '.ks-bargain-btn',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaHandshake className="step-icon" />
                        <h4>Start Bargaining</h4>
                    </div>
                    <p>Click here to begin negotiations with a farmer. You'll chat in real-time to agree on a price that works for both!</p>
                </div>
            ),
            placement: 'top',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 14: Final Step
        {
            target: 'body',
            content: <FinalStepContent />,
            placement: 'center',
            title: ' ',
            disableClose: true,
            showProgress: false,
            showButtons: false,
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        }
    ];

    useEffect(() => {
        const hasCompletedDashboardTour = localStorage.getItem('krishisetu_dashboard_tour_completed');
        
        if (!hasCompletedDashboardTour) {
            const timer = setTimeout(() => {
                setRunTour(true);
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            setShowRestartButton(true);
        }
    }, []);

    const handleTourEnd = (data) => {
        const { action, status } = data;
        
        if (action === 'close' || status === 'finished' || status === 'skipped' || status === 'custom') {
            localStorage.setItem('krishisetu_dashboard_tour_completed', 'true');
            setRunTour(false);
            setShowRestartButton(true);
        }
    };

    const restartTour = () => {
        localStorage.removeItem('krishisetu_dashboard_tour_completed');
        setShowRestartButton(false);
        setRunTour(true);
    };
    
    return (
        <>
            <Joyride
                steps={tourSteps}
                run={runTour}
                continuous={true}
                showProgress={true}
                showSkipButton={true}
                callback={handleTourEnd}
                styles={{
                    options: { 
                        zIndex: 10050, 
                        primaryColor: '#2b9047',
                    },
                    tooltip: { 
                        borderRadius: '12px', 
                        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                        backgroundColor: '#f7fff5',
                        color: '#2e7d32',
                        padding: '20px',
                        width: '380px'
                    },
                    button: { 
                        borderRadius: '6px',
                        backgroundColor: '#2e7d32',
                        color: 'white',
                        padding: '10px 16px'
                    },
                    buttonSkip: {
                        color: '#888'
                    },
                    buttonBack: {
                        color: '#2e7d32'
                    },
                    spotlight: {
                        backgroundColor: 'rgba(43, 144, 71, 0.2)',
                        borderRadius: '8px'
                    },
                }}
                floaterProps={{
                    styles: {
                        floater: {
                            filter: 'none'
                        }
                    }
                }}
                spotlightPadding={8}
                disableOverlayClose={true}
                locale={{
                    back: 'Back',
                    close: 'Close',
                    last: 'Finish',
                    next: 'Next',
                    skip: 'Skip Tour'
                }}
            />
            {showRestartButton && (
                <button className="tour-restart-btn dashboard-tour-btn" onClick={restartTour}>
                    <FaInfoCircle />
                    <span>Platform Guide</span>
                </button>
            )}
        </>
    );
};

export default ConsumerDashboardTour;