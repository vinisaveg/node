import { execFile } from "child_process"

execFile("./somefile.sh", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error}`)
  }

  if (stderr) {
    console.log(`error: ${stderr}`)
  }

  console.log(`stdout: ${stdout}`)
})
