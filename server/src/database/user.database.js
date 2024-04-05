import { User, ObjectId } from './index.js';

async function createUserDB(user) {
    await User.create(user);
}

async function getByEmail(email) {
    return await User.findOne({ email });
}

async function getUserByIdDB(_id) {
    return await User.findOne({ _id: new ObjectId(_id) });
}

async function getUsersDB() {
    return await User.find();
}

async function deleteUserDB(_id) {
    await User.deleteOne({ _id: new ObjectId(_id) });
}

async function updateUserDB(_id, user) {
    await User.updateOne({ _id: new ObjectId(_id) }, user);
}

export { createUserDB, getByEmail, getUsersDB, deleteUserDB, updateUserDB, getUserByIdDB }