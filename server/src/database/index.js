import { connect, Schema, model, Types } from 'mongoose';
import { MONGO_URI } from '../config/index.js';

connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    profileImage: { type: String, required: true }
});

const User = model('User', userSchema);
const ObjectId = Types.ObjectId;

export { User, ObjectId }