import dotenv from "dotenv";
import express from "express";
import { setupSwagger } from './config/swagger';
import router from "./routes/route";
import errorMiddleware from "./middlewares/error.middleware";

dotenv.config();

const app = express();
setupSwagger(app);


app.use(express.json());

app.use("/api", router);

app.use(errorMiddleware);

export default app;
