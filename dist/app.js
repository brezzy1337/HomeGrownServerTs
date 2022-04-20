"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Welcome HomeGrown Admin!');
});
app.listen(3002, () => {
    console.log("Server is running on port 3002");
});
//# sourceMappingURL=app.js.map