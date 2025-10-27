// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane, faMobileAlt, faCheckCircle, faExclamationTriangle, faBars, faBatteryFull, faWifi } from '@fortawesome/free-solid-svg-icons';

// // NOTE: This component assumes Tailwind CSS is available for styling.

// const SMS_WEBHOOK_URL = `${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}/api/sms/inbound`;

// const SmsSimulator = () => {
//     // Fixed Farmer details for webhook testing
//     const FARMER_PHONE = '6361334856'; 
//     const LATEST_BARGAIN_ID = '128'; // Placeholder for manual entry
    
//     const messagesEndRef = useRef(null);
//     const [messages, setMessages] = useState([]);
//     const [inputCommand, setInputCommand] = useState('');
//     const [isSending, setIsSending] = useState(false);
//     const [statusMessage, setStatusMessage] = useState({ type: 'info', text: 'Ready to send command.' });

//     // Simulate initial offer arrival (Optional: based on real-time event)
//     useEffect(() => {
//         // Simulating the arrival of the first message that the consumer sent
//         const initialOffer = { 
//             text: `BARGAIN OFFER #${LATEST_BARGAIN_ID} for Apples (10.00kg). Consumer bids ₹92.73. Reply: A ${LATEST_BARGAIN_ID} (Accept), R ${LATEST_BARGAIN_ID} (Reject), C[0-10] ${LATEST_BARGAIN_ID} (Counter).`, 
//             sender: 'system', 
//             time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) 
//         };
//         setMessages([initialOffer]);
//     }, []);

//     // Auto-scroll to bottom
//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);


//     // Function to handle the farmer's OUTBOUND reply (sending the command)
//     const handleSendSms = async (e) => {
//         e.preventDefault();
//         const command = inputCommand.trim();
//         if (!command) return;

//         setIsSending(true);
        
//         // 1. Log the farmer's action instantly (as a Sent message)
//         addMessageToLog(command, 'farmer');
        
//         try {
//             // 2. Send request to the backend webhook
//             const data = {
//                 from: FARMER_PHONE,
//                 message: command
//             };

//             await axios.post(SMS_WEBHOOK_URL, data, {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 }
//             });

//             // 3. Status success (Backend will now execute the logic and send the System reply)
//             setStatusMessage({ type: 'success', text: '✅ Command processed by backend (200 OK).' });
            
//             // 4. Wait for the simulated System Reply to arrive (which is handled by simulateSystemReply)
            
//         } catch (error) {
//             setStatusMessage({ type: 'error', text: `🛑 Network Error: Check if Node.js server is running and accessible.` });
//             console.error("SMS Simulator Fetch Error:", error);
//             // Re-log the system failure reply to the farmer
//             addMessageToLog('❌ Failed to connect to server. Command not sent.', 'system');
//         } finally {
//             setInputCommand('');
//             setIsSending(false);
//         }
//     };

//     // Function to simulate receiving the SYSTEM's reply (The server's confirmation SMS)
//     // NOTE: This logic should ideally be triggered by a SOCKET.IO listener on a separate channel, 
//     // but we simulate it here based on the command, since we cannot read the console log.
//     const simulateSystemReply = (command) => {
//         const parts = command.split(' ');
//         const id = parts[1];
//         let replyText;
        
//         if (command.startsWith('A')) {
//             replyText = `Success: Bargain ${id} accepted! Order processing initiated. (DB updated & Consumer notified)`;
//         } else if (command.startsWith('R')) {
//             replyText = `Success: Bargain ${id} rejected. Negotiation ended.`;
//         } else if (command.startsWith('C')) {
//             const index = parseInt(parts[0].slice(1));
//             const mockPrice = (90 + index * 0.95).toFixed(2); // Slightly more realistic mock counter
//             replyText = `Success: Counter offer of ₹${mockPrice} sent for ${id}. (Consumer UI updated)`;
//         } else {
//             replyText = '❓ KrishiSetu: Command received. Unrecognized format.';
//         }
        
