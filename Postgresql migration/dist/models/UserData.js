"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserDataSchema = new mongoose_1.default.Schema({
    discordId: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    metabits: {
        type: Number,
        default: 0,
    },
    dino_rank: {
        type: Number,
        default: 0,
    },
    prestige_rank: {
        type: Number,
        default: 0,
    },
    singularity_speedrun_time: {
        type: Number,
        default: null,
    },
    all_sharks_obtained: {
        type: Boolean,
        default: false,
    },
    all_hidden_achievements_obtained: {
        type: Boolean,
        default: false,
    },
    edited_timestamp: {
        type: Number,
    },
});
exports.UserData = mongoose_1.default.model('UserData', UserDataSchema, 'UserData');
