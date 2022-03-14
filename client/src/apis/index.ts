import axios from 'axios'
import type { HouseInterface } from '../../../types'
const ip = 'http://localhost:8081'

export function retrieveHouses(): Promise<Array<HouseInterface>> {
  return axios.get(`${ip}/api/retrieveHouses`)
}