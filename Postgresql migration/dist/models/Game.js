"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const GameSchema = new mongoose_1.default.Schema({
    player: String,
    money: {
        default: 0,
        type: Number,
    },
    percentIncrease: Number,
    baseCost: {
        default: 1,
        type: Number,
    },
    cost: {
        default: 0,
        type: Number,
    },
    level: {
        default: 0,
        type: Number,
    },
    checkedLevel: {
        default: 0,
        type: Number,
    },
    idleCollection: Number,
    idleProfit: Number,
});
exports.Game = mongoose_1.default.model('Game', GameSchema, 'games');
