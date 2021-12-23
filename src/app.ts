/* import express, { Application } from "express"
import cors from "cors"
import dotenv from "dotenv" */
import { showResult } from "./controllers/result.controller";

/* Declare routes*/
/* import { router as resultRoutes} from "./routes/result.routes"

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors())

// Api routes
app.use('/api/', resultRoutes); */

showResult();
//export default app;
