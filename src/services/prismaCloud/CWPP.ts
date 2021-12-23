import { cwppInstance } from "./configuration";
import dotenv from "dotenv"

dotenv.config();

export async function login() {
  try {
    const TOKEN = await cwppInstance.post('/api/v21.08/authenticate',
      {
        username: process.env.ACCESS_KEY,
        password: process.env.SECRET_KEY
      }
    )

    return TOKEN
  } catch (err) {
    console.log(err)
  }
}

export async function getServerlessInfo(TOKEN: string) {
  try {
    const INFO = await cwppInstance.get('/api/v1/serverless',
      { 
        headers: {
          "Authorization": `Bearer ${TOKEN}`
        }
      }
    )
  
    return INFO
  } catch (err) {
    console.log(err, 1)
  }
}