import { Schema, model, connect } from 'mongoose';
import { HouseInterface } from '../types'
const { connectionStr } = require('../secrets.js')

const houseSchema = new Schema<HouseInterface>({
  address: String,
  squareFeet: Number,
  bedrooms: Number,
  bathrooms: Number,
  datePurchased: Date,
  purchasePrice: Number,
  description: String,
})

const HouseModel = model<HouseInterface>('House', houseSchema)

export async function createHouse(house: HouseInterface): Promise<void> {
  await connect(connectionStr);
  const newHouse = new HouseModel(house)
  await newHouse.save();
}

export async function retrieveHouses(): Promise<Array<HouseInterface>> {
  await connect(connectionStr);
  const houses = await HouseModel.find()
  return houses;
}

export async function updateHouse(id: string): Promise<void> {
  await connect(connectionStr);
  const house = await HouseModel.findById(id).exec();
  console.log('found house', house)
}

export async function deleteHouse(id: string): Promise<void> {
  await connect(connectionStr);
  const house = await HouseModel.findById(id).exec();
  console.log('found house', house)
}
