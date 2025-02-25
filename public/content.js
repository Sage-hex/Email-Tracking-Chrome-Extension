// // public/content.js

// console.log("Content script loaded.");

// // Function to inject the tracking pixel
// function injectTrackingPixel() {
//   // Replace the URL below with your actual backend tracking endpoint
// //   const trackingUrl = "https://your-backend.com/track?source=content";

// const trackingUrl = "http://localhost:3001/track?source=content"
  
//   // Create the image element for the tracking pixel
//   const trackingPixel = document.createElement("img");
//   trackingPixel.src = trackingUrl;
//   trackingPixel.width = 1;
//   trackingPixel.height = 1;
//   trackingPixel.alt = "";
//   trackingPixel.style.display = "none";

//   // Append the tracking pixel to the body of the document
//   document.body.appendChild(trackingPixel);
// }

// // Inject the tracking pixel when the content script runs
// injectTrackingPixel();

// // Optional: Listen for messages from your background or popup scripts
// if (chrome && chrome.runtime && chrome.runtime.onMessage) {
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log("Content script received message:", message);
//     if (message.action === "ping") {
//       sendResponse({ response: "pong" });
//     }
//   });
// }


// public/content.js

// public/content.js
console.log("Content script loaded.");

// Function to inject the tracking pixel
function injectTrackingPixel() {
  // Replace with your actual backend URL for tracking
  const trackingUrl = "https://email-tracking-server.onrender.com/track?source=content";
  const trackingPixel = document.createElement("img");
  trackingPixel.src = trackingUrl;
  trackingPixel.width = 1;
  trackingPixel.height = 1;
  trackingPixel.alt = "";
  trackingPixel.style.display = "none";
  document.body.appendChild(trackingPixel);
}

// Inject the tracking pixel
injectTrackingPixel();
