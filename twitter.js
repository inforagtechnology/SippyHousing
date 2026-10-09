const fetch = require('node-fetch');

// === CONFIGURATION ===
const API_KEY = "v6NhEoWuQtPsx69UEM2uPje2z";
const API_SECRET_KEY = "k97AXZXJfoAIPmnnz5rNDIbW8h3wJQ7V2qJsPvK5Yy8LQMK5sk";
const ACCESS_TOKEN = "2298088386-vlLBOfnhE4Fedo7YDdgCHr61qNsTtkrRyh3dovB";
const ACCESS_TOKEN_SECRET = "jSIzlhptDqu52rIm9xJ8T078EINkGy65kc0vgXN9EG0z0";



console.log("Hi there");
postTweets()
function postTweets() {
    console.log("Hello")
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//   const data = sheet.getDataRange().getValues();
  const tweet = "   Hello, Twitter API v2 from Google Apps Script!";
  postToTwitter(tweet);
//   for (let i = 1; i < data.length; i++) {
//     const tweet = data[i][0];
//     const status = data[i][1];
    
//     if (status.toLowerCase() === "pending") {
//       const response = postToTwitter(tweet);
//       if (response) {
//         sheet.getRange(i + 1, 2).setValue("Posted");
//         Logger.log("Tweet posted: " + tweet);
//       } else {
//         sheet.getRange(i + 1, 2).setValue("Failed");
//       }
//       Utilities.sleep(2000); // wait 2s between tweets
//     }
//   }
}

function postToTwitter(tweet) {
  const url = "https://api.x.com/2/tweets"; // X API v2 endpoint

  const payload = {
    text: tweet
  };

  const headers = {
    "Authorization": "Bearer " + getBearerToken(),
    "Content-Type": "application/json"
  };

  const options = {
    method: "post",
    headers: headers,
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    // Logger.log(result);
    console.log("Chal gaya")
    return result.data ? true : false;
  } catch (e) {
    // Logger.log("Error posting tweet: " + e);
    console.log(e)
    return false;
  }
}

function getBearerToken() {
  // If you have an OAuth 2.0 Bearer token, paste it directly here.
  // For simplicity, you can generate one manually from your Twitter developer dashboard.
  return "AAAAAAAAAAAAAAAAAAAAAJUS5AEAAAAA0nbBHY2MAA%2BeIuWAYNVuE%2Fb3G4M%3DhqmAqCtt4iFV7NEwHejMLY3KxzkkivwIm7ckT64mhUHdeQRSow";
}
