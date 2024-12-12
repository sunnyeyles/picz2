"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var uploadImageHandler_1 = require("../handlers/uploadImageHandler");
var getAllImagesHandler_1 = require("../handlers/getAllImagesHandler");
var deleteImageHandler_1 = require("../handlers/deleteImageHandler");
var upload = (0, multer_1.default)();
var imageRouter = (0, express_1.Router)();
imageRouter.post('/image/uploadimage/', upload.single('file'), uploadImageHandler_1.uploadImageHandler);
imageRouter.post('/image/deleteimage/', deleteImageHandler_1.deleteImageHandler);
imageRouter.post('/image/getallimages/', getAllImagesHandler_1.getAllImagesHandler);
exports.default = imageRouter;
//# sourceMappingURL=imageRoutes.js.map