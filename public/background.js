chrome.runtime.onInstalled.addListener(() => {
  console.log('Email Tracker extension installed or updated.');
});

// Listen for messages from the content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SET_LOGGED_IN_USER') {
    console.log('Setting logged-in user:', message.payload.email);
    chrome.storage.local.set({ loggedInUserEmail: message.payload.email });
  }

  if (message.type === 'LOGOUT') {
    console.log('Clearing logged-in user data.');
    chrome.storage.local.remove('loggedInUserEmail');
  }

  sendResponse({ status: 'acknowledged' });
});

// Retrieve the logged-in user's email when the extension starts
chrome.storage.local.get(['loggedInUserEmail'], (result) => {
  if (result.loggedInUserEmail) {
    console.log('Logged-in user email:', result.loggedInUserEmail);
  }
});