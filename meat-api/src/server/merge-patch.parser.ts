import restify, {Request, Response} from 'restify'

const mpContentType = 'application/merge-patch+json'

export const mergePatchBodyParser = (request: Request, response: Response, next: any) => {
    
    if(request.getContentType() === mpContentType && request.method === 'PATCH'){

        try {
            request.body = JSON.parse(request.body)

        }catch(error) {
            return next(new Error(`Invalid content: ${error.message}`))

        }
        
        
    }

    return next()

}