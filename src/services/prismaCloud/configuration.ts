import axios from "axios"
import dotenv from "dotenv"

dotenv.config();
const cwppInstance = axios.create({
  baseURL: process.env.CONSOLE_PATH
})

cwppInstance.defaults.headers.common['Content-Type'] = 'application/json'

const cspmInstance = axios.create({
  baseURL: process.env.CONSOLE_PATH
})

cspmInstance.defaults.headers.common['Content-Type'] = 'application/json'

export { cwppInstance, cspmInstance }