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

export async function updateHouse(house: HouseInterface): Promise<void> {
  await connect(connectionStr);
  console.log('house in db', house)
  const res = await HouseModel.updateOne({ _id: house._id }, {
    $set: {
      address: house.address,
      squareFeet: house.squareFeet,
      bedrooms: house.bedrooms,
      bathrooms: house.bathrooms,
      datePurchased: house.datePurchased,
      purchasePrice: house.purchasePrice,
      description: house.description
    }
  })
  console.log('res of updating', res)
}

export async function deleteHouse(id: string): Promise<void> {
  await connect(connectionStr);
  await HouseModel.deleteOne({ _id: id })
}
