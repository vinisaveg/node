import { createConnection } from "typeorm";

createConnection().then(() => console.log("🍱 connected with database"));
