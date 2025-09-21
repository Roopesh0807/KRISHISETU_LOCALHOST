import React, { useState, useEffect } from 'react';
import Joyride from 'react-joyride';
import { 
  FaInfoCircle, 
  FaHandshake, 
  FaShoppingCart, 
  FaMoneyBillWave, 
  FaComments,
  FaUserTie,
  FaExchangeAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaWeightHanging,
  FaSearchDollar
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './BargainOnboard.css';

const BargainOnboardingTour = () => {
    const [runTour, setRunTour] = useState(false);
    const [showRestartButton, setShowRestartButton] = useState(false);
    const navigate = useNavigate();
    const { consumer } = useAuth();

    const BargainingTipsContent = () => (
        <div className="bargaining-tips-content">
            <h3><FaHandshake /> Bargaining Tips</h3>
            <ul>
                <li><FaCheckCircle className="tip-icon" /> Start with a reasonable offer (10-15% below asking price)</li>
                <li><FaUserTie className="tip-icon" /> Be respectful - farmers have production costs too</li>
                <li><FaWeightHanging className="tip-icon" /> Larger quantities often get better prices</li>
                <li><FaExchangeAlt className="tip-icon" /> Be prepared to meet somewhere in the middle</li>
                <li><FaShoppingCart className="tip-icon" /> Consider long-term relationships for better deals</li>
            </ul>
        </div>
    );

    const FinalStepContent = () => (
        <div className="final-step-content">
            <div className="final-step-header">
                <FaHandshake className="final-icon" />
                <h3>You're Ready to Bargain!</h3>
            </div>
            <p className="final-step-text">
                You now know how to negotiate with farmers on KrishiSetu. Remember that successful bargaining 
                is about finding a fair price that works for both you and the farmer.
            </p>
            <div className="final-step-buttons">
                <button 
                    onClick={() => handleTourEnd({ action: 'custom', status: 'finished' })}
                    className="start-bargaining-btn"
                >
                    <FaHandshake /> Start Bargaining
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
                        <FaHandshake className="step-icon" />
                        <h3>Welcome to KrishiSetu Bargaining</h3>
                    </div>
                    <p>Learn how to negotiate directly with farmers for the best prices on fresh produce!</p>
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
        // Step 2: Product Selection
        {
            target: '.krishi-form-select',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaSearchDollar className="step-icon" />
                        <h4>Select Product</h4>
                    </div>
                    <p>Choose which farm product you want to negotiate for. Different products may have different bargaining flexibility.</p>
                </div>
            ),
            placement: 'bottom',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 3: Quantity Selection
        {
            target: '.krishi-form-input',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaWeightHanging className="step-icon" />
                        <h4>Set Quantity</h4>
                    </div>
                    <p>Specify how much you need. Farmers often offer better prices for larger quantities, so consider buying in bulk!</p>
                </div>
            ),
            placement: 'top',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 4: Price Information
        {
            target: '.krishi-price-summary',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaMoneyBillWave className="step-icon" />
                        <h4>Price Information</h4>
                    </div>
                    <p>This shows the current market price and total cost. Your goal is to negotiate a better deal through friendly bargaining.</p>
                </div>
            ),
            placement: 'top',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 5: Start Bargaining Button
        {
            target: '.krishi-btn-primary',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaHandshake className="step-icon" />
                        <h4>Begin Negotiation</h4>
                    </div>
                    <p>Click here to start the bargaining session after selecting your product and quantity. This will connect you directly with the farmer.</p>
                </div>
            ),
            placement: 'top',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 6: Chat Interface Overview
        {
            target: '.krishi-chat-interface',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaComments className="step-icon" />
                        <h4>Bargaining Chat</h4>
                    </div>
                    <p>This is where the negotiation happens. You'll chat directly with the farmer in real-time to reach an agreement on price.</p>
                </div>
            ),
            placement: 'center',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 7: Product Info in Chat
        {
            target: '.krishi-chat-product-info',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaInfoCircle className="step-icon" />
                        <h4>Negotiation Details</h4>
                    </div>
                    <p>During bargaining, you can see the product details, current negotiated price, and quantity here.</p>
                </div>
            ),
            placement: 'bottom',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 8: Price Suggestions
        {
            target: '.krishi-price-suggestions',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaMoneyBillWave className="step-icon" />
                        <h4>Make an Offer</h4>
                    </div>
                    <p>When it's your turn, you'll see suggested prices. Choose one to counter the farmer's offer or suggest your own price.</p>
                </div>
            ),
            placement: 'top',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 9: Farmer's Offer Response
        {
            target: '.krishi-counter-offer',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaUserTie className="step-icon" />
                        <h4>Respond to Offers</h4>
                    </div>
                    <p>When the farmer makes an offer, you can accept it, reject it, or make a counter offer. Negotiation is a back-and-forth process!</p>
                </div>
            ),
            placement: 'top',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 10: Connection Status
        {
            target: '.krishi-connection-status',
            content: (
                <div className="tour-step-content">
                    <div className="tour-step-header">
                        <FaExchangeAlt className="step-icon" />
                        <h4>Connection Status</h4>
                    </div>
                    <p>This shows your real-time connection status. Make sure you're connected to receive immediate responses from the farmer.</p>
                </div>
            ),
            placement: 'left',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 11: Bargaining Tips
        {
            target: 'body',
            content: <BargainingTipsContent />,
            placement: 'center',
            title: ' ',
            styles: {
                options: {
                    zIndex: 10050
                }
            }
        },
        // Step 12: Final Step
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
        const hasCompletedBargainTour = localStorage.getItem('krishisetu_bargain_tour_completed');
        
        if (!hasCompletedBargainTour) {
            const timer = setTimeout(() => {
                setRunTour(true);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setShowRestartButton(true);
        }
    }, []);

    const handleTourEnd = (data) => {
        const { action, status } = data;
        
        if (action === 'close' || status === 'finished' || status === 'skipped' || status === 'custom') {
            localStorage.setItem('krishisetu_bargain_tour_completed', 'true');
            setRunTour(false);
            setShowRestartButton(true);
        }
    };

    const restartTour = () => {
        localStorage.removeItem('krishisetu_bargain_tour_completed');
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
                        width: '360px'
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
                <button className="tour-restart-btn bargain-tour-btn" onClick={restartTour}>
                    <FaHandshake />
                    <span>Bargain Help</span>
                </button>
            )}
        </>
    );
};

export default BargainOnboardingTour;