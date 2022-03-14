import axios, { AxiosResponse } from 'axios'
import type { HouseInterface } from '../../../types'
const ip = 'http://localhost:8081'

export function retrieveHouses(setData: (d: HouseInterface[]) => void): void {
  axios.get<HouseInterface[]>(`${ip}/api/retrieveHouses`)
    .then(response => {
      console.log('response', response.data)
      setData(response.data)
    })
}