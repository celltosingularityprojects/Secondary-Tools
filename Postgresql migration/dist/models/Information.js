"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Information = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const InformationSchema = new mongoose_1.default.Schema({
    infoType: String,
    info: {
        type: String,
        default: 'Nope',
    },
    count: {
        type: Number,
        default: 1,
    },
    updated: {
        type: Boolean,
        default: false,
    },
    expired: String,
    list: mongoose_1.default.Schema.Types.Mixed,
    footer: {
        type: String,
        default: 'Much emptiness',
    },
});
exports.Information = mongoose_1.default.model('Information', InformationSchema, 'Information');
