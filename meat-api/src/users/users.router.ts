import { Router } from '../common/router'
import restify from 'restify'
import { User } from './users.model'

class UsersRouter extends Router {
    
    applyRoutes(application: restify.Server) {

        application.get("/users", (request, response, next) => {
            
            User.findAll().then(users => {
                response.json({users})
            })

        })

        application.get('/users/:id', (request, response, next) => {

            const id = request.params.id
            User.findById(id).then(user => {
                if(user){
                    response.json({user})
                    return next()
                }

                response.status(404)
                response.json({error: "User not found"})
                return next()
            })

        })

        application.get('/next', 

        [
            (request, response, next) => {

            if(request.userAgent().includes('Mozilla/4.0')){

                    let error: any = new Error()
                    error.message = "Please, update your browser."
                    error.statusCode = 400

                    return next(error)
            }

                return next()
            },

            (request, response, next) => {

            response.setHeader("content-type", "application/json")
            response.status(200)
            response.json({
                browser: request.userAgent(),
                method: request.method,
                url: request.url,
                path: request.path(),
                query: request.query
            })

            return next()

            }
        ]
    )

    }

}

export const usersRouter = new UsersRouter()