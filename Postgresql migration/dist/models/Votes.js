"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Votes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const VotesSchema = new mongoose_1.default.Schema({
    user: String,
    voteCount: {
        default: 1,
        type: Number,
    },
});
exports.Votes = mongoose_1.default.model('Votes', VotesSchema, 'Votes');
