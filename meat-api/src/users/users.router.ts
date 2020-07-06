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

    }

}

export const usersRouter = new UsersRouter()