import restify, { Response, Next } from 'restify'
import { NotFoundError } from 'restify-errors'
import { EventEmitter } from 'events'

export abstract class Router extends EventEmitter {

    abstract applyRoutes(application: restify.Server) : void

    render(response: Response, next: Next) {
        return (document: any) => {
            if(document) {
                this.emit('beforeRender', document)
                response.json(document)
            } else {
                throw new NotFoundError('Document not found')
            }

            return next()
        }
    }

}