import * as fs from 'fs'

fs.writeFile(process.argv[2], process.argv[3], (error) => {
    if(error) throw error

    console.log(`File ${process.argv[2]} saved.`)
})