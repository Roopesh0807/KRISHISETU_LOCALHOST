// // ./src/controllers/smsController.js (FINAL WORKING VERSION)

// require("dotenv").config();
// const axios = require('axios');
// const { queryDatabase } = require('../config/db'); 

// // -------------------------------------------------------------------
// // --- 1. UTILITY FUNCTIONS (Defined here to ensure local scope) ---
// // -------------------------------------------------------------------













// async function sendSms(phoneNumber, message) {
//     const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY; 

//     // ⚠️ DEVELOPMENT/FREE MODE: SIMULATE SMS SENDING
//     if (!FAST2SMS_API_KEY || process.env.NODE_ENV !== 'production') {
//         console.log("-----------------------------------------");
//         console.log("✅ SMS SIMULATION MODE ACTIVE (Development Only)");
//         console.log(`To: ${phoneNumber}`);
//         console.log(`Message: ${message}`);
//         console.log("-----------------------------------------");
//         return { success: true, simulated: true };
//     }
    
//     // 🚀 PRODUCTION/PAID MODE (Placeholder)
//     // ... (Your real API logic would go here)
//     return { success: false, error: "Live SMS configured but not implemented." };
// }










// // async function sendSms(phoneNumber, message) {
// //     const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY || 'YOUR_FALLBACK_KEY'; 
// //     const FAST2SMS_API_URL = 'https://www.fast2sms.com/dev/bulkV2';

// //     // 1. Check for API Key and run in simulation if missing/in development
// //     if (process.env.NODE_ENV !== 'production' && !FAST2SMS_API_KEY) {
// //         console.log("-----------------------------------------");
// //         console.log("✅ SMS SIMULATION MODE ACTIVE (No API Key in ENV)");
// //         console.log(`To: ${phoneNumber}`);
// //         console.log(`Message: ${message}`);
// //         console.log("-----------------------------------------");
// //         return { success: true, simulated: true };
// //     }

// //     // 2. Execute LIVE SMS Call (This assumes you have Fast2SMS credits)
// //     try {
// //         const response = await axios.post(
// //             FAST2SMS_API_URL,
// //             {
// //                 // Note: Fast2SMS typically expects numbers as a comma-separated string
// //                 route: 'v3', // Transactional Route (Check if you have an approved template/route)
// //                 sender_id: 'FSTSMS', // Default Sender ID, replace with yours if necessary
// //                 message: message,
// //                 language: 'english',
// //                 flash: 0,
// //                 numbers: phoneNumber 
// //             },
// //             {
// //                 headers: {
// //                     'authorization': FAST2SMS_API_KEY,
// //                     'Content-Type': 'application/json'
// //                 }
// //             }
// //         );
        
// //         // Log the actual response from the SMS gateway
// //         const apiResponse = response.data;
        
// //         if (apiResponse.return === true) {
// //             console.log(`\n🚀 LIVE SMS SUCCESS to ${phoneNumber}: Status: ${apiResponse.message}`);
// //             return { success: true, api_status: apiResponse.message };
// //         } else {
// //             console.error(`\n❌ LIVE SMS FAILED to ${phoneNumber}: Reason: ${apiResponse.message}`);
// //             return { success: false, api_error: apiResponse.message };
// //         }
        
// //     } catch (error) {
// //         // Log Axios network errors or connection issues
// //         console.error(`\n❌ CRITICAL SMS NETWORK ERROR to ${phoneNumber}:`, error.response ? error.response.data : error.message);
// //         return { success: false, api_error: "Network or API service failure." };
// //     }
// // }















// function generatePriceSuggestions(basePrice, bidPrice) {
//     const numericBase = parseFloat(basePrice);
//     const numericBid = parseFloat(bidPrice);
//     if (isNaN(numericBase) || isNaN(numericBid) || numericBase <= numericBid) {
//       return [];
//     }
    
//     const diff = numericBase - numericBid;
//     const interval = diff / 10; 
    
//     const finalSuggestions = [];
//     for (let i = 1; i <= 10; i++) { 
//         const newPrice = numericBid + (interval * i);
//         finalSuggestions.push(newPrice.toFixed(2));
//     }
//     finalSuggestions.push(numericBase.toFixed(2)); // Index 10 is the original price

//     return finalSuggestions; // Array length will be 11 (Indices 0 to 10)
// }

// // -------------------------------------------------------------------
// // --- 2. CORE INBOUND HANDLERS ---
// // -------------------------------------------------------------------

// // Helper to process the farmer's command and update the DB
// async function processSmsBargainUpdate(fromNumber, farmerId, bargainId, action, counterIndex, io) {
    
//     // 1. Fetch Session Data
//     const [session] = await queryDatabase(`
//         SELECT 
//             bsp.current_offer AS current_bid,
//             ap.price_per_kg AS original_price
//         FROM bargain_sessions bs
//         JOIN bargain_session_products bsp ON bs.bargain_id = bsp.bargain_id
//         JOIN add_produce ap ON bsp.product_id = ap.product_id
//         WHERE bs.bargain_id = ? AND bs.farmer_id = ?
//     `, [bargainId, farmerId]);

