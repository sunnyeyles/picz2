"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var utils_1 = require("./utils/utils");
var imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cors_1.default)(utils_1.corsOptions));
app.use('/api', imageRoutes_1.default);
app.use('/api', userRoutes_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map