import {Request, Response} from "express";
import mongoose from "mongoose";
import workoutModel from "../models/workoutModel";

// get all workouts
const getWorkouts = async (req: any, res: Response) => {
    try {
        const user_id = req.user._id
        const workouts = await workoutModel.find({user_id}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (err) {
        console.log('@@err', err)
    }
}

// get a single workouts
const getWorkout = async (req: Request, res: Response) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such workout'})
    }
    try {
        const workout = await workoutModel.findById(id).sort({createdAt: -1})

        if (!workout) {
            return res.status(400).json({error: 'No such workout'})
        }
        res.status(200).json(workout)
    } catch (err) {
        console.log('@@err', err)
    }
}

// create a new workout
const createWorkout = async (req: any, res: Response) => {
    const {title, reps, load} = req.body
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
            res.status(400).json({error: 'please insert all empty fields', emptyFields})
        } else {
            const user_id = req.user._id
            const workout = await workoutModel.create({title, reps, load, user_id})
            res.status(200).json(workout)
        }

    } catch (err) {
        res.status(400).json({error: err})
    }
}

// delete a workout
const deleteWorkout = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'No such workout'})
        }
        const workout = await workoutModel.findByIdAndDelete(id)
        res.status(200).json(workout)
    } catch (err) {
        console.log('@@err', err)
    }
}

// update a workout
const updateWorkout = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const {title, reps, load} = req.body
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'No such workout'})
        }
        const workout = await workoutModel.findByIdAndUpdate(id, {
            title, reps, load
        })
        if (!workout) {
            res.status(400).json({error: 'No such workout'})
        }else{
            const updatedWorkout = await workoutModel.findById(id)
            res.status(200).json(updatedWorkout)
        }
    } catch (err: any) {
        console.log('@@err', err)
    }
}

export {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
}