//     if (!session) {
//         return await sendSms(fromNumber, `Error: Bargain ${bargainId} not found.`);
//     }

//     const currentBid = parseFloat(session.current_bid);
//     const originalPrice = parseFloat(session.original_price);
    
//     // 2. Determine Final Price and Content
//     let finalPrice = currentBid;
//     let messageType = action; 
//     let messageContent = '';
//     let successMessage = '';
    
//     if (action === 'counter_offer') {
//         const suggestions = generatePriceSuggestions(originalPrice, currentBid);
        
//         if (counterIndex >= 0 && counterIndex <= 10 && counterIndex < suggestions.length) {
//             finalPrice = parseFloat(suggestions[counterIndex]);
//             messageContent = `💰 Farmer counters with ₹${finalPrice}/kg (SMS command C${counterIndex})`;
//             successMessage = `Success: Counter offer of ₹${finalPrice} sent for ${bargainId}.`;
//         } else {
//             return await sendSms(fromNumber, `Error: Suggestion C${counterIndex} is out of range for this bargain.`);
//         }
//     } else if (action === 'accept') {
//         finalPrice = currentBid; 
//         messageContent = `✅ Farmer accepted the offer at ₹${finalPrice}/kg (SMS command A)`;
//         successMessage = `Success: Bargain ${bargainId} accepted! Order processing initiated.`;
//     } else if (action === 'reject') {
//         finalPrice = currentBid; 
//         messageContent = `❌ Farmer rejected the offer (SMS command R)`;
//         successMessage = `Success: Bargain ${bargainId} rejected.`;
//     }
    
//     try {
//         await queryDatabase(`START TRANSACTION`);
        
//         // 3. Insert Message
//         await queryDatabase(`
//             INSERT INTO bargain_messages (bargain_id, sender_role, sender_id, message_content, price_suggestion, message_type)
//             VALUES (?, 'farmer', ?, ?, ?, ?)
//         `, [bargainId, farmerId, messageContent, finalPrice, messageType]);
        
//         // 4. Update Current Offer in DB (Only for counter_offer)
//         if (action === 'counter_offer') {
//              await queryDatabase(`
//                  UPDATE bargain_session_products SET current_offer = ? WHERE bargain_id = ?
//              `, [finalPrice, bargainId]);
//         }

//         await queryDatabase(`COMMIT`);

//         // 5. Send Confirmation SMS back to the Farmer
//         await sendSms(fromNumber, successMessage);
        
//         // 6. EMIT SOCKET EVENT TO UPDATE CONSUMER UI (CRITICAL)
//         const room = `bargain_${bargainId}`;
        
//         // Emit final status or counter status
//         io.to(room).emit("bargainStatusUpdate", {
//             bargainId: bargainId,
//             status: action === 'counter_offer' ? 'countered' : action,
//             currentPrice: finalPrice,
//             initiatedBy: 'farmer',
//             timestamp: new Date().toISOString()
//         });

//         // Emit message content for the chat window if it was a counter
//         if (action === 'counter_offer') {
//              io.to(room).emit("bargainMessage", {
//                 bargain_id: bargainId,
//                 sender_role: 'farmer',
//                 message_content: messageContent,
//                 price_suggestion: finalPrice,
//                 message_type: 'counter_offer',
//                 created_at: new Date().toISOString()
//             });
//         }

//     } catch (error) {
//         await queryDatabase(`ROLLBACK`);
//         console.error("Bargain SMS Processing Error:", error);
//         return await sendSms(fromNumber, `System Error: Failed to process command for ${bargainId}.`);
//     }
// }


// // The Webhook Entry Point
// async function handleInboundSms(fromNumber, message, io) {
//     const trimmedMessage = message.trim().toUpperCase();
    
//     // Find the Farmer
//     const [farmer] = await queryDatabase(
//         "SELECT farmer_id FROM farmerregistration WHERE phone_number = ?",
//         [fromNumber]
//     );

//     if (!farmer) {
//         return await sendSms(fromNumber, "Error: You are not a registered farmer.");
//     }
    
//     // Parse Commands
//     const matchAccept = trimmedMessage.match(/^A\s+(\w+)$/);
//     const matchReject = trimmedMessage.match(/^R\s+(\w+)$/);
//     const matchCounter = trimmedMessage.match(/^C(\d+)\s+(\w+)$/);

//     if (matchAccept || matchReject || matchCounter) {
//         let bargainId, action, index = null;

//         if (matchAccept) {
//             bargainId = matchAccept[1];
//             action = 'accept';
//         } else if (matchReject) {
//             bargainId = matchReject[1];
//             action = 'reject';
//         } else if (matchCounter) {
//             index = parseInt(matchCounter[1]);
//             bargainId = matchCounter[2];
//             action = 'counter_offer';
//             if (isNaN(index) || index < 0 || index > 10) {
//                 return await sendSms(fromNumber, `Invalid counter index C${index}. Must be C0 to C10.`);
//             }
//         }
        
