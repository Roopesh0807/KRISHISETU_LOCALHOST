export const processVoiceCommand = (command, currentState) => {
    const { newProduce, currentStep, selectedMarket, language } = currentState;
    command = command.toLowerCase().trim();

    // Define keywords and synonyms in both languages
    const keywords = {
        markets: {
            krishisetu: ['krishisetu', 'krishi setu', 'krishi market', 'ಕೃಷಿಸೇತು', 'ಕೃಷಿ', 'ಕೃಷಿ ಸೇತು'],
            bargaining: ['bargaining', 'bargain', 'deal market', 'ಬಾರ್ಗೇನಿಂಗ್', 'ಬಾರ್ಗೇನ್', 'ಬಾರ್ಗೇನ್ ಮಾರುಕಟ್ಟೆ', 'ಸಾಲುಮಾರು']
        },
        actions: {
            next: ['next', 'proceed', 'continue', 'ಮುಂದೆ', 'ಹೋಗು'],
            back: ['back', 'previous', 'ಹಿಂದೆ'],
            cancel: ['cancel', 'close', 'stop', 'ರದ್ದು', 'ನಿಲ್ಲಿಸು', 'ಮುಚ್ಚಿ'],
            submit: ['submit', 'save', 'done', 'ಸಲ್ಲಿಸು', 'ಸೇವ್', 'ಮುಗಿದಿದೆ']
        },
        fields: {
            name: ['name', 'call it', 'label', 'produce name', 'ಹೆಸರು', 'ಉತ್ಪನ್ನದ ಹೆಸರು'],
            quantity: ['quantity', 'amount', 'available', 'have', 'how much', 'ಲಭ್ಯತೆ', 'ಪ್ರಮಾಣ', 'ಕೆಜಿ'],
            price: ['price', 'rate', 'cost', 'per kg', 'ಬೆಲೆ', 'ದರ', 'ಕೆಜಿಗೆ ಬೆಲೆ'],
            minQuantity: ['minimum quantity', 'least amount', 'smallest quantity', 'ಕನಿಷ್ಠ ಪ್ರಮಾಣ', 'ಕನಿಷ್ಠ ಕ್ವಾಂಟಿಟಿ', 'ಕನಿಷ್ಠ ಕೆಜಿ'],
            minPrice: ['minimum price', 'lowest rate', 'least cost', 'ಕನಿಷ್ಠ ಬೆಲೆ', 'ಕನಿಷ್ಠ ದರ', 'ಲೋವೆಸ್ಟ್ ಬೆಲೆ'],
            organic: ['organic', 'natural', 'ಜೈವಿಕ'],
            standard: ['standard', 'regular', 'ಸಾಮಾನ್ಯ']
        }
    };

    // --- Utility functions for flexible matching ---
    const matchesKeyword = (text, keywordList) => {
        return keywordList.some(keyword => text.includes(keyword));
    };

    const getFieldValue = (text, keywordList) => {
        // Try to find a number next to a keyword (e.g., "price 25")
        for (const keyword of keywordList) {
            const regex = new RegExp('(?:${keyword}\\s+)(\\d+(\\.\\d+)?)', 'i');
            const match = text.match(regex);
            if (match) return parseFloat(match[1]);
        }
        // Fallback: Find any number in the sentence
        const numberMatch = text.match(/(\d+(\.\d+)?)/);
        if (numberMatch) return parseFloat(numberMatch[1]);
        return null;
    };
    
    // --- Step-by-step processing logic ---
    if (currentStep === 1) { // Market Selection
        if (matchesKeyword(command, keywords.markets.krishisetu)) {
            return { action: 'selectMarket', payload: { market: 'krishisetu' } };
        }
        if (matchesKeyword(command, keywords.markets.bargaining)) {
            return { action: 'selectMarket', payload: { market: 'bargaining' } };
        }
    }

    if (matchesKeyword(command, keywords.actions.next)) {
        return { action: 'nextStep' };
    }

    if (matchesKeyword(command, keywords.actions.back)) {
        return { action: 'prevStep' };
    }

    if (matchesKeyword(command, keywords.actions.cancel)) {
        return { action: 'cancel' };
    }

    if (matchesKeyword(command, keywords.actions.submit)) {
        return { action: 'submitForm' };
    }

    // Process commands based on the current step
    switch (currentStep) {
        case 2: // Produce Name
            if (command.length > 0 && !matchesKeyword(command, keywords.actions.next)) {
                return { action: 'setField', payload: { field: 'produce_name', value: command } };
            }
            break;
        case 3: // Availability
            const availability = getFieldValue(command, keywords.fields.quantity);
            if (availability !== null) {
                return { action: 'setField', payload: { field: 'availability', value: availability } };
            }
            break;
        case 4: // Price
            const price = getFieldValue(command, keywords.fields.price);
            if (price !== null) {
                return { action: 'setField', payload: { field: 'price_per_kg', value: price } };
            }
            break;
        case 5: // Produce Type
            if (matchesKeyword(command, keywords.fields.organic)) {
                return { action: 'setField', payload: { field: 'produce_type', value: 'Organic' } };
            }
            if (matchesKeyword(command, keywords.fields.standard)) {
                return { action: 'setField', payload: { field: 'produce_type', value: 'Standard' } };
            }
            break;
        case 6: // Minimum Quantity (Bargaining)
            const minQuantity = getFieldValue(command, keywords.fields.minQuantity);
            if (minQuantity !== null) {
                return { action: 'setField', payload: { field: 'minimum_quantity', value: minQuantity } };
            }
            break;
        case 7: // Minimum Price (Bargaining)
            const minPrice = getFieldValue(command, keywords.fields.minPrice);
            if (minPrice !== null) {
                return { action: 'setField', payload: { field: 'minimum_price', value: minPrice } };
            }
            break;
        case 8: // Final Confirmation (Already handled by submit command)
            break;
        default:
            // Fallback for an unknown command in any state
            return { action: 'unknown' };
    }

    // Default to an unknown action if no conditions were met
    return { action: 'unknown' };
};