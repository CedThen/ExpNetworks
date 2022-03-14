import express, { Application, Request, Response } from "express";
import { createHouse, deleteHouse, retrieveHouses, updateHouse } from './db/index'

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
  await createHouse({ ...newHouse, datePurchased: new Date(newHouse.datePurchased), description: JSON.stringify(newHouse.description) })
  const houses = await retrieveHouses();
  return res.status(200).send(houses);
})

app.post("/api/updateHouse", async (req: Request, res: Response): Promise<Response> => {
  const updatedHouse = req.body
  await updateHouse(updatedHouse)
  const houses = await retrieveHouses()
  return res.status(200).send(houses);
})

app.delete("/api/deleteHouse", async (req: Request, res: Response): Promise<Response> => {
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