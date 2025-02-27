

console.log('Content script loaded.');

// Function to extract the recipient's email address from the email content
function extractRecipientEmail() {
  // Define possible selectors where the recipient's email might be present
  const recipientSelectors = [
    '.gD a', // Gmail: Recipient email in the "To" field
    '.message-header [title]', // Generic: Email headers (e.g., "To" field)
    '.header-from span', // Outlook Web: Sender/Recipient information
    '.mail_header .email', // Yahoo Mail: Email header
  ];

  let recipientEmail = null;

  for (const selector of recipientSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      // Extract the email address from the element's text or attribute
      const text = element.textContent || element.innerText || element.title;
      const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/); // Simple regex to extract email
      if (emailMatch) {
        recipientEmail = emailMatch[0].trim();
        console.log(`Extracted recipient email: ${recipientEmail}`);
        break;
      }
    }
  }

  return recipientEmail || 'unknown@example.com'; // Fallback if email not found
}

// Function to inject the tracking pixel into the email content area
function injectTrackingPixel() {
  // Retrieve the logged-in user's email from storage
  chrome.storage.local.get(['loggedInUserEmail'], (result) => {
    const loggedInUserEmail = result.loggedInUserEmail || 'unknown@example.com';
    console.log(`Using logged-in user email: ${loggedInUserEmail}`);

    // Extract the recipient's email dynamically
    const recipientEmail = extractRecipientEmail();
    console.log(`Using recipient email: ${recipientEmail}`);

    // Generate the tracking URL using the dynamic emails
    const trackingUrl = `https://emailtracking-server.onrender.com/track?source=extension&recipient=${encodeURIComponent(
      recipientEmail
    )}&sender=${encodeURIComponent(loggedInUserEmail)}&timestamp=${Date.now()}&random=${Math.random()}`;

    const trackingPixel = document.createElement('img');
    trackingPixel.src = trackingUrl;
    trackingPixel.width = 1;
    trackingPixel.height = 1;
    trackingPixel.alt = '';
    trackingPixel.style.display = 'none';

    // Possible selectors for different email clients
    const selectors = [
      'div.a3s.aXjCH', // Gmail
      '.ii.gt div', // Gmail (alternative)
      '.EmailMessage-body', // Outlook Web
      '.message-body', // Yahoo Mail
      '.mail_body', // ProtonMail
      '.read-message', // Generic
      '.message-content', // Generic
      'iframe body', // Emails in iframes
    ];

    let injected = false;

    console.log('Trying to inject tracking pixel...');
    for (const selector of selectors) {
      const container = document.querySelector(selector);
      if (container) {
        console.log(`Found container with selector: ${selector}`);
        container.appendChild(trackingPixel);
        console.log(`Tracking pixel injected into ${selector}.`);
        injected = true;
        break;
      } else {
        console.log(`Selector ${selector} did not match.`);
      }
    }

    if (!injected) {
      console.log('No matching container found; appending pixel to document body.');
      document.body.appendChild(trackingPixel);
    }
  });
}

// Periodically try to inject the tracking pixel
setInterval(injectTrackingPixel, 5000);











// // // public/content.js

// // console.log("Content script loaded.");

// // // Function to inject the tracking pixel
// // function injectTrackingPixel() {
// //   // Replace the URL below with your actual backend tracking endpoint
// // //   const trackingUrl = "https://your-backend.com/track?source=content";

// // const trackingUrl = "http://localhost:3001/track?source=content"
  
// //   // Create the image element for the tracking pixel
// //   const trackingPixel = document.createElement("img");
// //   trackingPixel.src = trackingUrl;
// //   trackingPixel.width = 1;
// //   trackingPixel.height = 1;
// //   trackingPixel.alt = "";
// //   trackingPixel.style.display = "none";

// //   // Append the tracking pixel to the body of the document
// //   document.body.appendChild(trackingPixel);
// // }

// // // Inject the tracking pixel when the content script runs
// // injectTrackingPixel();