//         return await processSmsBargainUpdate(fromNumber, farmer.farmer_id, bargainId, action, index, io); 

//     } else {
//         return await sendSms(fromNumber, "Unrecognized command. Reply A [ID], R [ID], or C[0-10] [ID].");
//     }
// }


// // --- EXPORTS (MUST BE AT THE VERY END) ---
// module.exports = {
//     sendSms,
//     handleInboundSms
// };










// ./src/controllers/smsController.js (FINAL WORKING VERSION with TWILIO)

// require("dotenv").config();
// const axios = require('axios');
// const twilio = require('twilio'); // Import Twilio
// const { queryDatabase } = require('../config/db'); 

// // Twilio Setup (Accessing variables from .env)
// const TWILIO_SID = process.env.TWILIO_SID;
// const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
// const TWILIO_NUMBER = process.env.TWILIO_NUMBER; 

// // Initialize Twilio client only if credentials are set
// const twilioClient = (TWILIO_SID && TWILIO_AUTH_TOKEN) 
//     ? twilio(TWILIO_SID, TWILIO_AUTH_TOKEN) 
//     : null;


// // -------------------------------------------------------------------
// // --- 1. UTILITY FUNCTIONS (Defined for Export) ---
// // -------------------------------------------------------------------
// // ./src/controllers/smsController.js (Inside sendSms function)

// async function sendSms(phoneNumber, message) {
//     // ... (SIMULATION MODE remains at the top) ...
    
//     try {
//         const API_KEY = process.env.TWOFACTOR_API_KEY;
//         const BASE_HOST = 'https://2factor.in';
        
//         // --- 1. Define SENDER_ID and format number ---
//         // <-- Use your 6-character APPROVED Sender ID
//         const formattedNumber = phoneNumber.replace(/^\+91/, '').slice(-10); 
//     const encodedMessage = encodeURIComponent(message);
    
//     const SENDER_ID = 'KRISHI'; // <-- Replace with your 6-character APPROVED Sender ID

//     const sendUrl = `${BASE_HOST}/API/V1/${API_KEY}/ADDON_SERVICES/SEND/TSMS?From=${SENDER_ID}&number=${formattedNumber}&Msg=${encodedMessage}`;
    
//     console.log(`Sending to URL: ${sendUrl}`); // <--- ADD THIS CRITICAL LOG

//     // We use GET for simplicity, as many bulk providers use it for transactional sends.
//     const response = await axios.get(sendUrl); 

//         // 3. Check for success status
//         if (response.data && response.data.Status && response.data.Status.toUpperCase() === 'SUCCESS') {
//             console.log(`\n🚀 LIVE 2FACTOR SUCCESS to ${formattedNumber}.`);
//             return { success: true, api_status: response.data.Status };
//         } else {
//             // Log full failure details
//             console.error(`\n❌ LIVE 2FACTOR FAILED to ${formattedNumber}:`, response.data);
//             return { success: false, api_error: response.data };
//         }
        
//     } catch (error) {
//         console.error(`\n❌ CRITICAL SMS NETWORK ERROR:`, error.response ? error.response.data : error.message);
//         return { success: false, api_error: "Network failure or endpoint not found." };
//     }
// }
// // ... (rest of smsController.js)

// function generatePriceSuggestions(basePrice, bidPrice) {
//     // ... (Your price calculation logic remains unchanged here) ...
//     const numericBase = parseFloat(basePrice);
//     const numericBid = parseFloat(bidPrice);
//     if (isNaN(numericBase) || isNaN(numericBid) || numericBase <= numericBid) {
//       return [];
//     }
    
//     const diff = numericBase - numericBid;
//     const interval = diff / 10; 
    
//     const finalSuggestions = [];
//     for (let i = 1; i <= 10; i++) { 
//         const newPrice = numericBid + (interval * i);
//         finalSuggestions.push(newPrice.toFixed(2));
//     }
//     finalSuggestions.push(numericBase.toFixed(2)); 

//     return finalSuggestions;
// }


// // -------------------------------------------------------------------
// // --- 2. CORE INBOUND HANDLERS (Unchanged Logic) ---
// // -------------------------------------------------------------------

// async function processSmsBargainUpdate(fromNumber, farmerId, bargainId, action, counterIndex, io) {
    
//     // ... (Your processSmsBargainUpdate logic remains here, using sendSms and queryDatabase) ...
    
//     // 1. Fetch Session Data
//     const [session] = await queryDatabase(`
//         SELECT 
//             bsp.current_offer AS current_bid,
//             ap.price_per_kg AS original_price
//         FROM bargain_sessions bs
//         JOIN bargain_session_products bsp ON bs.bargain_id = bsp.bargain_id
//         JOIN add_produce ap ON bsp.product_id = ap.product_id
//         WHERE bs.bargain_id = ? AND bs.farmer_id = ?
//     `, [bargainId, farmerId]);