//         // Use a timeout to simulate network delay for receiving the confirmation SMS
//         setTimeout(() => {
//             addMessageToLog(replyText, 'system');
//         }, 1000); 
//     };

//     // Helper to log messages with current time
//     const addMessageToLog = (text, sender = 'system') => {
//         const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
//         setMessages(prev => [...prev, { text, sender, time }]);
//     };

//     return (
//         <div className="flex justify-center p-8 bg-gray-50 min-h-screen">
//             {/* MOBILE PHONE CHASSIS */}
//             <div className="w-full max-w-xs md:max-w-md bg-gray-900 rounded-[40px] shadow-2xl p-2 relative">
                
//                 {/* Screen Container */}
//                 <div className="bg-white rounded-[32px] overflow-hidden flex flex-col h-[600px] border-8 border-gray-800">
                    
//                     {/* Status Bar */}
//                     <div className="bg-white text-black text-xs font-semibold p-2 flex justify-between items-center border-b border-gray-200">
//                         <span>23:45</span>
//                         <div className="text-gray-600">
//                             <FontAwesomeIcon icon={faWifi} className="mx-1" />
//                             <span className="mr-1">LTE</span>
//                             <FontAwesomeIcon icon={faBatteryFull} className="ml-1" />
//                         </div>
//                     </div>

//                     {/* App Header */}
//                     <div className="bg-green-700 text-white p-3 flex items-center justify-between shadow-md">
//                         <div className="text-sm">
//                             <p className="font-bold">Messages</p>
//                             <p className="text-xs">{FARMER_PHONE}</p>
//                         </div>
//                         <FontAwesomeIcon icon={faBars} className="text-lg" />
//                     </div>
                    
//                     {/* Message Display Area */}
//                     <div className="flex-grow p-3 space-y-3 overflow-y-auto bg-gray-100" id="messageScroll">
//                         {messages.map((msg, index) => (
//                             <div key={index} className={`flex ${msg.sender === 'farmer' ? 'justify-end' : 'justify-start'}`}>
//                                 <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
//                                     msg.sender === 'farmer' 
//                                         ? 'bg-blue-600 text-white rounded-br-sm' 
//                                         : 'bg-gray-200 text-gray-800 rounded-tl-sm'
//                                 }`}>
//                                     <p className={`${msg.sender === 'system' ? 'font-medium text-red-700' : ''}`}>{msg.text}</p>
//                                     <span className="block mt-1 text-xs text-right opacity-80">
//                                         {msg.time}
//                                     </span>
//                                 </div>
//                             </div>
//                         ))}
//                         <div ref={messagesEndRef} />
//                     </div>

//                     {/* Input Area */}
//                     <form onSubmit={handleSendSms} className="p-3 bg-white border-t flex gap-2">
//                         <input
//                             type="text"
//                             value={inputCommand}
//                             onChange={(e) => setInputCommand(e.target.value)}
//                             placeholder={`Reply: A ${LATEST_BARGAIN_ID} or C5 ${LATEST_BARGAIN_ID}`}
//                             className="flex-grow p-3 border border-gray-300 rounded-full text-sm focus:ring-green-500 focus:border-green-500"
//                             disabled={isSending}
//                         />
//                         <button 
//                             type="submit" 
//                             className={`w-10 h-10 rounded-full flex items-center justify-center ${isSending ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
//                             disabled={isSending}
//                         >
//                             <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
//                         </button>
//                     </form>
//                 </div>
//             </div>
            
//             {/* DEBUG PANEL */}
//             <div className="w-full max-w-xs p-4 border rounded-lg bg-white shadow-md">
//                 <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-2">Debug Console</h3>
//                 <div className={`p-2 rounded text-sm ${statusMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
//                     {statusMessage.text}
//                 </div>
//                 <p className="mt-4 text-xs text-gray-500">
//                     *The consumer chat (on the main screen) updates instantly via WebSocket when the backend processes the command.
//                 </p>
//                 <p className="mt-2 text-xs text-gray-500">
//                     *Farmer's phone number is hardcoded to **{FARMER_PHONE}** for webhook matching.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default SmsSimulator;

