// // // Optional: Listen for messages from your background or popup scripts
// // if (chrome && chrome.runtime && chrome.runtime.onMessage) {
// //   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// //     console.log("Content script received message:", message);
// //     if (message.action === "ping") {
// //       sendResponse({ response: "pong" });
// //     }
// //   });
// // }


// // public/content.js

// // public/content.js
// // console.log("Content script loaded.");

// // // Function to inject the tracking pixel
// // function injectTrackingPixel() {
// //   // Replace with your actual backend URL for tracking
// //   const trackingUrl = "https://emailtracking-server.onrender.com/track?source=content";
// //   const trackingPixel = document.createElement("img");
// //   trackingPixel.src = trackingUrl;
// //   trackingPixel.width = 1;
// //   trackingPixel.height = 1;
// //   trackingPixel.alt = "";
// //   trackingPixel.style.display = "none";
// //   document.body.appendChild(trackingPixel);
// // }

// // // Inject the tracking pixel
// // injectTrackingPixel();


// // content.js

// // console.log("Content script loaded.");

// // // Function to inject the tracking pixel into the email content area
// // function injectTrackingPixel() {
// //   const trackingUrl = `https://emailtracking-server.onrender.com/track?source=extension&timestamp=${Date.now()}&random=${Math.random()}`;
// //   const trackingPixel = document.createElement("img");
// //   trackingPixel.src = trackingUrl;
// //   trackingPixel.width = 1;
// //   trackingPixel.height = 1;
// //   trackingPixel.alt = "";
// //   trackingPixel.style.display = "none";

// //   // Possible selectors for different email clients
// //   const selectors = [
// //     "div.a3s.aXjCH",         // Gmail
// //     ".email-body",            // Generic
// //     ".message-body",          // Generic
// //     ".mail-body",             // Yahoo, Outlook
// //     ".read-message",          // Generic
// //     ".message-content",       // Generic
// //     "iframe body"             // Emails in iframes
// //   ];

// //   let injected = false;

// //   for (const selector of selectors) {
// //     const container = document.querySelector(selector);
// //     if (container) {
// //       container.appendChild(trackingPixel);
// //       console.log(`Tracking pixel injected into ${selector}.`);
// //       injected = true;
// //       break;
// //     }
// //   }

// //   if (!injected) {
// //     console.log("Email content container not found; appending pixel to document body.");
// //     document.body.appendChild(trackingPixel);
// //   }
// // }

// // // Periodically try to inject the tracking pixel
// // setInterval(injectTrackingPixel, 5000);


// console.log("Content script loaded.");

// // Function to inject the tracking pixel into the email content area
// function injectTrackingPixel() {
//   const trackingUrl = `https://emailtracking-server.onrender.com/track?source=extension&timestamp=${Date.now()}&random=${Math.random()}`;
//   const trackingPixel = document.createElement("img");
//   trackingPixel.src = trackingUrl;
//   trackingPixel.width = 1;
//   trackingPixel.height = 1;
//   trackingPixel.alt = "";
//   trackingPixel.style.display = "none";

//   // Possible selectors for different email clients
//   const selectors = [
//     "div.a3s.aXjCH", // Gmail
//     ".EmailMessage-body", // Outlook Web
//     ".message-body", // Yahoo Mail
//     ".mail_body", // ProtonMail
//     ".read-message", // Generic
//     ".message-content", // Generic
//     "iframe body" // Emails in iframes
//   ];

//   let injected = false;

//   for (const selector of selectors) {
//     const container = document.querySelector(selector);
//     if (container) {
//       console.log(`Found container with selector: ${selector}`);
//       container.appendChild(trackingPixel);
//       console.log(`Tracking pixel injected into ${selector}.`);
//       injected = true;
//       break;
//     } else {
//       console.log(`Selector ${selector} did not match.`);
//     }
//   }

//   if (!injected) {
//     console.log("No matching container found; appending pixel to document body.");
//     document.body.appendChild(trackingPixel);
//   }
// }

// // Periodically try to inject the tracking pixel
// setInterval(injectTrackingPixel, 5000);