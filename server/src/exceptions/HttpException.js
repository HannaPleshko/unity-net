export class HttpException extends Error {
    status;
    message;
    id;

    constructor(status, obj) {
        super(obj.message);
        this.status = status;
        this.message = obj.message;
        this.id = obj.id;
    }
}