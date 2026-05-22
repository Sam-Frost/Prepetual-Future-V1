import express from "express";
import { authRouter } from "./routes/auth-routes";
import { env } from "./utils/env";
import { exchangeRouter } from "./routes/exchange-routes";
import { globalErrorHandler } from "./utils/errorHandler";
import { onInit } from "./utils/init";

const app = express();

app.use(express.json());

app.use(authRouter);
app.use(exchangeRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    status: "ok",
  });
});

app.use(globalErrorHandler);

app.listen(env.port, () => {
  console.log(`Server listening on port ${env.port}`);
});

onInit();
