const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");

const clerk = new ClerkExpressWithAuth({
  apiKey: "your-clerk-api-key",
});
