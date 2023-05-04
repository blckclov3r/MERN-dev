import express from 'express';
import requireAuth from '../middleware/requireAuth'

import {createWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout} from "../controllers/workoutController";

const router = express.Router()

router.use(requireAuth)

router.get('/',getWorkouts)

router.get('/:id',getWorkout)

router.post('/',createWorkout)

router.put('/:id',updateWorkout)

router.delete('/:id',deleteWorkout)

export default router

