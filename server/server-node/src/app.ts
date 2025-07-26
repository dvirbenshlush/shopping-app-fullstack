import cors from 'cors'
import dotenv from "dotenv";
import express from "express";
import router from "./routes/route";
import { setupSwagger } from './config/swagger';
import errorMiddleware from "./middlewares/error.middleware";

dotenv.config();

const app = express();
setupSwagger(app);

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.use("/api", router);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
