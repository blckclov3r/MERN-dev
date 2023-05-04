import mongoose from "mongoose";

const Schema = mongoose.Schema

export interface IWorkout extends Document {
    title: string;
    reps: number;
    load: number;
}

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true,
    }
},{timestamps: true})

export default mongoose.model<IWorkout>('Workout',workoutSchema)