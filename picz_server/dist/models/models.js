"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var imageSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    key: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: function (url) {
                return /^https?:\/\/[^\s$.?#].[^\s]*$/.test(url);
            },
            message: 'URL must be a valid URL.',
        },
    },
    dateUploaded: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
var userSchema = new mongoose_1.Schema({
    _idClerk: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fName: {
        type: String,
        required: true,
        trim: true,
    },
    lName: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: [imageSchema],
        default: [],
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=models.js.map