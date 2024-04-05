import { createUserDB, getByEmail, getUserByIdDB } from '../database/user.database.js'
import { HttpException } from '../exceptions/HttpException.js';
import { ExceptionType } from '../exceptions/exceptions.type.js';
import bcrypt from 'bcrypt'

async function getUserById(_id) {
    const foundUser = await getUserByIdDB(_id);
    return foundUser;
}

async function authenticateUser(user) {
    const foundUser = await getByEmail(user.email);
    if (!foundUser) throw new HttpException(400, ExceptionType.DB_USER_GET_BY_EMAIL_NOT_FOUND);
    if (!(await bcrypt.compare(user.password, foundUser.password))) throw new HttpException(400, ExceptionType.DB_USER_INVALID_PWD);
    return foundUser;
}

async function createUser(user) {
    const foundUser = await getByEmail(user.email);

    if (foundUser) throw new HttpException(400, ExceptionType.DB_USER_GET_BY_EMAIL_ALREADY_EXIST);

    const userHashed = await generatePasswordHash(user);

    await createUserDB(userHashed) 
}

async function generatePasswordHash(user) {
    const hashPwd = await bcrypt.hashSync(user.password, await bcrypt.genSaltSync(10));
    return { ...user, password: hashPwd };
}

export { createUser, authenticateUser, getUserById }