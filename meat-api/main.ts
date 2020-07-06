import * as restify from 'restify'

const server = restify.createServer({
    name: "meat-api",
    version: "1.0.0"
})

server.use(restify.plugins.queryParser())

server.get('/info', (request, response, next) => {

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

})

server.get('/next', 

    [
        (request, response, next) => {

           if(!request.userAgent().includes('Mozilla/4.0')){

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

server.listen(3000, () => {
    console.log("API Running on port: 3000 🐦")
})