//     if (!session) {
//         return await sendSms(fromNumber, `Error: Bargain ${bargainId} not found.`);
//     }

//     const currentBid = parseFloat(session.current_bid);
//     const originalPrice = parseFloat(session.original_price);
    
//     // 2. Determine Final Price and Content
//     let finalPrice = currentBid;
//     let messageType = action; 
//     let messageContent = '';
//     let successMessage = '';
    
//     if (action === 'counter_offer') {
//         const suggestions = generatePriceSuggestions(originalPrice, currentBid);
        
//         if (counterIndex >= 0 && counterIndex <= 10 && counterIndex < suggestions.length) {
//             finalPrice = parseFloat(suggestions[counterIndex]);
//             messageContent = `💰 Farmer counters with ₹${finalPrice}/kg (SMS command C${counterIndex})`;
//             successMessage = `Success: Counter offer of ₹${finalPrice} sent for ${bargainId}.`;
//         } else {
//             return await sendSms(fromNumber, `Error: Suggestion C${counterIndex} is out of range for this bargain.`);
//         }
//     } else if (action === 'accept') {
//         finalPrice = currentBid; 
//         messageContent = `✅ Farmer accepted the offer at ₹${finalPrice}/kg (SMS command A)`;
//         successMessage = `Success: Bargain ${bargainId} accepted! Order processing initiated.`;
//     } else if (action === 'reject') {
//         finalPrice = currentBid; 
//         messageContent = `❌ Farmer rejected the offer (SMS command R)`;
//         successMessage = `Success: Bargain ${bargainId} rejected.`;
//     }
    
//     try {
//         await queryDatabase(`START TRANSACTION`);
        
//         // 3. Insert Message
//         await queryDatabase(`
//             INSERT INTO bargain_messages (bargain_id, sender_role, sender_id, message_content, price_suggestion, message_type)
//             VALUES (?, 'farmer', ?, ?, ?, ?)
//         `, [bargainId, farmerId, messageContent, finalPrice, messageType]);
        
//         // 4. Update Current Offer in DB (Only for counter_offer)
//         if (action === 'counter_offer') {
//              await queryDatabase(`
//                  UPDATE bargain_session_products SET current_offer = ? WHERE bargain_id = ?
//              `, [finalPrice, bargainId]);
//         }

//         await queryDatabase(`COMMIT`);

//         // 5. Send Confirmation SMS back to the Farmer
//         await sendSms(fromNumber, successMessage);
        
//         // 6. EMIT SOCKET EVENT TO UPDATE CONSUMER UI (CRITICAL)
//         const room = `bargain_${bargainId}`;
        
//         // Emit final status or counter status
//         io.to(room).emit("bargainStatusUpdate", {
//             bargainId: bargainId,
//             status: action === 'counter_offer' ? 'countered' : action,
//             currentPrice: finalPrice,
//             initiatedBy: 'farmer',
//             timestamp: new Date().toISOString()
//         });

//         // Emit message content for the chat window if it was a counter
//         if (action === 'counter_offer') {
//              io.to(room).emit("bargainMessage", {
//                 bargain_id: bargainId,
//                 sender_role: 'farmer',
//                 message_content: messageContent,
//                 price_suggestion: finalPrice,
//                 message_type: 'counter_offer',
//                 created_at: new Date().toISOString()
//             });
//         }

//     } catch (error) {
//         await queryDatabase(`ROLLBACK`);
//         console.error("Bargain SMS Processing Error:", error);
//         return await sendSms(fromNumber, `System Error: Failed to process command for ${bargainId}.`);
//     }
// }

// async function handleInboundSms(fromNumber, message, io) {
//     // ... (Your handleInboundSms logic remains here, using the updated processSmsBargainUpdate) ...
//     const trimmedMessage = message.trim().toUpperCase();
    
//     // Find the Farmer
//     const [farmer] = await queryDatabase(
//         "SELECT farmer_id FROM farmerregistration WHERE phone_number = ?",
//         [fromNumber]
//     );

//     if (!farmer) {
//         return await sendSms(fromNumber, "Error: You are not a registered farmer.");
//     }
    
//     // Parse Commands
//     const matchAccept = trimmedMessage.match(/^A\s+(\w+)$/);
//     const matchReject = trimmedMessage.match(/^R\s+(\w+)$/);
//     const matchCounter = trimmedMessage.match(/^C(\d+)\s+(\w+)$/);

//     if (matchAccept || matchReject || matchCounter) {
//         let bargainId, action, index = null;