import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// We must use the base URL for the io connection!
import { io } from 'socket.io-client'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMobileAlt, faBars, faBatteryFull, faWifi, faCommentDots } from '@fortawesome/free-solid-svg-icons';

// --- In SmsSimulator.js (Replacing the const socket = io(...) block) ---

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const SMS_WEBHOOK_URL = `${API_BASE_URL}/api/sms/inbound`;
const FARMER_ID = 'KRST01FR005'; 
const FARMER_PHONE = '6361334856'; 

// Establish socket connection with the bypass query parameters.
// This triggers the 'farmer-sms-tool' bypass logic on the server.
const socket = io(API_BASE_URL, {
    // ❌ REMOVE 'auth' BLOCK - token is no longer needed!
    query: {
        farmer_id: FARMER_ID,
        userType: 'farmer-sms-tool' // <-- This key triggers the server bypass!
    },
    transports: ['websocket', 'polling']
});

const SmsSimulator = () => {
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [inputCommand, setInputCommand] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: 'info', text: 'Ready. Use A [ID], R [ID], or C[0-10] [ID].' });

    // --- SOCKET.IO LISTENER (The Final Check) ---
    useEffect(() => {
        
        // 🚨 Log connection status for debugging
        socket.on('connect', () => {
            console.log("Socket Connected! Ready to receive SMS.");
            setStatusMessage(prev => ({ ...prev, type: 'success', text: `Socket Connected! Ready on ${API_BASE_URL}.` }));
        });
        
        socket.on('disconnect', () => {
             console.error("Socket Disconnected!");
             setStatusMessage(prev => ({ ...prev, type: 'error', text: 'Socket Disconnected! Check Node.js Server.' }));
        });

        // The listener for the simulated SMS message
        socket.on('sms_confirmation_inbound', (data) => {
            console.log("SMS_INBOUND Event Received:", data);
            
            // Robust check: Clean both numbers to ensure a match
            const cleanTarget = (data.to_number || '').replace(/[^0-9]/g, '').slice(-10);
            const simulatorNumber = FARMER_PHONE.slice(-10); 
            
            // If the message is intended for *this* simulator's phone number
            if (cleanTarget === simulatorNumber) {
                addMessageToLog(data.message, 'system');
                setStatusMessage({ type: 'success', text: '✅ Server SMS Confirmation Received via Socket.IO.' });
            } else {
                 console.warn(`Received SMS event but phone numbers did not match: Target: ${cleanTarget}, Simulator: ${simulatorNumber}`);
            }
        });

        // Clear the initial sample message to rely only on the server
        setMessages([]); 

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('sms_confirmation_inbound');
        };
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Helper to log messages with current time
    const addMessageToLog = (text, sender = 'system') => {
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        setMessages(prev => [...prev, { text, sender, time }]);
    };

    // Function to handle the farmer's OUTBOUND reply
    const handleSendSms = async (e) => {
        e.preventDefault();
        const command = inputCommand.trim();
        if (!command) return;

        setIsSending(true);
        setStatusMessage({ type: 'info', text: 'Sending command to webhook...' });
        
        // 1. Log the farmer's action instantly 
        addMessageToLog(command, 'farmer');
        
        try {
            // 2. Send request to the backend webhook
            const data = {
                from: FARMER_PHONE,
                message: command
            };

            await axios.post(SMS_WEBHOOK_URL, data, {
                headers: { 'Content-Type': 'application/json' }
            });

            // 3. Status success (The server will now respond via the 'sms_confirmation_inbound' socket event)
            setStatusMessage({ type: 'success', text: '✅ Command sent to server. Waiting for confirmation SMS...' });
            
        } catch (error) {
            setStatusMessage({ type: 'error', text: `🛑 Network Error: Server unreachable or internal error.` });
            addMessageToLog('❌ Failed to send command to server.', 'system');
            console.error("SMS Simulator Fetch Error:", error);
        } finally {
            setInputCommand('');
            setIsSending(false);
        }
    };

    // Style utility for the status bar
    const getStatusColor = (type) => {
        switch (type) {
            case 'error': return 'bg-red-100 text-red-700';
            case 'success': return 'bg-green-100 text-green-700';
            default: return 'bg-blue-100 text-blue-700';
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-start p-8 bg-gray-50 min-h-screen space-y-8 md:space-y-0 md:space-x-8">
            {/* MOBILE PHONE CHASSIS */}
            <div className="w-full max-w-xs md:max-w-md bg-gray-900 rounded-[40px] shadow-2xl p-2 relative">
                
                {/* Screen Container */}
                <div className="bg-white rounded-[32px] overflow-hidden flex flex-col h-[600px] border-8 border-gray-800">
                    
                    {/* Status Bar */}
                    <div className="bg-white text-black text-xs font-semibold p-2 flex justify-between items-center border-b border-gray-200">
                        <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                        <div className="text-gray-600">
                            <FontAwesomeIcon icon={faWifi} className="mx-1" />
                            <span className="mr-1">LTE</span>
                            <FontAwesomeIcon icon={faBatteryFull} className="ml-1" />
                        </div>
                    </div>

                    {/* App Header */}
                    <div className="bg-green-700 text-white p-3 flex items-center justify-between shadow-md">
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faCommentDots} className="text-xl" />
                            <div className="text-sm">
                                <p className="font-bold">KrishiSetu SMS</p>
                                <p className="text-xs">Farmer: +91 {FARMER_PHONE}</p>
                            </div>
                        </div>
                        <FontAwesomeIcon icon={faBars} className="text-lg" />
                    </div>
                    
                    {/* Message Display Area */}
                    <div className="flex-grow p-3 space-y-3 overflow-y-auto bg-gray-100" id="messageScroll">
                        {messages.length === 0 && (
                             <div className="text-center text-gray-500 mt-20">
                                <FontAwesomeIcon icon={faMobileAlt} className="text-4xl mb-2" />
                                <p className="text-sm">Waiting for a bargain offer...</p>
                             </div>
                        )}
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'farmer' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-md leading-relaxed ${
                                    msg.sender === 'farmer' 
                                        ? 'bg-green-100 text-gray-800 rounded-br-sm' 
                                        : 'bg-white text-gray-800 rounded-tl-sm'
                                }`}>
                                    <p className={`${msg.sender === 'system' ? 'font-medium text-green-700' : ''}`}>{msg.text}</p>
                                    <span className="block mt-1 text-xs text-right text-gray-500">
                                        {msg.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendSms} className="p-3 bg-white border-t flex gap-2">
                        <input
                            type="text"
                            value={inputCommand}
                            onChange={(e) => setInputCommand(e.target.value)}
                            placeholder={`Enter Command (e.g., A 137)`}
                            className="flex-grow p-3 border border-gray-300 rounded-full text-sm focus:ring-green-500 focus:border-green-500"
                            disabled={isSending}
                        />
                        <button 
                            type="submit" 
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${isSending ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white`}
                            disabled={isSending || inputCommand.trim() === ''}
                        >
                            <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
                        </button>
                    </form>
                </div>
            </div>
            
            {/* DEBUG PANEL (Status Console) */}
            <div className="w-full max-w-xs p-4 border rounded-lg bg-white shadow-md">
                <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-2">Operation Status</h3>
                <div className={`p-3 rounded text-sm font-semibold ${getStatusColor(statusMessage.type)}`}>
                    {statusMessage.text}
                </div>
                <p className="mt-4 text-xs font-bold text-gray-700">
                    Bargaining Reply Format:
                </p>
                <ul className="text-xs list-disc pl-5 mt-1 text-gray-600 space-y-1">
                    <li>**A [ID]**: Accept current bid (e.g., A 137)</li>
                    <li>**R [ID]**: Reject current bid (e.g., R 137)</li>
                    <li>**C[0-10] [ID]**: Counter-offer index (e.g., C5 137)</li>
                </ul>
                <p className="mt-4 text-xs text-gray-500">
                    *The simulator will only show a new message when a **Consumer** initiates a bargain or sends a counter-offer.
                </p>
            </div>
        </div>
    );
};

