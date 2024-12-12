"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var backend_1 = require("@clerk/backend");
var clerkClient = (0, backend_1.createClerkClient)({
    secretKey: process.env.CLERK_SECRET_KEY,
});
//# sourceMappingURL=clerk.js.map