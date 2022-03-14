import express, { Application, Request, Response } from "express";
import { createHouse, retrieveHouses, updateHouse } from './db/index'

const cors = require('cors')
const app: Application = express();
const port = 8081;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// app.get("/", async (req: Request, res: Response): Promise<Response> => {
//   const houses = await retrieveHouses();
//   const firstId: string = houses[1].id

//   const findHouse = updateHouse(firstId)

//   return res.status(200).send({
//     message: "Hello World!",
//   });
// });

app.get("/api/retrieveHouses", async (req: Request, res: Response): Promise<Response> => {
  const houses = await retrieveHouses();
  return res.status(200).send(houses);
})

app.post("/api/addHouse", async (req: Request, res: Response): Promise<Response> => {
  const houses = await retrieveHouses();
  return res.status(200).send(houses);
})

app.post("/api/updateHouse", async (req: Request, res: Response): Promise<Response> => {
  // req type
  return res.status(200).send("noice");
})

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}