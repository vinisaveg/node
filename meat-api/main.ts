import { Server } from './src/server'
import { usersRouter } from './src/users/users.router'


const server = new Server()

server.bootstrap([usersRouter]).then(server => {
    console.log('Server running on: ', server.application.address())

}).catch(error => {
    console.log('Server failed to start')
    process.exit(1)

})