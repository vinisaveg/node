import restify, { Response, Next } from 'restify'
// import { EventEmitter } from 'events'

export abstract class Router {

    abstract applyRoutes(application: restify.Server) : void

    render(response: Response, next: Next) {
        return (document: any) => {
            if(document) {
                response.json(document)
            } else {
                response.send(404)
            }

            return next()
        }
    }

}