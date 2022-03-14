import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { HouseInterface } from "../../../types";
import { retrieveHouses } from "../apis";


const useFetchData = (): [HouseInterface[] | undefined, Dispatch<SetStateAction<HouseInterface[] | undefined>>] => {
  const [data, setData] = useState<HouseInterface[]>();

  useEffect(() => {
    retrieveHouses(setData)
  }, [])
  return [data, setData]
}

export default useFetchData