export default SmsSimulator;























































// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane, faMobileAlt, faBars, faBatteryFull, faWifi, faCommentDots } from '@fortawesome/free-solid-svg-icons';
// // 💥 NEW: Import the external CSS file
// import './SmsSimulator.css'; 

// // --- CONFIGURATION ---
// const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
// const SMS_WEBHOOK_URL = `${API_BASE_URL}/api/sms/inbound`;
// const FARMER_ID = 'KRST01FR005'; 
// const FARMER_PHONE = '6361334856'; 

// // Establish socket connection with the bypass query parameters.
// const socket = io(API_BASE_URL, {
//     query: {
//         farmer_id: FARMER_ID,
//         userType: 'farmer-sms-tool'
//     },
//     transports: ['websocket', 'polling']
// });

// const SmsSimulator = () => {
//     const messagesEndRef = useRef(null);
//     const [messages, setMessages] = useState([]);
//     const [inputCommand, setInputCommand] = useState('');
//     const [isSending, setIsSending] = useState(false);
//     const [statusMessage, setStatusMessage] = useState({ type: 'info', text: 'Ready. Use A [ID], R [ID], or C[0-10] [ID].' });

//     // --- SOCKET.IO LISTENER ---
//     useEffect(() => {
        
//         socket.on('connect', () => {
//             console.log("Socket Connected! Ready to receive SMS.");
//             setStatusMessage(prev => ({ ...prev, type: 'success', text: `Socket Connected! Ready on ${API_BASE_URL}.` }));
//         });
        
