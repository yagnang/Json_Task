import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import { router as userSelected } from "./routes/userSelected";

dotenv.config();

const app: Express = express();
app.use(express.json());

app.use(userSelected);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Connected to port ${PORT}`);
});
