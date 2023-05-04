"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requireAuth_1 = __importDefault(require("../middleware/requireAuth"));
const workoutController_1 = require("../controllers/workoutController");
const router = express_1.default.Router();
router.use(requireAuth_1.default);
router.get('/', workoutController_1.getWorkouts);
router.get('/:id', workoutController_1.getWorkout);
router.post('/', workoutController_1.createWorkout);
router.put('/:id', workoutController_1.updateWorkout);
router.delete('/:id', workoutController_1.deleteWorkout);
exports.default = router;
