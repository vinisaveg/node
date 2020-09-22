import "reflect-metadata";
import express from "express";
import router from "./routes";

const app = express();

app.use(router);
app.use(express.json());

app.listen(3000, () =>
  console.log("Server is running at http://localhost://3000")
);
