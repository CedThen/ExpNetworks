import { useEffect, useState } from "react"
import { HouseInterface } from "../../../types";
import { retrieveHouses } from "../apis";


const useFetchData = () => {
  const [data, setData] = useState<HouseInterface[]>();

  useEffect(() => {
    retrieveHouses(setData)
  }, [])
  return [data]
}

export default useFetchData