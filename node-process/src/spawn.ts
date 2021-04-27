import { spawn } from "child_process"

const child = spawn("find", ["/"])

child.stdout.on("data", (data) => {
  console.log(`stddout: ${data}`)
})

child.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`)
})

child.stdout.on("error", (error) => {
  console.log(`error: ${error.message}`)
})

child.on("exit", (code, signal) => {
  code ? console.log(`Process exit with code: ${code}`) : null

  signal ? console.log(`Process killed with signal: ${signal}`) : null

  console.log("Done!")
})