//         socket.on('disconnect', () => {
//             console.error("Socket Disconnected!");
//             setStatusMessage(prev => ({ ...prev, type: 'error', text: 'Socket Disconnected! Check Node.js Server.' }));
//         });

//         socket.on('sms_confirmation_inbound', (data) => {
//             const cleanTarget = (data.to_number || '').replace(/[^0-9]/g, '').slice(-10);
//             const simulatorNumber = FARMER_PHONE.slice(-10); 
            
//             if (cleanTarget === simulatorNumber) {
//                 // 💥 Use specific class for system text
//                 const formattedMessage = `KrishiSetu: ${data.message}`; 
//                 addMessageToLog(formattedMessage, 'system');
//                 setStatusMessage({ type: 'success', text: '✅ Server SMS Confirmation Received via Socket.IO.' });
//             }
//         });

//         setMessages([]); 

//         return () => {
//             socket.off('connect');
//             socket.off('disconnect');
//             socket.off('sms_confirmation_inbound');
//         };
//     }, []);

//     // Auto-scroll to bottom
//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     // Helper to log messages with current time
//     const addMessageToLog = (text, sender = 'system') => {
//         const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
//         setMessages(prev => [...prev, { text, sender, time }]);
//     };

//     // Function to handle the farmer's OUTBOUND reply
//     const handleSendSms = async (e) => {
//         e.preventDefault();
//         const command = inputCommand.trim();
//         if (!command) return;

//         setIsSending(true);
//         setStatusMessage({ type: 'info', text: 'Sending command to webhook...' });
        
//         // 1. Log the farmer's action instantly 
//         addMessageToLog(command, 'farmer');
        
//         try {
//             const data = {
//                 from: FARMER_PHONE,
//                 message: command
//             };

//             await axios.post(SMS_WEBHOOK_URL, data, {
//                 headers: { 'Content-Type': 'application/json' }
//             });

//             setStatusMessage({ type: 'success', text: '✅ Command sent to server. Waiting for confirmation SMS...' });
            
