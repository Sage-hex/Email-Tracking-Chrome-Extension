// background.js

// Log installation and updates
chrome.runtime.onInstalled.addListener(() => {
    console.log("Email Tracker extension installed or updated.");
  });
  
  // Listen for messages from content scripts or the popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background received message:", message);
    
    // Example: Log an event message from the content script
    if (message.type === "LOG_EVENT") {
      console.log("Logging event in background:", message.payload);
      // Optionally forward the event to your backend if needed
    }
    
    // Example: Handle logout message from the popup
    if (message.type === "LOGOUT") {
      console.log("Logout requested.");
      // Perform any cleanup, if necessary
    }
    
    // Always send a response to keep the messaging channel open
    sendResponse({ status: "acknowledged" });
  });
  
  // Optional: Set up an alarm to perform periodic tasks
  chrome.alarms.create("periodicTask", { periodInMinutes: 15 });
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "periodicTask") {
      console.log("Running periodic background task.");
      // For example: refresh tokens or sync data with the backend
    }
  });
  