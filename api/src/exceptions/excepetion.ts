import { HttpException, HttpStatus } from "@nestjs/common";

export class BadRequest extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST)
    }
}

export class NotFound extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.NOT_FOUND)
    }
}

export class Forbidden extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.FORBIDDEN)
    }
}

export class Unauthorized extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.UNAUTHORIZED)
    }
}

export class Conflict extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.CONFLICT)
    }
}

export class NoContent extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.NO_CONTENT)
    }
}

export class InternalError extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
