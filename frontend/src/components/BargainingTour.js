import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInfoCircle, 
  faHandshake, 
  faChevronRight, 
  faChevronLeft, 
  faTimes,
  faCheckCircle,
  faArrowPointer
} from '@fortawesome/free-solid-svg-icons';
import "./BargainOnboard.css";

const BargainingTour = () => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const [userActions, setUserActions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const tourTimeoutRef = useRef(null);

  // Check if user has seen the tour before
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenBargainingTour');
    if (!hasSeenTour && isFirstTimeUser) {
      // Start tour after a short delay to let page load
      tourTimeoutRef.current = setTimeout(() => {
        setIsTourActive(true);
      }, 2000);
    }

    return () => {
      if (tourTimeoutRef.current) {
        clearTimeout(tourTimeoutRef.current);
      }
    };
  }, [isFirstTimeUser]);

  const tourSteps = [
    {
      title: "Welcome to Bargaining Marketplace!",
      content: "Let me show you how to negotiate directly with farmers for the best prices.",
      action: "acknowledge",
      selector: ".ks-bargaining-section",
      position: "center"
    },
    {
      title: "Step 1: Search for Products",
      content: "Type 'tomato' in the search bar to find farmers selling tomatoes.",
      action: "search",
      expectedValue: "tomato",
      selector: ".ks-farmer-search-container .ks-search-input",
      position: "bottom"
    },
    {
      title: "Step 2: Explore Farmer Options",
      content: "Browse through the farmers who sell tomatoes. Check their ratings and prices.",
      action: "browse",
      selector: ".ks-farmers-list",
      position: "center"
    },
    {
      title: "Step 3: Select a Farmer",
      content: "Click on a farmer card to view their details and products.",
      action: "selectFarmer",
      selector: ".ks-farmer-card:first-child",
      position: "right"
    },
    {
      title: "Step 4: Start Bargaining",
      content: "Now click the 'Bargain' button to begin negotiating with this farmer.",
      action: "clickBargain",
      selector: ".ks-farmer-card:first-child .ks-bargain-btn",
      position: "top"
    },
    {
      title: "Congratulations!",
      content: "You've learned how to use the bargaining feature. Happy negotiating!",
      action: "complete",
      selector: ".ks-bargaining-section",
      position: "center"
    }
  ];

  // Check if user has completed the current step's action
  useEffect(() => {
    if (!isTourActive) return;

    const currentStepData = tourSteps[currentStep];
    
    switch(currentStepData.action) {
      case "search":
        if (searchQuery.toLowerCase() === currentStepData.expectedValue) {
          proceedToNextStep(1000);
        }
        break;
      case "selectFarmer":
        if (selectedFarmer) {
          proceedToNextStep(1000);
        }
        break;
      case "clickBargain":
        // This would be handled by the button click in the actual component
        break;
      default:
        // For acknowledge, browse, complete - no action needed from user
        break;
    }
  }, [searchQuery, selectedFarmer, currentStep, isTourActive]);

  const startTour = () => {
    setIsTourActive(true);
    setCurrentStep(0);
    setUserActions({});
    setSearchQuery("");
    setSelectedFarmer(null);
  };

  const endTour = () => {
    setIsTourActive(false);
    setCurrentStep(0);
    localStorage.setItem('hasSeenBargainingTour', 'true');
    setIsFirstTimeUser(false);
  };

  const proceedToNextStep = (delay = 0) => {
    setTimeout(() => {
      if (currentStep < tourSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        completeTour();
      }
    }, delay);
  };

  const completeTour = () => {
    setUserActions(prev => ({...prev, completed: true}));
    // Auto-close after celebration
    setTimeout(() => {
      endTour();
    }, 3000);
  };

  const goNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Function to calculate position for tour popover
  const calculatePosition = (selector, position) => {
    const element = document.querySelector(selector);
    if (!element) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    switch(position) {
      case "top":
        return {
          top: `${rect.top + scrollTop - 20}px`,
          left: `${rect.left + scrollLeft + rect.width/2}px`,
          transform: 'translateX(-50%)'
        };
      case "bottom":
        return {
          top: `${rect.top + scrollTop + rect.height + 20}px`,
          left: `${rect.left + scrollLeft + rect.width/2}px`,
          transform: 'translateX(-50%)'
        };
      case "left":
        return {
          top: `${rect.top + scrollTop + rect.height/2}px`,
          left: `${rect.left + scrollLeft - 20}px`,
          transform: 'translateY(-50%)'
        };
      case "right":
        return {
          top: `${rect.top + scrollTop + rect.height/2}px`,
          left: `${rect.left + scrollLeft + rect.width + 20}px`,
          transform: 'translateY(-50%)'
        };
      case "center":
      default:
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
    }
  };

  // Function to handle farmer selection (to be called from the farmer card)
  const handleTourFarmerSelect = (farmer) => {
    if (isTourActive && currentStep === 3) { // Step where user needs to select a farmer
      setSelectedFarmer(farmer);
      setUserActions(prev => ({...prev, selectedFarmer: true}));
    }
  };

  // Function to handle bargain click (to be called from the bargain button)
  const handleTourBargainClick = (farmer, product, e) => {
    if (e) e.stopPropagation();
    
    if (isTourActive && currentStep === 4) { // Step where user needs to click bargain
      setUserActions(prev => ({...prev, clickedBargain: true}));
      proceedToNextStep(1000);
      
      // Prevent actual bargain process during tour
      return true;
    }
    return false;
  };

  // Add event listeners to make elements interactive for the tour
  useEffect(() => {
    if (!isTourActive) return;

    const currentStepData = tourSteps[currentStep];
    
    // Add highlight to the current target element
    const targetElement = document.querySelector(currentStepData.selector);
    if (targetElement) {
      targetElement.classList.add('ks-tour-highlight');
      
      // Make element clickable if needed
      if (currentStepData.action === "selectFarmer") {
        targetElement.style.cursor = 'pointer';
        targetElement.addEventListener('click', handleElementClick);
      }
    }

    return () => {
      if (targetElement) {
        targetElement.classList.remove('ks-tour-highlight');
        targetElement.style.cursor = '';
        targetElement.removeEventListener('click', handleElementClick);
      }
    };
  }, [currentStep, isTourActive]);

  const handleElementClick = () => {
    if (currentStep === 3) { // Farmer selection step
      // Simulate selecting the first farmer
      const farmers = document.querySelectorAll('.ks-farmer-card');
      if (farmers.length > 0) {
        const firstFarmer = {
          farmer_id: "demo-farmer-001",
          farmer_name: "Demo Farmer"
        };
        handleTourFarmerSelect(firstFarmer);
      }
    }
  };

  if (!isTourActive) {
    return (
      <div className="ks-tour-launcher">
        <button 
          className="ks-tour-button"
          onClick={startTour}
          title="Learn how to use the bargaining feature"
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Bargaining Guide
        </button>
      </div>
    );
  }

  const currentStepData = tourSteps[currentStep];
  const positionStyle = calculatePosition(currentStepData.selector, currentStepData.position);

  return (
    <>
      <div className="ks-tour-overlay" onClick={() => {
        if (window.confirm("Are you sure you want to exit the tour?")) {
          endTour();
        }
      }}></div>
      
      <div 
        className="ks-tour-popover" 
        style={positionStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ks-tour-header">
          <h3>{currentStepData.title}</h3>
          <button className="ks-tour-close" onClick={endTour}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className="ks-tour-content">
          <p>{currentStepData.content}</p>
          
          {currentStepData.action === "search" && (
            <div className="ks-tour-hint">
              <FontAwesomeIcon icon={faArrowPointer} />
              <span>Type "{currentStepData.expectedValue}" in the search box</span>
            </div>
          )}
          
          {currentStepData.action === "selectFarmer" && (
            <div className="ks-tour-hint">
              <FontAwesomeIcon icon={faArrowPointer} />
              <span>Click on any farmer card to select them</span>
            </div>
          )}
          
          {currentStepData.action === "clickBargain" && (
            <div className="ks-tour-hint">
              <FontAwesomeIcon icon={faArrowPointer} />
              <span>Click the "Bargain" button to start negotiating</span>
            </div>
          )}
        </div>
        
        <div className="ks-tour-footer">
          <div className="ks-tour-progress">
            {currentStep + 1} / {tourSteps.length}
          </div>
          
          <div className="ks-tour-navigation">
            {currentStep > 0 && (
              <button className="ks-tour-prev" onClick={goBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
                Back
              </button>
            )}
            
            {["acknowledge", "browse", "complete"].includes(currentStepData.action) && (
              <button className="ks-tour-next" onClick={goNext}>
                {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                {currentStep < tourSteps.length - 1 && (
                  <FontAwesomeIcon icon={faChevronRight} />
                )}
              </button>
            )}
            
            {currentStepData.action === "search" && searchQuery.toLowerCase() === currentStepData.expectedValue && (
              <button className="ks-tour-next" onClick={goNext}>
                <FontAwesomeIcon icon={faCheckCircle} />
                Next
              </button>
            )}
          </div>
        </div>
        
        <div className={`ks-tour-arrow ks-arrow-${currentStepData.position}`}></div>
      </div>
    </>
  );
};

// Export functions to be used in the main component
export const withBargainingTour = {
  handleTourFarmerSelect: (component) => (farmer) => {
    // This would be called from the farmer card component
    if (component.props.tour && component.props.tour.handleTourFarmerSelect) {
      component.props.tour.handleTourFarmerSelect(farmer);
    }
  },
  handleTourBargainClick: (component) => (farmer, product, e) => {
    // This would be called from the bargain button
    if (component.props.tour && component.props.tour.handleTourBargainClick) {
      return component.props.tour.handleTourBargainClick(farmer, product, e);
    }
    return false;
  }
};

export default BargainingTour;