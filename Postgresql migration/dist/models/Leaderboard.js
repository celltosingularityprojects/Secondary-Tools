"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LeaderboardSchema = new mongoose_1.default.Schema({
    type: String,
    list: Array,
});
exports.Leaderboard = mongoose_1.default.model('Leaderboard', LeaderboardSchema, 'Leaderboard');
