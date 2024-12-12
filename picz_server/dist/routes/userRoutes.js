"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var clerkWebhook_1 = require("../handlers/clerkWebhook");
var createUser_1 = require("../handlers/createUser");
var userRouter = (0, express_1.Router)();
userRouter.post('/webhooks/clerk/', clerkWebhook_1.createNewUser);
userRouter.post('/user/createUser/', createUser_1.createUser);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map