import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import globalErrorHandelar from "./app/middlewares/globalErrorHandelar";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" })); 

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Handle all routes
app.use("/api", router);

// Handle Global Error
app.use(globalErrorHandelar);

// Handle Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
  notFound(req, res, next);
});

export default app;
