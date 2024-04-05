export const errorMiddleware = (error, _req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    const id = error.id || 0;

    res.status(status).send({ id, message });
};