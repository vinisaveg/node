import { Router } from '../common/router'
import restify, {Response, Request} from 'restify'
import { User } from './users.model'
import { NotFoundError } from 'restify-errors'

class UsersRouter extends Router {

    constructor() {
        super()

        this.on('beforeRender', document => {
            document.password = undefined
            // delete document.password
        })
    }
    
    applyRoutes(application: restify.Server) {

        application.get("/users", (request, response, next) => {
            
            User.find()
                .then(this.render(response, next))
                .catch(next)

        })

        application.get('/users/:id', (request: Request, response: Response, next) => {

            const id = request.params.id
            User.findById(id)
                .then(this.render(response, next))
                .catch(next)

        })

        application.post('/users', (request: Request, response: Response, next) => {

            let newUser = new User(request.body)

            newUser.save()
                .then(this.render(response, next))
                .catch(next)
            
        })

        application.put('/users/:id', (request: Request, response: Response, next) => {

            let options = { useFindAndModify: false, overwrite: true }

            User.findByIdAndUpdate({ _id: request.params.id }, request.body, options)
                .then(result => {
                    if(result){
                        return User.findById(request.params.id)
                    }else {
                        throw new NotFoundError({error: "not found"})
                    }
                })
                .then(this.render(response, next))
                .catch(next)

        })

        application.patch('/users/:id', (request: Request, response: Response, next) => {
            
            let options = { new: true, useFindAndModify: false }

            User.findByIdAndUpdate(request.params.id, request.body, options)
                .then(this.render(response, next))
                .catch(next)
        })

        application.del('/users/:id', (request: Request, response: Response, next) => {

            User.findByIdAndDelete({ _id: request.params.id })
                .then(result => {
                        response.status(204)
                        response.json({ result })
                        return next()
                })
                .catch(next)
        })

    // TEST
    //     application.get('/next', 

    //     [
    //         (request, response, next) => {

    //         if(request.userAgent().includes('Mozilla/4.0')){

    //                 let error: any = new Error()
    //                 error.message = "Please, update your browser."
    //                 error.statusCode = 400

    //                 return next(error)
    //         }

    //             return next()
    //         },

    //         (request, response, next) => {

    //         response.setHeader("content-type", "application/json")
    //         response.status(200)
    //         response.json({
    //             browser: request.userAgent(),
    //             method: request.method,
    //             url: request.url,
    //             path: request.path(),
    //             query: request.query
    //         })

    //         return next()

    //         }
    //     ]
    // )

    }

}

export const usersRouter = new UsersRouter()