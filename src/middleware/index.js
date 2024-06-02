import express from "express";
const appMiddleware = express();
import cors from "cors";
import router from "../routes/index.js";
import { errorHandler } from "./errorHandler.js";

appMiddleware.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true,
      preflightContinue: false,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders:
         "Authorization, Origin, X-Requested-With, Content-Type, Accept",
   })
);

appMiddleware.options("*", cors());
appMiddleware.use(express.json());
appMiddleware.use(router);
appMiddleware.use(errorHandler);

export default appMiddleware;
