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
// console.log("Content script loaded.");

// // Function to inject the tracking pixel
// function injectTrackingPixel() {
//   // Replace with your actual backend URL for tracking
//   const trackingUrl = "https://emailtracking-server.onrender.com/track?source=content";
//   const trackingPixel = document.createElement("img");
//   trackingPixel.src = trackingUrl;
//   trackingPixel.width = 1;
//   trackingPixel.height = 1;
//   trackingPixel.alt = "";
//   trackingPixel.style.display = "none";
//   document.body.appendChild(trackingPixel);
// }

// // Inject the tracking pixel
// injectTrackingPixel();


// content.js

console.log("Content script loaded.");

// Function to inject the tracking pixel into the email content area
function injectTrackingPixel() {
  // Tracking URL may include parameters (like emailId) if needed
  const trackingUrl = "https://emailtracking-server.onrender.com/track?source=extension";
  const trackingPixel = document.createElement("img");
  trackingPixel.src = trackingUrl;
  trackingPixel.width = 1;
  trackingPixel.height = 1;
  trackingPixel.alt = "";
  trackingPixel.style.display = "none";
  
  // For example, if using Gmail, you might target the email body container.
  // The selector below is just an example—you'll need to adjust it based on the actual DOM.
  const emailBody = document.querySelector("div.a3s.aXjCH"); // Gmail's email body container often uses these classes.
  if (emailBody) {
    emailBody.appendChild(trackingPixel);
    console.log("Tracking pixel injected into email content.");
  } else {
    console.log("Email content container not found; appending pixel to document body.");
    document.body.appendChild(trackingPixel);
  }
}

// Delay injection slightly to ensure the email content has loaded
setTimeout(injectTrackingPixel, 3000);
