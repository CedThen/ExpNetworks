import express, { Application, Request, Response } from "express";
import { createHouse, retrieveHouses, updateHouse } from './db/index'
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

app.get("/api/addHouse", async (req: Request, res: Response): Promise<Response> => {
  console.log('adding house')
  const dummyHouse: HouseInterface = {
    address: "100 Yum St",
    squareFeet: 150000,
    bedrooms: 5,
    bathrooms: 3,
    datePurchased: new Date().toISOString(),
    purchasePrice: 300000,
    description: 'Wow so cheap'
  }
  const houses = await createHouse(dummyHouse);
  return res.status(200).send(houses);
})

app.post("/api/updateHouse", async (req: Request, res: Response): Promise<Response> => {
  // req type
  return res.status(200).send("noice");
})

app.delete("/api/deleteHouse", async (req: Request, res: Response): Promise<Response> => {
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