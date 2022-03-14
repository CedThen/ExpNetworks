import axios from 'axios'
import type { HouseInterface } from '../../../types'
const ip = 'http://localhost:8081'

export function retrieveHouses(setData: (d: HouseInterface[]) => void): void {
  axios.get<HouseInterface[]>(`${ip}/api/retrieveHouses`)
    .then(response => setData(response.data))
}

export function createHouse(house: HouseInterface, setData: (d: HouseInterface[]) => void): void {
  axios.post<HouseInterface[]>(`${ip}/api/addHouse`, house)
    .then(response => setData(response.data))
}