//         if (matchAccept) {
//             bargainId = matchAccept[1];
//             action = 'accept';
//         } else if (matchReject) {
//             bargainId = matchReject[1];
//             action = 'reject';
//         } else if (matchCounter) {
//             index = parseInt(matchCounter[1]);
//             bargainId = matchCounter[2];
//             action = 'counter_offer';
//             if (isNaN(index) || index < 0 || index > 10) {
//                 return await sendSms(fromNumber, `Invalid counter index C${index}. Must be C0 to C10.`);
//             }
//         }
        
//         return await processSmsBargainUpdate(fromNumber, farmer.farmer_id, bargainId, action, index, io); 

//     } else {
//         return await sendSms(fromNumber, "Unrecognized command. Reply A [ID], R [ID], or C[0-10] [ID].");
//     }
// }


// // --- EXPORTS (MUST BE AT THE VERY END) ---
// module.exports = {
//     sendSms,
//     handleInboundSms
// };






































































































// // ./src/controllers/smsController.js (FINAL WORKING VERSION)

// require("dotenv").config();
// const axios = require('axios');
// const { queryDatabase } = require('../config/db'); 

// // --- 1. UTILITY FUNCTIONS ---

// // Function to handle OUTBOUND SMS (Switched to 2Factor/General API structure)
// async function sendSms(phoneNumber, message) {
//     // We use a general transactional API structure here
//     const API_KEY = process.env.TWOFACTOR_API_KEY;
//     const BASE_HOST = 'https://2factor.in';
    
//     // ⚠️ Check for API Key and run in simulation if missing/in development
//     if (!API_KEY || process.env.NODE_ENV !== 'production') {
//         console.log("-----------------------------------------");
//         console.log("✅ SMS SIMULATION MODE ACTIVE (Development Only)");
//         console.log(`To: ${phoneNumber}`);
//         console.log(`Message: ${message}`);
//         console.log("-----------------------------------------");
//         return { success: true, simulated: true };
//     }

//     // 2. Execute LIVE 2FACTOR Call
//     try {
//         const SENDER_ID = 'KRISHI'; // Use your 6-character APPROVED Sender ID
//         const formattedNumber = phoneNumber.replace(/^\+91/, '').slice(-10); // Ensures 10-digit format
//         const encodedMessage = encodeURIComponent(message);
        
//         // CRITICAL: Using the reliable TSMS send endpoint (Assuming GET method for testing)
//         const sendUrl = `${BASE_HOST}/API/V1/${API_KEY}/ADDON_SERVICES/SEND/TSMS?From=${SENDER_ID}&To=${formattedNumber}&Msg=${encodedMessage}`;
        
//         const response = await axios.get(sendUrl); 

//         if (response.data && response.data.Status && response.data.Status.toUpperCase() === 'SUCCESS') {
//             console.log(`\n🚀 LIVE 2FACTOR SUCCESS to ${formattedNumber}.`);
//             return { success: true, api_status: response.data.Status };
//         } else {
//             console.error(`\n❌ LIVE 2FACTOR FAILED to ${formattedNumber}:`, response.data);
//             return { success: false, api_error: response.data };
//         }
        
//     } catch (error) {
//         console.error(`\n❌ CRITICAL SMS NETWORK ERROR:`, error.response ? error.response.data : error.message);
//         return { success: false, api_error: "Network failure or incorrect endpoint." };
//     }
// }

// // Function to generate the counter prices (used by the inbound processor)
// function generatePriceSuggestions(basePrice, bidPrice) {
//     const numericBase = parseFloat(basePrice);
//     const numericBid = parseFloat(bidPrice);
//     if (isNaN(numericBase) || isNaN(numericBid) || numericBase <= numericBid) {
//       return [];
//     }
    
//     const diff = numericBase - numericBid;
//     const interval = diff / 10; 
    
//     const finalSuggestions = [];
//     for (let i = 1; i <= 10; i++) { 
//         const newPrice = numericBid + (interval * i);
//         finalSuggestions.push(newPrice.toFixed(2));
//     }
//     finalSuggestions.push(numericBase.toFixed(2)); 

//     return finalSuggestions;
// }


// // --- 2. CORE INBOUND HANDLERS ---

// // Helper to process the farmer's command and update the DB/Emit Socket
// async function processSmsBargainUpdate(fromNumber, farmerId, bargainId, action, counterIndex, io) {
    
//     // 1. Fetch Session Data
//     const [session] = await queryDatabase(`
//         SELECT 
//             bsp.current_offer AS current_bid,
//             ap.price_per_kg AS original_price
//         FROM bargain_sessions bs
//         JOIN bargain_session_products bsp ON bs.bargain_id = bsp.bargain_id
//         JOIN add_produce ap ON bsp.product_id = ap.product_id
//         WHERE bs.bargain_id = ? AND bs.farmer_id = ?
//     `, [bargainId, farmerId]);

//     if (!session) {
//         return await sendSms(fromNumber, `Error: Bargain ${bargainId} not found.`);
//     }

//     const currentBid = parseFloat(session.current_bid);
//     const originalPrice = parseFloat(session.original_price);
    
