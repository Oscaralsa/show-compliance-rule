import { cspmInstance } from "./configuration";
import dotenv from "dotenv"

dotenv.config();

export async function authenticate() {

  try{
    const TOKEN = await cspmInstance.post('/api/v21.08/authenticate',
      {
        username: process.env.ACCESS_KEY,
        password: process.env.SECRET_KEY
      }
    )
  
    return TOKEN
  } catch(err) {
    console.log(err)
  }
}

export async function getCollection(TOKEN: string) {

  try{
    const collection = await cspmInstance.get('/api/v21.08/collections',
    { 
      headers: {
        "Authorization": `Bearer ${TOKEN}`
      }
    }
  )
  
    return collection
  } catch(err) {
    console.log(err)
  }
}