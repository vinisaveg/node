import { fork } from "child_process"
import path from "path"

import express from "express"

const app = express()

app.get("/one", (req, res) => {
  // const sum = longComputation()
  // res.send({
  //   sum,
  // })
})

app.get("/two", async (req, res) => {
  const sum = await longComputePromise()

  res.send({ sum })
})

app.get("/three", (req, res) => {
  const child = fork(path.resolve(__dirname, "longTask.js"))

  child.send("start")

  child.on("message", (sum) => {
    res.send({ sum })
  })
})

app.listen(3000, () => console.log("Server Running!"))

const longComputePromise = () => {
  return new Promise((resolve, reject) => {
    let sum = 0
    for (let i = 0; i < 1e9; i++) {
      sum += i
    }

    resolve(sum)
  })
}