//     // 2. Determine Final Price and Content
//     let finalPrice = currentBid;
//     let messageType = action; 
//     let messageContent = '';
//     let successMessage = '';
    
//     if (action === 'counter_offer') {
//         const suggestions = generatePriceSuggestions(originalPrice, currentBid);
        
//         if (counterIndex >= 0 && counterIndex <= 10 && counterIndex < suggestions.length) {
//             finalPrice = parseFloat(suggestions[counterIndex]);
//             messageContent = `💰 Farmer counters with ₹${finalPrice}/kg (SMS command C${counterIndex})`;
//             successMessage = `Success: Counter offer of ₹${finalPrice} sent for ${bargainId}.`;
//         } else {
//             return await sendSms(fromNumber, `Error: Suggestion C${counterIndex} is out of range for this bargain.`);
//         }
//     } else if (action === 'accept') {
//         finalPrice = currentBid; 
//         messageContent = `✅ Farmer accepted the offer at ₹${finalPrice}/kg (SMS command A)`;
//         successMessage = `Success: Bargain ${bargainId} accepted! Order processing initiated.`;
//     } else if (action === 'reject') {
//         finalPrice = currentBid; 
//         messageContent = `❌ Farmer rejected the offer (SMS command R)`;
//         successMessage = `Success: Bargain ${bargainId} rejected.`;
//     }
    
//     try {
//         await queryDatabase(`START TRANSACTION`);
        
//         // 3. Insert Message
//         await queryDatabase(`
//             INSERT INTO bargain_messages (bargain_id, sender_role, sender_id, message_content, price_suggestion, message_type)
//             VALUES (?, 'farmer', ?, ?, ?, ?)
//         `, [bargainId, farmerId, messageContent, finalPrice, messageType]);
        
//         // 4. Update Current Offer in DB (Only for counter_offer)
//         if (action === 'counter_offer') {
//              await queryDatabase(`
//                  UPDATE bargain_session_products SET current_offer = ? WHERE bargain_id = ?
//              `, [finalPrice, bargainId]);
//         }

//         await queryDatabase(`COMMIT`);

//         // 5. EMIT SOCKET EVENT TO UPDATE CONSUMER UI (CRITICAL)
//         const room = `bargain_${bargainId}`;
        
//         // Emit final status or counter status
//         io.to(room).emit("bargainStatusUpdate", {
//             bargainId: bargainId,
//             status: action === 'counter_offer' ? 'countered' : action,
//             currentPrice: finalPrice,
//             initiatedBy: 'farmer',
//             timestamp: new Date().toISOString()
//         });

//         // Emit message content for the chat window if it was a counter
//         if (action === 'counter_offer') {
//              io.to(room).emit("bargainMessage", {
//                 bargain_id: bargainId,
//                 sender_role: 'farmer',
//                 message_content: messageContent,
//                 price_suggestion: finalPrice,
//                 message_type: 'counter_offer',
//                 created_at: new Date().toISOString()
//             });
//         }
        
//         // 6. Send Confirmation SMS back to the Farmer (After all UI sync is done)
//         await sendSms(fromNumber, successMessage);
        
//     } catch (error) {
//         await queryDatabase(`ROLLBACK`);
//         console.error("Bargain SMS Processing Error:", error);
//         // Attempt simulation-safe notification if main SMS failed
//         await sendSms(fromNumber, `System Error: Command received, but confirmation failed. Check console.`);
//     }
// }


// // The Webhook Entry Point
// async function handleInboundSms(fromNumber, message, io) {
//     // Ensure all parsing handles the variety of formats (Twilio/Serveo vs Direct Provider)
//     const normalizedFromNumber = fromNumber.replace(/[^0-9+]/g, ''); // Clean up the number
    
//     const trimmedMessage = message.trim().toUpperCase();
    
//     // Find the Farmer
//     const [farmer] = await queryDatabase(
//         "SELECT farmer_id FROM farmerregistration WHERE phone_number = ? OR phone_number = ?",
//         [normalizedFromNumber, normalizedFromNumber.replace(/^\+91/, '')] // Check against +91 and local format
//     );

//     if (!farmer) {
//         return await sendSms(fromNumber, "Error: You are not a registered farmer.");
//     }
    
//     // Parse Commands
//     const matchAccept = trimmedMessage.match(/^A\s+(\w+)$/);
//     const matchReject = trimmedMessage.match(/^R\s+(\w+)$/);
//     const matchCounter = trimmedMessage.match(/^C(\d+)\s+(\w+)$/);

//     if (matchAccept || matchReject || matchCounter) {
//         let bargainId, action, index = null;

//         if (matchAccept) {
//             bargainId = matchAccept[1];
//             action = 'accept';
//         } else if (matchReject) {
//             bargainId = matchReject[1];
//             action = 'reject';
//         } else if (matchCounter) {
//             index = parseInt(matchCounter[1]);
//             bargainId = matchCounter[2];
//             action = 'counter_offer';
//             if (isNaN(index) || index < 0 || index > 10) {
//                 return await sendSms(fromNumber, `Invalid counter index C${index}. Must be C0 to C10.`);
//             }
//         }
        
