import express, { Request, Response, Router } from "express"
import { showResult } from "../controllers/result.controller";

const router: Router = express.Router();

router.get('/show-resume', showResult)

export { router }