import express, { Application, Request, Response } from "express";
import { createHouse, deleteHouse, retrieveHouses, updateHouse } from './db/index'
import { HouseInterface } from "./types";

const cors = require('cors')
const app: Application = express();
const port = 8081;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/retrieveHouses", async (req: Request, res: Response): Promise<Response> => {
  const houses = await retrieveHouses();
  return res.status(200).send(houses);
})

app.post("/api/addHouse", async (req: Request, res: Response): Promise<Response> => {
  const newHouse = req.body
  console.log('date', newHouse.datePurchased)
  await createHouse({ ...newHouse, datePurchased: new Date(newHouse.datePurchased), description: JSON.stringify(newHouse.description) })
  const houses = await retrieveHouses();
  return res.status(200).send(houses);
})

app.post("/api/updateHouse", async (req: Request, res: Response): Promise<Response> => {
  // req type
  return res.status(200).send("noice");
})

app.delete("/api/deleteHouse", async (req: Request, res: Response): Promise<Response> => {
  // req type
  const deleteId = req.body;
  await deleteHouse(deleteId)
  const houses = await retrieveHouses()
  return res.status(200).send(houses);
})



try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}