//         return await processSmsBargainUpdate(fromNumber, farmer.farmer_id, bargainId, action, index, io); 

//     } else {
//         return await sendSms(fromNumber, "Unrecognized command. Reply A [ID], R [ID], or C[0-10] [ID].");
//     }
// }


// // --- EXPORTS (MUST BE AT THE VERY END) ---
// module.exports = {
//     sendSms,
//     handleInboundSms,
//     generatePriceSuggestions // Export for use in server.js outbound logic if needed
// };






















































































// src/controllers/smsController.js

require("dotenv").config();
const axios = require('axios');
const { queryDatabase } = require('../config/db'); 

// --- 1. UTILITY FUNCTIONS ---

/**
 * Handles OUTBOUND SMS. In production, this uses a real API.
 * In development/simulator mode, it prints to console AND emits a Socket.IO event
 * to the simulator's dedicated channel, so the user sees the 'SMS' instantly.
 * * @param {string} phoneNumber - The farmer's number (the simulator's number)
 * @param {string} message - The message content.
 * @param {object} io - The Socket.IO server instance. <--- CRITICAL: io instance is required
 */
async function sendSms(phoneNumber, message, io) {
    const API_KEY = process.env.TWOFACTOR_API_KEY;
    
    // Clean number for both console and real API usage
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '').slice(-10); 
    
    // ⚠️ SIMULATION MODE (CRITICAL FIX APPLIED HERE)
    if (!API_KEY || process.env.NODE_ENV !== 'production') {
        console.log("-----------------------------------------");
        console.log("✅ SMS SIMULATION: Sending Confirmation/Notification");
        console.log(`To: ${cleanNumber}`);
        console.log(`Message: ${message}`);
        console.log("-----------------------------------------");
        
        // 💥 Emit to the simulator's client via Socket.IO
        if (io) {
            // Note: Emitting to all clients listening to this event.
            io.emit('sms_confirmation_inbound', { 
                to_number: cleanNumber, // Send the number so the simulator can filter
                message: message,
                timestamp: new Date().toISOString()
            });
        }

        return { success: true, simulated: true };
    }

    // 2. Execute LIVE 2FACTOR Call (Logic simplified for context)
    // ... (Your actual live SMS sending logic using a service like 2Factor/Fast2SMS)
    return { success: false, api_error: "Live SMS API not fully implemented/configured." };
}

// ... (Rest of utility functions: generatePriceSuggestions) ...
function generatePriceSuggestions(originalPrice, bidPrice) {
    const numericOriginal = parseFloat(originalPrice);
    const numericBid = parseFloat(bidPrice);
    
    if (isNaN(numericOriginal) || isNaN(numericBid) || numericOriginal <= numericBid) {
        return [];
    }
    
    const diff = numericOriginal - numericBid;
    const interval = diff / 10; 
    
    const finalSuggestions = [];
    for (let i = 0; i <= 10; i++) {
        const newPrice = numericBid + (interval * i);
        finalSuggestions.push(newPrice.toFixed(2));
    }

    return finalSuggestions;
}


// --- 2. CORE INBOUND HANDLERS ---

/**
 * Processes the farmer's SMS command, updates DB/UI, and sends confirmation SMS.
 * @param {string} fromNumber - Farmer's phone number.
 * @param {string} farmerId - Farmer's ID (KRST01FRxxx).
 * @param {string} bargainId - The ID of the bargain session.
 * @param {string} action - 'accept', 'reject', or 'counter_offer'.
 * @param {number|null} counterIndex - Index (0-10) for counter_offer.
 * @param {object} io - The Socket.IO server instance.
 */
