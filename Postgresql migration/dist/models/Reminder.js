"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reminder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ReminderSchema = new mongoose_1.default.Schema({
    userId: String,
    reminders: Array,
});
exports.Reminder = mongoose_1.default.model('Reminder', ReminderSchema, 'Reminder');
