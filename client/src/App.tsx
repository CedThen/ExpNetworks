import { useEffect, useState } from 'react';
import {

  EuiTitle,
  EuiText
} from '@elastic/eui';
import { retrieveHouses } from './apis';
import './App.css';
import { HouseInterface } from '../../types';
import Header from './components/Header';

function App() {
  const [data, setData] = useState<Array<HouseInterface>>();

  useEffect(() => {
    getHouses();
  }, [])

  async function getHouses() {
    const houses = await retrieveHouses()
    console.log('houses', houses)
    setData(houses);
  }
  return (
    <div className="App">
      <Header />
      <EuiTitle size='l'

      ><h1>Your Properties</h1></EuiTitle>
      <div>

      </div>
    </div>
  );
}

export default App;
