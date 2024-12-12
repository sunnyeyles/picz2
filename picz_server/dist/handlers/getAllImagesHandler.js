"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllImagesHandler = void 0;
var models_1 = require("../models/models");
var getAllImagesHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, _b, limit, _c, order_1, user, imageUrls, sortedImages, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                _a = req.body, userId = _a.userId, _b = _a.limit, limit = _b === void 0 ? 50 : _b, _c = _a.order, order_1 = _c === void 0 ? 'descending' : _c;
                return [4 /*yield*/, models_1.User.findOne({ _idClerk: userId })];
            case 1:
                user = _d.sent();
                if (user) {
                    imageUrls = user.images;
                    if (imageUrls.length > 0) {
                        sortedImages = __spreadArray([], imageUrls, true).sort(function (a, b) {
                            var dateA = new Date(a.dateUploaded || a.dateUploaded).getTime();
                            var dateB = new Date(b.dateUploaded || b.dateUploaded).getTime();
                            return order_1 === 'ascending' ? dateA - dateB : dateB - dateA;
                        })
                            .slice(0, limit);
                        res.status(200).json({ images: sortedImages });
                        console.log('Sorted Images: ', sortedImages);
                        return [2 /*return*/];
                    }
                    else {
                        res
                            .status(200)
                            .json({ message: 'user has no images uploaded', images: [] });
                        return [2 /*return*/];
                    }
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _d.sent();
                console.error('Error in getAllImagesHandler:', error_1);
                res.status(500).json({ message: 'server error', error: error_1 });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllImagesHandler = getAllImagesHandler;
//# sourceMappingURL=getAllImagesHandler.js.map