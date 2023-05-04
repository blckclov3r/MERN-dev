import {Document, Model, model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import validator from "validator";

export interface IUser extends Document {
    email: string;
    password: string;
}

interface IUserModel extends Model<IUser> {
    signup(email: string, password: string): Promise<IUser>;
    login(email: string, password: string): Promise<IUser>;
}

const UserSchema = new Schema<IUser>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

UserSchema.statics.signup = async function (email: string, password: string) {
    if (!email || !password) {
        throw Error('All field must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }
    const exists = await this.findOne({email});
    if (exists) {
        throw new Error('Email is already in use');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return await this.create({
        email,
        password: hash,
    });
};

// static login
UserSchema.statics.login = async function (email: string, password: string) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})
    if (!user) {
        throw Error('Incorrect email')
    }
    const match = bcrypt.compare(password,user.password)
    if(!match){
        throw Error('Incorrect password');
    }
    return user
}

const UserModel: IUserModel = model<IUser, IUserModel>('User', UserSchema);
export default UserModel;
