import "reflect-metadata";
import "express-async-errors";
import express from "express";

import "./shared/container";
import { AppError } from "./shared/errors/AppError";
import router from "./shared/infra/http/routes";

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.use(
  (
    err: Error,
    request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message} `,
    });
  }
);

export default app;
