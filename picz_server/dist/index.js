"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// image upload
var server_js_1 = __importDefault(require("./server.js"));
server_js_1.default.listen(3001, function () {
    console.log("hello on http://localhost:3001");
});
//# sourceMappingURL=index.js.map