import axios from 'axios'
import type { HouseInterface } from '../../../types'
const ip = 'http://localhost:8081'

export function retrieveHouses(setData: (d: HouseInterface[]) => void): void {
  axios.get<HouseInterface[]>(`${ip}/api/retrieveHouses`)
    .then(response => setData(response.data))
}

export async function createHouse(house: HouseInterface): Promise<HouseInterface[]> {
  const response = await axios.post<HouseInterface[]>(`${ip}/api/addHouse`, house)
  return await response.data
}