async function processSmsBargainUpdate(fromNumber, farmerId, bargainId, action, counterIndex, io) {
    
    // 1. Fetch Session Data
    const [session] = await queryDatabase(`
        SELECT 
            bsp.current_offer AS current_bid,
            ap.price_per_kg AS original_price,
            bs.consumer_id
        FROM bargain_sessions bs
        JOIN bargain_session_products bsp ON bs.bargain_id = bsp.bargain_id
        JOIN add_produce ap ON bsp.product_id = ap.product_id
        WHERE bs.bargain_id = ? AND bs.farmer_id = ?
    `, [bargainId, farmerId]);

    if (!session) {
        return await sendSms(fromNumber, `Error: Bargain ${bargainId} not found or you are not the assigned farmer.`, io);
    }

    const currentBid = parseFloat(session.current_bid);
    const originalPrice = parseFloat(session.original_price);
    const consumerId = session.consumer_id;
    
    // 2. Determine Final Price and Content
    let finalPrice = currentBid;
    let messageType = action; 
    let messageContent = '';
    let successMessage = '';
    
    if (action === 'counter_offer') {
        const suggestions = generatePriceSuggestions(originalPrice, currentBid);
        
        if (counterIndex >= 0 && counterIndex < suggestions.length) {
            finalPrice = parseFloat(suggestions[counterIndex]);
            messageContent = `💰 Farmer counters with ₹${finalPrice}/kg (SMS command C${counterIndex})`;
            successMessage = `Success: Counter offer of ₹${finalPrice} sent for ${bargainId}.`;
        } else {
            return await sendSms(fromNumber, `Error: Suggestion C${counterIndex} is out of range for this bargain. C0=${currentBid} to C10=${originalPrice}.`, io);
        }
    } else if (action === 'accept') {
        finalPrice = currentBid; 
        messageContent = `✅ Farmer accepted the consumer's offer at ₹${finalPrice}/kg (SMS command A)`;
        successMessage = `Success: Bargain ${bargainId} accepted! Order processing initiated.`;
    } else if (action === 'reject') {
        finalPrice = currentBid; 
        messageContent = `❌ Farmer rejected the offer (SMS command R)`;
        successMessage = `Success: Bargain ${bargainId} rejected.`;
    }
    
    try {
        await queryDatabase(`START TRANSACTION`);
        
                // 3. Insert Message
        await queryDatabase(`
            INSERT INTO bargain_messages (bargain_id, sender_role, sender_id, message_content, price_suggestion, message_type)
            VALUES (?, 'farmer', ?, ?, ?, ?)
        `, [bargainId, farmerId, messageContent, finalPrice, messageType]);
        
        // 4. Update Current Offer in DB (Only for counter_offer)
        if (action === 'counter_offer') {
             await queryDatabase(`
                 UPDATE bargain_session_products SET current_offer = ? WHERE bargain_id = ?
             `, [finalPrice, bargainId]);
        }

        await queryDatabase(`COMMIT`);

        // 5. EMIT SOCKET EVENT TO UPDATE CONSUMER UI (CRITICAL)
        const room = `bargain_${bargainId}`;
        
        // Emit final status or counter status
        io.to(room).emit("bargainStatusUpdate", {
            bargainId: bargainId,
            status: action === 'counter_offer' ? 'countered' : action,
            currentPrice: finalPrice,
            initiatedBy: 'farmer',
            timestamp: new Date().toISOString()
        });

        // Emit message content for the chat window if it was a counter
        if (action === 'counter_offer') {
             io.to(room).emit("bargainMessage", {
                bargain_id: bargainId,
                sender_role: 'farmer',
                message_content: messageContent,
                price_suggestion: finalPrice,
                message_type: 'counter_offer',
                created_at: new Date().toISOString()
            });
        }
        
        // 6. Send Confirmation SMS back to the Farmer (After all UI sync is done)
        await sendSms(fromNumber, successMessage);
        
    } catch (error) {
        await queryDatabase(`ROLLBACK`);
        console.error("Bargain SMS Processing Error:", error);
        // Attempt simulation-safe notification if main SMS failed
        await sendSms(fromNumber, `System Error: Command received, but confirmation failed. Check console.`);
    }
}

/**
 * The main entry point for the SMS webhook.
 */
async function handleInboundSms(fromNumber, message, io) {
    // Clean up the number to a standard 10-digit format for lookup
    const cleanNumber = fromNumber.replace(/[^0-9]/g, '').slice(-10); 
    
    const trimmedMessage = message.trim().toUpperCase();
    
    // 1. Find the Farmer by Phone Number
    const [farmer] = await queryDatabase(
        "SELECT farmer_id FROM farmerregistration WHERE phone_number = ? OR phone_number = ?",
        [cleanNumber, `+91${cleanNumber}`] 
    );

    if (!farmer) {
        return await sendSms(fromNumber, "Error: Your number is not registered with KrishiSetu.", io);
    }
    
    // 2. Parse Bargain Commands
    const matchAccept = trimmedMessage.match(/^A\s+(\w+)$/);
    const matchReject = trimmedMessage.match(/^R\s+(\w+)$/);
    const matchCounter = trimmedMessage.match(/^C(\d+)\s+(\w+)$/);

    if (matchAccept || matchReject || matchCounter) {
        let bargainId, action, index = null;

        if (matchAccept) {
            bargainId = matchAccept[1];
            action = 'accept';
        } else if (matchReject) {
            bargainId = matchReject[1];
            action = 'reject';
        } else if (matchCounter) {
            index = parseInt(matchCounter[1]);
            bargainId = matchCounter[2];
            action = 'counter_offer';
        }
        
        // 3. Process the action
        return await processSmsBargainUpdate(fromNumber, farmer.farmer_id, bargainId, action, index, io); 

    } else {
        // Unrecognized Command
        return await sendSms(fromNumber, "Unrecognized command. Reply A [ID], R [ID], or C[0-10] [ID].", io);
    }
}


// --- EXPORTS ---
module.exports = {
    sendSms,
    handleInboundSms,
};