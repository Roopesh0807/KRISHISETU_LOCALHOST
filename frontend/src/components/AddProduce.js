import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import axios from 'axios';
import './addproduce.css';
import KSlogo from "../assets/logo.jpg";
import BSimg from "../assets/bargain.jpeg";
import { AuthContext } from '../context/AuthContext';
import micIcon from '../assets/microphone.png';
import { processVoiceCommand } from './voiceProcessor'; // New file for voice logic

// Helper function to get farmer name
const getFarmerName = (farmerData) => {
    if (!farmerData) return 'Farmer';
    if (farmerData.full_name) return farmerData.full_name;
    if (farmerData.first_name && farmerData.last_name) {
        return `${farmerData.first_name} ${farmerData.last_name}`;
    }
    return farmerData.first_name || farmerData.last_name || 'Farmer';
};

const AddProduce = () => {
    // State declarations
    const [selectedMarket, setSelectedMarket] = useState(null);
    const [produces, setProduces] = useState([]);
    const [newProduce, setNewProduce] = useState({
        produce_name: '',
        availability: '',
        price_per_kg: '',
        produce_type: 'Standard',
        market_type: '',
        minimum_quantity: '',
        minimum_price: ''
    });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [language, setLanguage] = useState('en-IN');
    const [currentStep, setCurrentStep] = useState(0); // 0: Start, 1: Market Select, 2: Produce Name, etc.
    const [isEditing, setIsEditing] = useState(false);
    
    // Voice-specific states
    const [isListening, setIsListening] = useState(false);
    const [voiceInput, setVoiceInput] = useState('');
    const [voiceFeedback, setVoiceFeedback] = useState('');
    const recognitionRef = useRef(null);

    const authContext = useContext(AuthContext);
    const farmer = authContext?.farmer || {};

    const [farmerDetails, setFarmerDetails] = useState({
        id: '',
        name: 'Loading...',
        isLoaded: false
    });

    // New Text-to-Speech Helper
    const speak = useCallback((text, lang) => {
        if ('speechSynthesis' in window) {
            const speechSynthesis = window.speechSynthesis;
            speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            speechSynthesis.speak(utterance);
        }
    }, []);

    // New Speech Recognition Initializer
    const initSpeechRecognition = useCallback(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.warn('Speech recognition not supported');
            return false;
        }

        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = language;

        recognitionRef.current.onstart = () => {
            setIsListening(true);
            setVoiceFeedback(language === 'kn-IN' ? 'ಕೇಳುತ್ತಿದೆ...' : 'Listening...');
        };

        recognitionRef.current.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim();
            setVoiceInput(transcript);
            setVoiceFeedback(language === 'kn-IN' ? `ನೀವು ಹೇಳಿದ್ದು: "${transcript}"` : `You said: "${transcript}"`);
            
            // Immediately process the command after receiving it
            handleVoiceCommand(transcript);
        };

        recognitionRef.current.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
            if (event.error === 'no-speech') {
                setVoiceFeedback(language === 'kn-IN' ? 'ಕ್ಷಮಿಸಿ, ಏನನ್ನೂ ಕೇಳಿಸಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' : 'Sorry, I didn\'t hear anything. Please try again.');
                speak(language === 'kn-IN' ? 'ಕ್ಷಮಿಸಿ, ಏನನ್ನೂ ಕೇಳಿಸಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' : 'Sorry, I didn\'t hear anything. Please try again.', language);
            } else {
                setError(language === 'kn-IN' ? 'ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆಯಲ್ಲಿ ದೋಷ ಕಂಡುಬಂದಿದೆ.' : `Voice recognition error: ${event.error}`);
                setVoiceFeedback('');
            }
        };
        
        recognitionRef.current.onend = () => {
            setIsListening(false);
            if (!error) {
              setVoiceFeedback('');
            }
        };

        return true;
    }, [language, speak]);

    useEffect(() => {
        const isSupported = initSpeechRecognition();
        return () => {
            if (isSupported && recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [initSpeechRecognition]);

    const handleVoiceCommand = (command) => {
        // This is where we use our intelligent voice processor
        const result = processVoiceCommand(command, { 
          produces, 
          selectedMarket, 
          newProduce, 
          currentStep,
          language 
        });

        if (result.action) {
            handleCommand(result.action, result.payload);
        } else {
            const feedback = language === 'kn-IN' ? `ಕ್ಷಮಿಸಿ, ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ.` : `Sorry, I didn't understand that.`;
            setVoiceFeedback(feedback);
            speak(feedback, language);
        }
    };
    
    // A single entry point for all commands (voice or button clicks)
    const handleCommand = (action, payload) => {
        let feedback = '';
        switch(action) {
            case 'selectMarket':
                handleMarketClick(payload.market);
                feedback = language === 'kn-IN' ? 
                  `ಕೃಷಿ ಸೇತು ಮಾರುಕಟ್ಟೆಗೆ ಬದಲಾಯಿಸಲಾಗಿದೆ. ಈಗ ನಿಮ್ಮ ಮೊದಲ ಉತ್ಪನ್ನವನ್ನು ಸೇರಿಸೋಣ.` : 
                  `Switched to KrishiSetu Market. Let's add your first produce.`;
                setVoiceFeedback(feedback);
                speak(feedback, language);
                break;
            case 'setField':
                setNewProduce(prev => ({ ...prev, [payload.field]: payload.value }));
                handleNextStep();
                break;
            case 'submitForm':
                handleSubmit();
                break;
            case 'editProduce':
                editProduce(payload.produce);
                break;
            case 'deleteProduce':
                deleteProduce(payload.productId);
                break;
            case 'confirmDelete':
                // This would trigger a confirmation state if implemented
                break;
            case 'nextStep':
                handleNextStep();
                break;
            case 'prevStep':
                handlePrevStep();
                break;
            default:
                break;
        }
    };

    const toggleVoiceRecognition = () => {
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            try {
                recognitionRef.current.lang = language;
                recognitionRef.current.start();
            } catch (err) {
                console.error('Failed to start recognition:', err);
                setError(language === 'kn-IN' ? 'ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಪ್ರಾರಂಭಿಸಲು ವಿಫಲವಾಗಿದೆ' : 'Failed to start voice recognition.');
            }
        }
    };

    useEffect(() => {
        if (authContext?.farmer) {
            setFarmerDetails({
                id: authContext.farmer.farmer_id || '',
                name: getFarmerName(authContext.farmer),
                isLoaded: true
            });
        } else {
            setFarmerDetails({
                id: '',
                name: 'Loading...',
                isLoaded: false
            });
        }
    }, [authContext?.farmer]);

    const loadProduces = useCallback(async () => {
        if (!selectedMarket || !farmerDetails.id || !farmerDetails.isLoaded) return;
        
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:5000/api/produces`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    farmer_id: farmerDetails.id,
                    market_type: selectedMarket
                }
            });
            setProduces(response.data);
            setError('');
        } catch (err) {
            console.error('Failed to fetch produces:', err);
            setError('Failed to load produces. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [selectedMarket, farmerDetails.id, farmerDetails.isLoaded]);

    useEffect(() => {
        loadProduces();
    }, [loadProduces]);

    const handleMarketClick = (market) => {
        const marketType = market === 'krishisetu' ? 'KrishiSetu Market' : 'Bargaining Market';
        setSelectedMarket(marketType);
        setIsFormVisible(true);
        setError('');
        setCurrentStep(2); // Start the conversational flow
        setNewProduce({
            produce_name: '',
            availability: '',
            price_per_kg: '',
            produce_type: 'Standard',
            market_type: marketType,
            minimum_quantity: '',
            minimum_price: ''
        });
        const prompt = language === 'kn-IN' ? 'ನಿಮ್ಮ ಉತ್ಪನ್ನದ ಹೆಸರನ್ನು ಹೇಳಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ.' : 'Please say or type the name of your produce.';
        setVoiceFeedback(prompt);
        speak(prompt, language);
    };

    const handleNextStep = () => {
        setError('');
        // Validation check for each step
        switch (currentStep) {
            case 2: // Produce Name
                if (!newProduce.produce_name) {
                    setError(language === 'kn-IN' ? 'ದಯವಿಟ್ಟು ಉತ್ಪನ್ನದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ' : 'Please enter a produce name');
                    return;
                }
                const prompt2 = language === 'kn-IN' ? `ಎಷ್ಟು ಕೆಜಿ ${newProduce.produce_name} ಲಭ್ಯವಿದೆ?` : `How many kilograms of ${newProduce.produce_name} are available?`;
                setVoiceFeedback(prompt2);
                speak(prompt2, language);
                break;
            case 3: // Availability
                if (isNaN(newProduce.availability) || parseFloat(newProduce.availability) <= 0) {
                    setError(language === 'kn-IN' ? 'ಮಾನ್ಯವಾದ ಪ್ರಮಾಣವನ್ನು ನಮೂದಿಸಿ' : 'Please enter a valid quantity');
                    return;
                }
                const prompt3 = language === 'kn-IN' ? `ಪ್ರತಿ ಕೆಜಿಗೆ ${newProduce.produce_name} ಬೆಲೆ ಎಷ್ಟು?` : `What is the price per kg for ${newProduce.produce_name}?`;
                setVoiceFeedback(prompt3);
                speak(prompt3, language);
                break;
            case 4: // Price
                if (isNaN(newProduce.price_per_kg) || parseFloat(newProduce.price_per_kg) <= 0) {
                    setError(language === 'kn-IN' ? 'ಮಾನ್ಯವಾದ ಬೆಲೆಯನ್ನು ನಮೂದಿಸಿ' : 'Please enter a valid price');
                    return;
                }
                const prompt4 = language === 'kn-IN' ? `ಇದು ಯಾವ ಪ್ರಕಾರದ ಉತ್ಪನ್ನ? ಸಾಮಾನ್ಯ ಅಥವಾ ಜೈವಿಕ?` : `What type of produce is this? Standard or Organic?`;
                setVoiceFeedback(prompt4);
                speak(prompt4, language);
                break;
            case 5: // Produce Type
                if (selectedMarket === 'Bargaining Market') {
                    const prompt5 = language === 'kn-IN' ? `ಬಾರ್ಗೇನಿಂಗ್‌ಗೆ ಕನಿಷ್ಠ ಪ್ರಮಾಣ ಎಷ್ಟು?` : `What is the minimum quantity for bargaining?`;
                    setVoiceFeedback(prompt5);
                    speak(prompt5, language);
                }
                break;
            case 6: // Minimum Quantity (Bargaining)
                if (isNaN(newProduce.minimum_quantity) || parseFloat(newProduce.minimum_quantity) < 10) {
                    setError(language === 'kn-IN' ? 'ಕನಿಷ್ಠ ಪ್ರಮಾಣ 10 ಕೆಜಿ ಇರಬೇಕು.' : 'Minimum quantity must be at least 10kg.');
                    return;
                }
                const prompt6 = language === 'kn-IN' ? `ಕನಿಷ್ಠ ಸ್ವೀಕಾರಾರ್ಹ ಬೆಲೆ ಎಷ್ಟು?` : `What is the minimum acceptable price?`;
                setVoiceFeedback(prompt6);
                speak(prompt6, language);
                break;
            case 7: // Minimum Price (Bargaining)
                if (isNaN(newProduce.minimum_price) || parseFloat(newProduce.minimum_price) >= parseFloat(newProduce.price_per_kg)) {
                    setError(language === 'kn-IN' ? 'ಕನಿಷ್ಠ ಬೆಲೆ ಸಾಮಾನ್ಯ ಬೆಲೆಗಿಂತ ಕಡಿಮೆ ಇರಬೇಕು' : 'Minimum price must be less than the regular price.');
                    return;
                }
                break;
            default:
                break;
        }

        const nextStep = (selectedMarket === 'Bargaining Market' && currentStep === 5) ? 6 : (selectedMarket !== 'Bargaining Market' && currentStep === 5) ? 8 : currentStep + 1;
        setCurrentStep(nextStep);
    };

    const handlePrevStep = () => {
        setError('');
        const prevStep = (selectedMarket === 'Bargaining Market' && currentStep === 6) ? 5 : (selectedMarket !== 'Bargaining Market' && currentStep === 6) ? 4 : currentStep - 1;
        setCurrentStep(prevStep);
    };

    const handleSubmit = async () => {
        setError('');
        
        // Final validation before submission
        if (selectedMarket === 'Bargaining Market') {
            if (isNaN(newProduce.minimum_quantity) || parseFloat(newProduce.minimum_quantity) < 10) {
                setError(language === 'kn-IN' ? 'ಬಾರ್ಗೇನಿಂಗ್ ಮಾರುಕಟ್ಟೆಗೆ ಕನಿಷ್ಠ ಪ್ರಮಾಣ 10ಕೆಜಿ ಇರಬೇಕು' : 'Minimum quantity must be at least 10kg for Bargaining Market');
                setCurrentStep(6);
                return;
            }
            if (isNaN(newProduce.minimum_price) || parseFloat(newProduce.minimum_price) >= parseFloat(newProduce.price_per_kg)) {
                setError(language === 'kn-IN' ? 'ಕನಿಷ್ಠ ಬೆಲೆ ಸಾಮಾನ್ಯ ಬೆಲೆಗಿಂತ ಕಡಿಮೆ ಇರಬೇಕು' : 'Minimum price must be less than the regular price');
                setCurrentStep(7);
                return;
            }
        }
    
        if (!farmer?.farmer_id) {
            setError(language === 'kn-IN' ? 'ರೈತರ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಲಾಗಿನ್ ಆಗಿ' : 'Farmer information not available. Please log in again.');
            return;
        }
    
        try {
            setIsLoading(true);
            const produceData = {
                ...newProduce,
                farmer_id: farmer.farmer_id,
                farmer_name: farmer.full_name || `${farmer.first_name} ${farmer.last_name}`,
                email: farmer.email,
                availability: parseFloat(newProduce.availability),
                price_per_kg: parseFloat(newProduce.price_per_kg),
                market_type: selectedMarket,
                ...(selectedMarket === 'Bargaining Market' && {
                    minimum_quantity: parseFloat(newProduce.minimum_quantity),
                    minimum_price: parseFloat(newProduce.minimum_price)
                })
            };
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            };
    
            if (isEditing) {
                await axios.put(
                    `http://localhost:5000/api/produces/${newProduce.id}`,
                    produceData,
                    config
                );
            } else {
                await axios.post(
                    'http://localhost:5000/api/produces',
                    produceData,
                    config
                );
            }
    
            await loadProduces();
            resetForm();
            alert(language === 'kn-IN' ? 'ಉತ್ಪನ್ನ ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ' : 'Produce added successfully');
        } catch (err) {
            console.error('Failed to save produce:', err);
            setError(err.response?.data?.error || (language === 'kn-IN' ? 'ಉತ್ಪನ್ನವನ್ನು ಸೇರಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ' : 'Failed to save produce. Please try again.'));
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setNewProduce({
            produce_name: '',
            availability: '',
            price_per_kg: '',
            produce_type: 'Standard',
            market_type: selectedMarket,
            minimum_quantity: '',
            minimum_price: ''
        });
        setCurrentStep(1);
        setIsEditing(false);
        setError('');
    };

    const editProduce = (produce) => {
        setNewProduce({
            ...produce,
            id: produce.product_id,
            minimum_quantity: produce.minimum_quantity || '',
            minimum_price: produce.minimum_price || ''
        });
        setSelectedMarket(produce.market_type);
        setIsFormVisible(true);
        setIsEditing(true);
        setCurrentStep(2); // Start editing from the first step
        const prompt = language === 'kn-IN' ? `ನಿಮ್ಮ ಉತ್ಪನ್ನದ ವಿವರಗಳನ್ನು ಸಂಪಾದಿಸುತ್ತಿದ್ದೀರಿ. ಹೆಸರನ್ನು ಹೇಳಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ.` : `You're editing produce details. Say or type the name.`;
        setVoiceFeedback(prompt);
        speak(prompt, language);
    };

    const deleteProduce = async (productId) => {
        if (!window.confirm(language === 'kn-IN' ? 'ನೀವು ಈ ಉತ್ಪನ್ನವನ್ನು ಅಳಿಸಲು ಖಚಿತವೇ?' : 'Are you sure you want to delete this produce?')) {
            return;
        }
        try {
            setIsLoading(true);
            await axios.delete(`http://localhost:5000/api/produces/${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            await loadProduces();
            alert(language === 'kn-IN' ? 'ಉತ್ಪನ್ನ ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ' : 'Produce deleted successfully');
        } catch (err) {
            console.error('Failed to delete produce:', err);
            setError(language === 'kn-IN' ? 'ಉತ್ಪನ್ನವನ್ನು ಅಳಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ' : 'Failed to delete produce. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    // A function to render the form step with hybrid input options
    const renderFormByStep = () => {
        const question = getStepQuestion(currentStep);
        return (
            <div className="form-step">
                <h3>{question.text}</h3>
                <div className="voice-text-hybrid">
                    <button 
                        className={`mic-button ${isListening ? 'listening' : ''}`}
                        onClick={toggleVoiceRecognition}
                        disabled={!('webkitSpeechRecognition' in window)}
                    >
                        <img src={micIcon} alt="Microphone" />
                    </button>
                    {question.inputType === 'text' && (
                        <input
                            type="text"
                            value={newProduce[question.field]}
                            onChange={(e) => setNewProduce({ ...newProduce, [question.field]: e.target.value })}
                            placeholder={question.placeholder}
                        />
                    )}
                    {question.inputType === 'number' && (
                        <input
                            type="number"
                            value={newProduce[question.field]}
                            onChange={(e) => setNewProduce({ ...newProduce, [question.field]: e.target.value })}
                            placeholder={question.placeholder}
                        />
                    )}
                    {question.inputType === 'options' && (
                        <div className="option-buttons">
                            <button className={newProduce.produce_type === 'Standard' ? 'selected' : ''} onClick={() => setNewProduce({ ...newProduce, produce_type: 'Standard' })}>
                                {language === 'kn-IN' ? 'ಸಾಮಾನ್ಯ' : 'Standard'}
                            </button>
                            <button className={newProduce.produce_type === 'Organic' ? 'selected' : ''} onClick={() => setNewProduce({ ...newProduce, produce_type: 'Organic' })}>
                                {language === 'kn-IN' ? 'ಜೈವಿಕ' : 'Organic'}
                            </button>
                        </div>
                    )}
                </div>
                <div className="voice-feedback">{voiceFeedback}</div>
                <div className="button-group">
                    {currentStep > 2 && <button onClick={handlePrevStep}>{language === 'kn-IN' ? 'ಹಿಂದೆ' : 'Back'}</button>}
                    {currentStep < 8 && <button onClick={handleNextStep}>{language === 'kn-IN' ? 'ಮುಂದೆ' : 'Next'}</button>}
                    {currentStep === 8 && <button onClick={handleSubmit}>{language === 'kn-IN' ? 'ಸಲ್ಲಿಸಿ' : 'Submit'}</button>}
                </div>
            </div>
        );
    };
    
    const getStepQuestion = (step) => {
        const questions = {
            2: {
                text: language === 'kn-IN' ? 'ನಿಮ್ಮ ಉತ್ಪನ್ನದ ಹೆಸರು ಏನು?' : 'What is the produce name?',
                placeholder: language === 'kn-IN' ? 'ಉದಾ: ಆಲೂಗಡ್ಡೆ' : 'e.g., Potato',
                field: 'produce_name',
                inputType: 'text'
            },
            3: {
                text: language === 'kn-IN' ? `ನಿಮ್ಮ ಬಳಿ ಎಷ್ಟು ಕೆಜಿ ${newProduce.produce_name} ಇದೆ?` : `How many kilograms of ${newProduce.produce_name} are available?`,
                placeholder: language === 'kn-IN' ? 'ಕೆಜಿಯಲ್ಲಿ ಪ್ರಮಾಣ' : 'Quantity in kg',
                field: 'availability',
                inputType: 'number'
            },
            4: {
                text: language === 'kn-IN' ? `ಪ್ರತಿ ಕೆಜಿಗೆ ${newProduce.produce_name} ಬೆಲೆ ಎಷ್ಟು?` : `What is the price per kg for ${newProduce.produce_name}?`,
                placeholder: language === 'kn-IN' ? 'ಪ್ರತಿ ಕೆಜಿಗೆ ಬೆಲೆ' : 'Price per kg',
                field: 'price_per_kg',
                inputType: 'number'
            },
            5: {
                text: language === 'kn-IN' ? `ಇದು ಯಾವ ಪ್ರಕಾರದ ಉತ್ಪನ್ನ?` : `What type of produce is this?`,
                placeholder: '',
                field: 'produce_type',
                inputType: 'options'
            },
            6: {
                text: language === 'kn-IN' ? `ಕನಿಷ್ಠ ಪ್ರಮಾಣ ಎಷ್ಟು? (ಕನಿಷ್ಠ 10 ಕೆಜಿ)` : `What is the minimum quantity? (Min. 10 kg)`,
                placeholder: language === 'kn-IN' ? 'ಕನಿಷ್ಠ ಪ್ರಮಾಣ' : 'Minimum quantity',
                field: 'minimum_quantity',
                inputType: 'number'
            },
            7: {
                text: language === 'kn-IN' ? `ಕನಿಷ್ಠ ಬೆಲೆ ಎಷ್ಟು?` : `What is the minimum price?`,
                placeholder: language === 'kn-IN' ? 'ಕನಿಷ್ಠ ಬೆಲೆ' : 'Minimum price',
                field: 'minimum_price',
                inputType: 'number'
            },
            8: {
                text: language === 'kn-IN' ? 'ನೀವು ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿದ್ದೀರಿ. ಸಲ್ಲಿಸುವುದನ್ನು ದೃಢೀಕರಿಸಿ.' : 'You have entered all details. Confirm submission.',
                inputType: 'confirm'
            }
        };
        return questions[step] || { text: '', inputType: '' };
    };

    return (
        <div className="addproduce-container">
            <div className="header">
                <h1>{language === 'kn-IN' ? 'ಪಟ್ಟಿಗೆ ಸೇರಿಸಲಾದ ಉತ್ಪನ್ನಗಳು' : 'Produces Added to the List'}</h1>
                <div className="language-toggle">
                    <button onClick={() => setLanguage('en-IN')} className={language === 'en-IN' ? 'active' : ''}>English</button>
                    <button onClick={() => setLanguage('kn-IN')} className={language === 'kn-IN' ? 'active' : ''}>ಕನ್ನಡ</button>
                </div>
            </div>
            
            <div className="farmer-info-section">
                {farmerDetails.isLoaded ? (
                    <>
                        <p><strong>{language === 'kn-IN' ? 'ರೈತರ ಹೆಸರು:' : 'Farmer Name:'}</strong> {farmerDetails.name}</p>
                        {farmerDetails.id && <p><strong>{language === 'kn-IN' ? 'ರೈತರ ID:' : 'Farmer ID:'}</strong> {farmerDetails.id}</p>}
                    </>
                ) : (
                    <p>{language === 'kn-IN' ? 'ರೈತರ ಮಾಹಿತಿಯನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...' : 'Loading farmer information...'}</p>
                )}
            </div>

            {error && <div className="error-message">{error}</div>}
            {isLoading && <div className="loading-indicator">{language === 'kn-IN' ? 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...' : 'Loading...'}</div>}

            {currentStep === 0 && (
                <div className="market-selection">
                    <h2>{language === 'kn-IN' ? 'ನೀವು ಯಾವ ಮಾರುಕಟ್ಟೆಗೆ ಉತ್ಪನ್ನವನ್ನು ಸೇರಿಸಲು ಬಯಸುತ್ತೀರಿ?' : 'Which market would you like to add produce to?'}</h2>
                    <div className="addproduce-market-buttons">
                        <button onClick={() => handleMarketClick('krishisetu')} disabled={isLoading}>
                            <img src={KSlogo} alt="KrishiSetu Logo" />
                            <span>{language === 'kn-IN' ? 'ಕೃಷಿಸೇತು ಮಾರುಕಟ್ಟೆ' : 'KrishiSetu Market'}</span>
                        </button>
                        <button onClick={() => handleMarketClick('bargaining')} disabled={isLoading}>
                            <img src={BSimg} alt="Bargaining Logo" />
                            <span>{language === 'kn-IN' ? 'ಬಾರ್ಗೇನಿಂಗ್ ಮಾರುಕಟ್ಟೆ' : 'Bargaining Market'}</span>
                        </button>
                    </div>
                </div>
            )}
            
            {currentStep > 1 && (
                <div className="conversational-form-card">
                    {renderFormByStep()}
                </div>
            )}

            {selectedMarket && (
                <>
                    <h3 className="list-title">
                        {language === 'kn-IN' ?
                            `${selectedMarket === 'KrishiSetu Market' ? 'ಕೃಷಿಸೇತು ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ' : 'ಬಾರ್ಗೇನಿಂಗ್ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ'} ಉತ್ಪನ್ನಗಳ ಪಟ್ಟಿ` :
                            `List of Produces in ${selectedMarket}`}
                    </h3>
                    {produces.length > 0 ? (
                        <table className="addproduce-table">
                            <thead>
                                <tr>
                                    <th>{language === 'kn-IN' ? 'ಉತ್ಪನ್ನದ ಹೆಸರು' : 'Produce Name'}</th>
                                    <th>{language === 'kn-IN' ? 'ಪ್ರಕಾರ' : 'Type'}</th>
                                    <th>{language === 'kn-IN' ? 'ಲಭ್ಯತೆ (ಕೆಜಿ)' : 'Availability (kg)'}</th>
                                    <th>{language === 'kn-IN' ? 'ಪ್ರತಿ ಕೆಜಿಗೆ ಬೆಲೆ' : 'Price per KG'}</th>
                                    {selectedMarket === 'Bargaining Market' && (
                                        <>
                                            <th>{language === 'kn-IN' ? 'ಕನಿಷ್ಠ ಪ್ರಮಾಣ' : 'Min Quantity'}</th>
                                            <th>{language === 'kn-IN' ? 'ಕನಿಷ್ಠ ಬೆಲೆ' : 'Min Price'}</th>
                                        </>
                                    )}
                                    <th>{language === 'kn-IN' ? 'ಕ್ರಿಯೆಗಳು' : 'Actions'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produces.map((produce) => (
                                    <tr key={produce.product_id}>
                                        <td>{produce.produce_name}</td>
                                        <td>{language === 'kn-IN' ? (produce.produce_type === 'Organic' ? 'ಜೈವಿಕ' : 'ಸಾಮಾನ್ಯ') : produce.produce_type}</td>
                                        <td>{produce.availability} {language === 'kn-IN' ? 'ಕೆಜಿ' : 'kg'}</td>
                                        <td>₹{produce.price_per_kg}</td>
                                        {selectedMarket === 'Bargaining Market' && (
                                            <>
                                                <td>{produce.minimum_quantity || 'N/A'} {language === 'kn-IN' ? 'ಕೆಜಿ' : 'kg'}</td>
                                                <td>₹{produce.minimum_price || 'N/A'}</td>
                                            </>
                                        )}
                                        <td>
                                            <button className="addproduce-edit-button" onClick={() => editProduce(produce)} disabled={isLoading}>
                                                {language === 'kn-IN' ? 'ಸಂಪಾದಿಸಿ' : 'Edit'}
                                            </button>
                                            <button className="addproduce-remove-button" onClick={() => deleteProduce(produce.product_id)} disabled={isLoading}>
                                                {language === 'kn-IN' ? 'ಅಳಿಸಿ' : 'Remove'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>{language === 'kn-IN' ?
                            'ಈ ಮಾರುಕಟ್ಟೆಗೆ ಇನ್ನೂ ಯಾವುದೇ ಉತ್ಪನ್ನಗಳನ್ನು ಸೇರಿಸಲಾಗಿಲ್ಲ' :
                            'No produces added yet for this market.'}</p>
                    )}
                </>
            )}
        </div>
    );
};

export default AddProduce;