import { Router } from 'express';
import { createUser, authenticateUser, getUserById } from '../service/user.service.js';
import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import { SuccessfulType } from '../exceptions/exceptions.type.js';
import { buildResponse } from '../helper/response.js';
import { createToken } from '../helper/jwt.js';

const route = Router()

const upload = multer({
    storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname))
    })
});

route.post('/registrate', upload.single('profileImage'), async (req, res, next) => {
    try {
        const { name, email, password, birthday, gender } = req.body;
        const profileImage = req.file.path;

        await createUser({ name, email, password, birthday, gender, profileImage })

        buildResponse(res, 201, SuccessfulType.DB_USER_SUCCESS_REGISTRATE)
    } catch (error) {
        next(error)
    }
});

route.post('/authenticate', async (req, res, next) => {
    try {
        const foundUser = await authenticateUser(req.body)

        const tokenData = createToken(foundUser);

        res.cookie('Bearer: ', tokenData.token, {
            httpOnly: false,
            secure: true,
        });

        buildResponse(res, 201, SuccessfulType.DB_USER_SUCCESS_AUTHENTICATE)
    } catch (error) {
        next(error)
    }
});

route.get('/:_id', async (req, res, next) => {
    try {
        const { _id } = req.params;
        buildResponse(res, 200, await getUserById(_id));
    } catch (error) {
        next(error)
    }
});

export default route