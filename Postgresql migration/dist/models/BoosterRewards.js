"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoosterRewards = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BoosterRewardsSchema = new mongoose_1.default.Schema({
    userId: String,
    rewardingDate: Number,
});
exports.BoosterRewards = mongoose_1.default.model('BoosterRewards', BoosterRewardsSchema, 'BoosterRewards');
