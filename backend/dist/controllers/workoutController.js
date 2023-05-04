"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkout = exports.deleteWorkout = exports.getWorkout = exports.getWorkouts = exports.createWorkout = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const workoutModel_1 = __importDefault(require("../models/workoutModel"));
// get all workouts
const getWorkouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user._id;
        const workouts = yield workoutModel_1.default.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    }
    catch (err) {
        console.log('@@err', err);
    }
});
exports.getWorkouts = getWorkouts;
// get a single workouts
const getWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such workout' });
    }
    try {
        const workout = yield workoutModel_1.default.findById(id).sort({ createdAt: -1 });
        if (!workout) {
            return res.status(400).json({ error: 'No such workout' });
        }
        res.status(200).json(workout);
    }
    catch (err) {
        console.log('@@err', err);
    }
});
exports.getWorkout = getWorkout;
// create a new workout
const createWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, reps, load } = req.body;
    let emptyFields = [];
    try {
        if (!title) {
            emptyFields.push('title');
        }
        if (!reps) {
            emptyFields.push('reps');
        }
        if (!load) {
            emptyFields.push('load');
        }
        if (emptyFields.length > 0) {
            res.status(400).json({ error: 'please insert all empty fields', emptyFields });
        }
        else {
            const user_id = req.user._id;
            const workout = yield workoutModel_1.default.create({ title, reps, load, user_id });
            res.status(200).json(workout);
        }
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
exports.createWorkout = createWorkout;
// delete a workout
const deleteWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'No such workout' });
        }
        const workout = yield workoutModel_1.default.findByIdAndDelete(id);
        res.status(200).json(workout);
    }
    catch (err) {
        console.log('@@err', err);
    }
});
exports.deleteWorkout = deleteWorkout;
// update a workout
const updateWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, reps, load } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'No such workout' });
        }
        const workout = yield workoutModel_1.default.findByIdAndUpdate(id, {
            title, reps, load
        });
        if (!workout) {
            res.status(400).json({ error: 'No such workout' });
        }
        else {
            const updatedWorkout = yield workoutModel_1.default.findById(id);
            res.status(200).json(updatedWorkout);
        }
    }
    catch (err) {
        console.log('@@err', err);
    }
});
exports.updateWorkout = updateWorkout;
