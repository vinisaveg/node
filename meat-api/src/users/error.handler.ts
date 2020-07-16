import restify from 'restify'

export const handleError = (request: Request, response: Response, error: any, done: any) => {

    error.toJSON = () => {
        return {
            message: error.message
        }
    }

    switch(error.name) {
        case 'MongoError':
            if(error.code === 11000) {
                error.statusCode = 400
            }
            break;
        case 'ValidationError':
            error.statusCode = 400
            break;
    }

    done()

}