//         } catch (error) {
//             setStatusMessage({ type: 'error', text: `🛑 Network Error: Server unreachable or internal error.` });
//             addMessageToLog('❌ Failed to send command to server.', 'system');
//             console.error("SMS Simulator Fetch Error:", error);
//         } finally {
//             setInputCommand('');
//             setIsSending(false);
//         }
//     };

//     return (
//         <div className="krishi-simulator-container">
//             {/* MOBILE PHONE CHASSIS */}
//             <div className="krishi-phone-chassis">
//                 <div className="krishi-phone-screen">
                    
//                     {/* Status Bar */}
//                     <div className="krishi-status-bar">
//                         <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//                         <div className="flex items-center space-x-1 text-gray-600">
//                             <FontAwesomeIcon icon={faWifi} />
//                             <span className="mr-1">LTE</span>
//                             <FontAwesomeIcon icon={faBatteryFull} />
//                         </div>
//                     </div>

//                     {/* App Header (Contact Name) */}
//                     <div className="krishi-app-header">
//                         <FontAwesomeIcon icon={faCommentDots} className="text-xl text-green-600" />
//                         <div className="header-details">
//                             <p className="font-semibold text-sm text-green-700">KrishiSetu</p>
//                             <p className="phone-number">SMS Gateway</p>
//                         </div>
//                         <FontAwesomeIcon icon={faBars} className="text-lg text-gray-500" />
//                     </div>
                    
//                     {/* Message Display Area */}
//                     <div className="krishi-messages-display" id="messageScroll">
//                         {messages.length === 0 && (
//                              <div className="text-center text-gray-400 mt-20">
//                                 <FontAwesomeIcon icon={faMobileAlt} className="text-3xl mb-2" />
//                                 <p className="text-sm">Waiting for a bargain offer...</p>
//                              </div>
//                         )}
//                         {messages.map((msg, index) => (
//                             <div 
//                                 key={`msg-${index}`} 
//                                 className={`krishi-message-row ${msg.sender === 'farmer' ? 'farmer' : 'system'}`}
//                             >
//                                 <div className="krishi-message-bubble">
//                                     <p className={msg.sender === 'system' ? 'krishi-system-text' : ''}>
//                                         {msg.text}
//                                     </p>
//                                     <span className="krishi-message-meta">
//                                         {msg.time}
//                                     </span>
//                                 </div>
//                             </div>
//                         ))}
//                         <div ref={messagesEndRef} />
//                     </div>

//                     {/* Input Area */}
//                     <form onSubmit={handleSendSms} className="krishi-input-form">
//                         <input
//                             type="text"
//                             value={inputCommand}
//                             onChange={(e) => setInputCommand(e.target.value)}
//                             placeholder={`Reply (e.g., A 157)`}
//                             className="krishi-input-field"
//                             disabled={isSending}
//                         />
//                         <button 
//                             type="submit" 
//                             className="krishi-send-button"
//                             disabled={isSending || inputCommand.trim() === ''}
//                         >
//                             <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
//                         </button>
//                     </form>
//                 </div>
//             </div>
            
//             {/* DEBUG PANEL (Status Console) */}
//             <div className="krishi-debug-panel">
//                 <h3>Operation Status</h3>
//                 <div className={`krishi-status-box ${statusMessage.type}`}>
//                     {statusMessage.text}
//                 </div>
//                 <div className="krishi-format-rules">
//                     <p>Bargaining Reply Format:</p>
//                     <ul>
//                         <li>**A [ID]**: Accept current bid (e.g., A 157)</li>
//                         <li>**R [ID]**: Reject current bid (e.g., R 157)</li>
//                         <li>**C[0-10] [ID]**: Counter-offer index (e.g., C5 157)</li>
//                     </ul>
//                 </div>
//                 <p className="mt-4 text-xs text-gray-500">
//                     *The simulator client is successfully connected via **Socket.IO** to receive confirmation SMS messages.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default SmsSimulator;