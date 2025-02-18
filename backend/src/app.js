import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js";
import server from "./src/configs/server.js";   

const app = express();

app.use(cors(server.corsOptions));
app.use(express.json());
app.use(routes);

export default app;
