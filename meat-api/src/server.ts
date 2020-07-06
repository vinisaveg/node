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