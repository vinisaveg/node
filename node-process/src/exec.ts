import { exec } from "child_process"

exec("ls -lh", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error}`)
  }

  if (stderr) {
    console.log(`error: ${stderr}`)
  }

  console.log(`stdout: ${stdout}`)
})
