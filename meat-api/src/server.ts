import restify from 'restify'
import { environment } from './common/environment'
import { Router } from './common/router'

export class Server {

    application!: restify.Server

    initRoutes(routers: Array<Router>): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                this.application = restify.createServer({
                    name: "meat-api",
                    version: "1.0.0"
                })

                this.application.use(restify.plugins.queryParser())

                // routes
                for(let router of routers) {
                    router.applyRoutes(this.application)
                }

                this.application.get('/next', 

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

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                })

            }catch(error) {
                reject(error)
            }
        })
    }

    bootstrap(routers: Array<Router> = []): Promise<Server> {
        return this.initRoutes(routers).then(() => this)
    } 
}